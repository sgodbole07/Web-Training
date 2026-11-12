# Modern Front-End Security: User Security Dashboard

## Overview

This project started as a deliberately vulnerable User Security Dashboard
built for the Modern Front-End Security Concepts training assignment.
The starter code is kept in the first commit of this branch. The commits
after it refine the app one risk at a time, so the history shows how each
weakness was found and fixed.

The five areas covered are:

1. DOM-based cross-site scripting (DOM XSS)
2. Prototype pollution
3. SSR token leakage
4. Content Security Policy (CSP)
5. Clickjacking

## Technologies

- HTML
- CSS
- Vanilla JavaScript
- Node.js
- Express

## Setup

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

Then open http://localhost:3000 in a browser.

Run the automated security tests:

```bash
npm test
```

The tests start their own server on a random port, so they can run while the app is already running on port 3000.

## Project Layout

```
server/server.js        Express routes, headers and input validation
server/data.js          Sample user record and default settings
client/app.js           Dashboard rendering and settings form
client/account.js       Account page button handler
client/styles.css       Dashboard styles
client/account.css      Account page styles
test/security.test.js   Automated checks for the security fixes
test/iframe-test.html   Manual clickjacking demo page
```

Line numbers below refer to the starter commit (the first commit on this branch).

## 1. DOM-Based XSS

### Vulnerable implementation

`client/app.js`, lines 3 to 24 in the starter.

The dashboard reads the `name` query parameter and writes it into the page with `innerHTML`:

```js
const username = params.get("name") || window.initialUser?.name || "Guest";

app.innerHTML = `
    <section class="profile-card">
        <h2>Welcome, ${username}</h2>
        ...
```

### Why it is insecure

`innerHTML` parses its input as HTML. Anything that looks like a tag in the URL becomes live markup, and event handler attributes such as `onerror` run JavaScript. The page never checks the value, so a link like `/?name=<img src=x onerror=alert(1)>` runs script in the victim's browser.

### Untrusted source and boundary

- Source: `location.search`, read through `URLSearchParams`. Anyone who can craft a link controls it.
- Sink: `Element.innerHTML`, which turns a string into DOM nodes and executes inline handlers.
- Boundary: the URL (attacker-controlled) to the DOM (trusted page context).

### Fix

The page now builds its elements with `document.createElement` and writes the text with `textContent` through `append`. Text added this way is never parsed as HTML.

```js
const heading = document.createElement("h2");
heading.textContent = `Welcome, ${username}`;
```

The server also escapes values it puts into HTML (see the account page in section 3), so the same rule holds on both sides.

### Testing and verification

- Positive: `http://localhost:3000/?name=John` shows "Welcome, John".
- Negative: `http://localhost:3000/?name=<img src=x onerror=alert(1)>` shows the payload as plain text. No alert appears.
- Automated: `client code does not write untrusted data through HTML sinks` fails if `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write` or `eval(` come back into `app.js`.

## 2. Prototype Pollution

### Vulnerable implementation

Two places copy objects key by key with `for...in`:

- `server/server.js`, `POST /api/settings`, lines 102 to 115 in the starter. Every key from the request body is copied into the saved settings.
- `client/app.js`, `prepareSettings`, lines 26 to 34 in the starter. The same copy loop runs on the browser side.

### Why it is insecure

`for...in` walks every enumerable key, including ones a request body should never be allowed to set. A key named `__proto__` changes the prototype of the object being built, and a key named `constructor` reaches `Object.prototype`. If a copy like this were recursive, one request could add properties to every object in the app. The starter also accepts any value for any key, so a bad setting is stored without checks.

### Untrusted source and boundary

- Source: the JSON body of `POST /api/settings`.
- Sink: property assignment on objects the app later reads and trusts.
- Boundary: the HTTP request (client-controlled) to server-side state.

### Fix

- The server only reads the three known keys: `theme`, `language` and `fontSize`. Each one must match an allowlist of values. Anything else returns `400`.
- Keys are read with `Object.hasOwn`, so inherited properties are ignored.
- A non-object body (an array, a string, or nothing) returns `400`.
- Unknown keys are dropped instead of echoed back.
- The request body is capped at 10 kB.
- The client builds its settings object from the three form fields, with no copy loop.

