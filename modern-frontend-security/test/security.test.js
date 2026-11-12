const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const app = require("../server/server");

const CLIENT_DIR = path.join(__dirname, "..", "client");

let server;
let baseUrl;

before(async () => {
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

function postSettings(body) {
    return fetch(`${baseUrl}/api/settings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
    });
}

const INLINE_EXECUTABLE_SCRIPT =
    /<script(?![^>]*\bsrc=)(?![^>]*type="application\/json")[^>]*>/i;

test("home page sends a strict Content Security Policy", async () => {
    const response = await fetch(`${baseUrl}/`);
    const csp = response.headers.get("content-security-policy");

    assert.match(csp, /default-src 'self'/);
    assert.match(csp, /script-src 'self'/);
    assert.match(csp, /object-src 'none'/);
    assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval/);
});

test("home page has no inline executable script or inline style", async () => {
    const html = await (await fetch(`${baseUrl}/`)).text();

    assert.doesNotMatch(html, INLINE_EXECUTABLE_SCRIPT);
    assert.doesNotMatch(html, /<style/i);
});

test("account page has no inline executable script or inline style", async () => {
    const html = await (await fetch(`${baseUrl}/account`)).text();

    assert.doesNotMatch(html, INLINE_EXECUTABLE_SCRIPT);
    assert.doesNotMatch(html, /<style/i);
    assert.match(html, /<script src="\/account\.js">/);
});

test("pages refuse to be framed (clickjacking)", async () => {
    for (const route of ["/", "/account"]) {
        const response = await fetch(`${baseUrl}${route}`);

        assert.equal(response.headers.get("x-frame-options"), "DENY");
        assert.match(
            response.headers.get("content-security-policy"),
            /frame-ancestors 'none'/
        );
    }
});

test("static assets get the same framing and CSP headers", async () => {
    const response = await fetch(`${baseUrl}/app.js`);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert.match(
        response.headers.get("content-security-policy"),
        /frame-ancestors 'none'/
    );
});

test("session and refresh tokens never reach the browser", async () => {
    const html = await (await fetch(`${baseUrl}/`)).text();
    const profile = await (await fetch(`${baseUrl}/api/profile`)).text();

    for (const body of [html, profile]) {
        assert.doesNotMatch(body, /sessionToken/);
        assert.doesNotMatch(body, /refreshToken/);
        assert.doesNotMatch(body, /TRAINING-FAKE/);
    }
});

test("profile API still returns the public user fields", async () => {
    const profile = await (await fetch(`${baseUrl}/api/profile`)).json();

    assert.deepEqual(Object.keys(profile).sort(), [
        "email",
        "id",
        "name",
        "role"
    ]);
    assert.equal(profile.name, "John Doe");
});

test("embedded initial user data is valid JSON with public fields only", async () => {
    const html = await (await fetch(`${baseUrl}/`)).text();
    const match = html.match(
        /<script type="application\/json" id="initial-user">([\s\S]*?)<\/script>/
    );

    assert.ok(match, "initial-user JSON block should exist");

    const data = JSON.parse(match[1]);

    assert.deepEqual(Object.keys(data).sort(), ["email", "id", "name", "role"]);
});

test("settings accepts allowed values (positive)", async () => {
    const response = await postSettings(
        JSON.stringify({ theme: "dark", language: "fr", fontSize: "large" })
    );
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.equal(result.message, "Settings saved successfully.");
    assert.deepEqual(result.settings, {
        theme: "dark",
        language: "fr",
        fontSize: "large"
    });
});

test("settings rejects values outside the allowlist (negative)", async () => {
    const response = await postSettings(
        JSON.stringify({ theme: "<img src=x onerror=alert(1)>" })
    );

    assert.equal(response.status, 400);
    assert.equal((await response.json()).message, "Invalid value for theme.");
});

test("settings rejects a non-object payload (negative)", async () => {
    const response = await postSettings(JSON.stringify(["dark"]));

    assert.equal(response.status, 400);
});

test("prototype pollution keys do not reach the object prototype (negative)", async () => {
    const response = await postSettings(
        '{"__proto__":{"polluted":"yes"},"constructor":{"prototype":{"polluted":"yes"}},"theme":"dark"}'
    );
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(Object.keys(result.settings).sort(), [
        "fontSize",
        "language",
        "theme"
    ]);
    assert.equal(({}).polluted, undefined);
});

test("unknown settings keys are dropped instead of echoed back (negative)", async () => {
    const response = await postSettings(
        JSON.stringify({ theme: "light", isAdmin: true })
    );
    const result = await response.json();

    assert.equal(response.status, 200);
    assert.equal("isAdmin" in result.settings, false);
});

test("client code does not write untrusted data through HTML sinks", () => {
    const appJs = fs.readFileSync(path.join(CLIENT_DIR, "app.js"), "utf8");

    assert.doesNotMatch(
        appJs,
        /innerHTML|outerHTML|insertAdjacentHTML|document\.write|eval\(/
    );
});