```js
const settings = {};

for (const [key, allowedValues] of Object.entries(ALLOWED_SETTINGS)) {
    const value = Object.hasOwn(incomingSettings, key)
        ? incomingSettings[key]
        : defaultSettings[key];

    if (!allowedValues.includes(value)) {
        return res.status(400).json({ message: `Invalid value for ${key}.` });
    }

    settings[key] = value;
}
```

### Testing and verification

- Positive: saving `{"theme":"dark","language":"fr","fontSize":"large"}` returns `200` and echoes the same values.
- Negative: a theme value containing HTML returns `400` with `Invalid value for theme.`
- Negative: a payload with `__proto__` and `constructor.prototype` keys returns only the three allowed keys, and `({}).polluted` stays `undefined`.
- Negative: an extra key such as `isAdmin` is not in the response.
- Manual: change the theme and font size in the dashboard, press Save Settings, and confirm the status message shows "Settings saved successfully."

## 3. SSR Token Leakage

### Vulnerable implementation

- `server/server.js`, line 15 in the starter: `JSON.stringify(user)` puts the whole user record into the home page.
- `server/server.js`, line 79 in the starter: that JSON is written into an inline `<script>` as `window.initialUser = ...`.
- `server/server.js`, lines 91 to 93 in the starter: `GET /api/profile` returns the full user record.
- The user record in `server/data.js` holds `sessionToken` and `refreshToken`.

### Why it is insecure

The tokens end up in two places the browser can reach. They sit in the HTML source, so anyone who views the page or a cached copy can read them. Any script on the page, whether injected XSS, a browser extension or a third-party tag, can read `window.initialUser`. The profile API also hands the tokens to any caller. The JSON is written straight into a script tag without escaping, so a value containing `</script>` would break out of it.

### Untrusted source and boundary

- Source: server-side secrets that should never leave the server.
- Sink: the rendered HTML and the public API response.
- Boundary: the server (trusted) to the browser (untrusted, shared with any script on the page).

### Fix

- A `toPublicUser` function returns only `id`, `name`, `email` and `role`. Both the page and `/api/profile` use it, so the tokens stay on the server.
- The initial user data goes into `<script type="application/json" id="initial-user">`. The browser does not run this block, and `client/app.js` reads it with `JSON.parse`.
- The JSON is escaped before it goes into HTML: `<`, `>`, `&`, U+2028 and U+2029 become `\uXXXX` escapes.
- The account page escapes name, email and role with `escapeHtml`.

For a real app, the refresh token would live in an `HttpOnly`, `Secure`, `SameSite` cookie that the browser sends automatically and scripts cannot read. This starter has no login flow, so the tokens only exist in `server/data.js`.

### Testing and verification

- Automated: `session and refresh tokens never reach the browser` checks the home page HTML and `/api/profile` for `sessionToken`, `refreshToken` and the fake token value.
- Automated: `profile API still returns the public user fields` checks the exact field list.
- Automated: `embedded initial user data is valid JSON with public fields only` parses the data block and checks its keys.
- Manual: view the page source at http://localhost:3000 and confirm no token appears. Open http://localhost:3000/api/profile and confirm only the four public fields are returned.
- Manual: the dashboard still shows "Welcome, John Doe", the email and the role.

## 4. Content Security Policy (CSP)

### Vulnerable implementation

- The starter sends no CSP header.
- `server/server.js`, lines 78 to 80 and 188 to 195 in the starter: inline `<script>` blocks.
- `server/server.js`, lines 132 to 156 in the starter: an inline `<style>` block.

### Why it is insecure

Without a CSP, the browser runs any script it finds in the page, including one an attacker injects. The inline blocks would also be blocked by a strict policy, so they have to be moved out before a policy can be enforced.

### Untrusted source and boundary

- Source: any content that ends up in the page, such as a reflected or DOM XSS payload.
- Boundary: the page's script execution context. CSP is the browser-side rule that limits what can run there.

### Fix

Every response, including static files, now sends this header:

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self';
img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none';
form-action 'self'; frame-ancestors 'none'
```

- No `unsafe-inline` and no `unsafe-eval`, so injected inline script does not run.
- The account page script moved to `client/account.js`, and its styles moved to `client/account.css`.
- The home page's initial data moved into a non-executable JSON block (see section 3).
- `object-src 'none'` blocks plugins, and `base-uri 'none'` stops `<base>` tag tricks.

### Testing and verification

- Automated: `home page sends a strict Content Security Policy` checks for `script-src 'self'` and `object-src 'none'`, and fails if `unsafe-inline` or `unsafe-eval` appears.
- Automated: `home page has no inline executable script or inline style` and `account page has no inline executable script or inline style` scan the HTML for inline code.
- Manual: open the dashboard and the account page with the browser console open. There should be no "Refused to execute inline script" or "Refused to apply inline style" messages. The Delete Account button should still show "Account deletion action triggered."
- Manual negative test: in the browser console on the dashboard, run `document.body.append(Object.assign(document.createElement("script"), {textContent: "window.pwned = true"}))`. The console should report a CSP violation and `window.pwned` should stay `undefined`.

## 5. Clickjacking

### Vulnerable implementation

- The starter sends no `X-Frame-Options` or `frame-ancestors` directive, so any site can frame the pages.
- `test/iframe-test.html` frames `/account` in the starter and the account page displays inside it.

### Why it is insecure

An attacker can place the account page in an invisible iframe on their own site and trick a user into clicking. The user thinks they are clicking the attacker's page, but the click lands on the real "Delete Account" button.

### Untrusted source and boundary

- Source: any third-party page that embeds the app.
- Boundary: the frame ancestry. The browser decides whether another origin can embed the page, and the server has to say no.

### Fix

- `frame-ancestors 'none'` in the CSP, which is the modern control.
- `X-Frame-Options: DENY` for older browsers that ignore CSP framing rules.

Both headers are set on every response.

### Testing and verification

- Automated: `pages refuse to be framed (clickjacking)` checks both headers on `/` and `/account`.
- Automated: `static assets get the same framing and CSP headers` checks `/app.js`.
- Manual negative test: start the app, then open `test/iframe-test.html` in a browser. The iframe should stay blank and the browser console should report that the page refused to frame `localhost:3000`. Without the fix, the account page appears inside the frame.
- Manual positive test: open http://localhost:3000/account directly. It should load normally.

## Defense in Depth

No single control covers all of these risks. Each one closes a different gap, and they overlap on purpose:

| Risk | Layer 1: code | Layer 2: data handling | Layer 3: browser policy | Layer 4: HTTP headers |
| - | - | - | - | - |
| DOM XSS | `textContent` instead of `innerHTML` | Server escapes values in HTML | CSP blocks inline and injected scripts | CSP on every response |
| Prototype pollution | Key and value allowlist, `Object.hasOwn` | Request body size limit, non-object rejection | Not applicable | `X-Content-Type-Options: nosniff` |
| Token leakage | Public user DTO | Tokens never serialized | Data block is not executable | Not applicable |
| CSP | Inline code moved to files | Escaping in the data block | Strict `script-src 'self'` | `Content-Security-Policy` header |
| Clickjacking | Not applicable | Not applicable | Not applicable | `frame-ancestors 'none'`, `X-Frame-Options: DENY` |

The point of the layers: if one fails, the next still limits the damage. For example, if a future change reintroduces `innerHTML` with user input, CSP still stops the injected script from running. If the tokens are added back to the user record, the public DTO still keeps them out of the page.

Other hardening included:

- `Referrer-Policy: strict-origin-when-cross-origin` limits what URLs leak to other sites.
- `X-Content-Type-Options: nosniff` stops browsers from guessing a file's type.

## Testing Summary

| Area | Automated checks | Manual checks |
| - | - | - |
| DOM XSS | Forbidden HTML sinks in `app.js` | Payload in `?name=` shows as text |
| Prototype pollution | Pollution keys, invalid values, unknown keys | Save settings, status message |
| Token leakage | Tokens absent from page and API, field list | View source, open `/api/profile` |
| CSP | Header content, no inline code | Console shows no CSP errors, CSP violation test |
| Clickjacking | Frame headers on pages and assets | `test/iframe-test.html` shows a blank frame |

Run `npm test` to execute the automated checks (14 tests).

## Behaviour Changes

These changes are intentional:

- `GET /api/profile` returns only `id`, `name`, `email` and `role`.
- `POST /api/settings` returns `400` for invalid values and drops unknown keys.
- The account page loads its styles and script from files instead of inline blocks.

Everything else works as before: the welcome message, the settings form, the account page content and the Delete Account status message.
