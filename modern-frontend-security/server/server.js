const express = require("express");
const path = require("path");

const { user, defaultSettings } = require("./data");

const app = express();
const PORT = 3000;

const ALLOWED_SETTINGS = {
    theme: ["light", "dark"],
    language: ["en", "fr"],
    fontSize: ["small", "medium", "large"]
};

const CONTENT_SECURITY_POLICY = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'"
].join("; ");

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function serializeForScript(value) {
    return JSON.stringify(value)
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029");
}

function toPublicUser({ id, name, email, role }) {
    return { id, name, email, role };
}

app.use((req, res, next) => {
    res.set({
        "Content-Security-Policy": CONTENT_SECURITY_POLICY,
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    next();
});

app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
    const initialUserData = serializeForScript(toPublicUser(user));

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>User Security Dashboard</title>
            <link rel="stylesheet" href="/styles.css">
        </head>

        <body>
            <header class="header">
                <h1>User Security Dashboard</h1>
                <nav>
                    <a href="/">Dashboard</a>
                    <a href="/account">Account Settings</a>
                </nav>
            </header>

            <main class="container">
                <div id="app"></div>

                <section class="settings">
                    <h2>User Settings</h2>

                    <label>
                        Theme:
                        <select id="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </label>

                    <label>
                        Language:
                        <select id="language">
                            <option value="en">English</option>
                            <option value="fr">French</option>
                        </select>
                    </label>

                    <label>
                        Font Size:
                        <select id="fontSize">
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </label>

                    <button id="save-settings">
                        Save Settings
                    </button>

                    <p id="settings-status"></p>
                </section>
            </main>

            <script type="application/json" id="initial-user">${initialUserData}</script>

            <script src="/app.js"></script>
        </body>
        </html>
    `);
});

app.get("/api/profile", (req, res) => {
    res.json(toPublicUser(user));
});

app.get("/api/settings", (req, res) => {
    res.json(defaultSettings);
});

app.post("/api/settings", (req, res) => {
    const incomingSettings = req.body;

    if (
        !incomingSettings ||
        typeof incomingSettings !== "object" ||
        Array.isArray(incomingSettings)
    ) {
        return res.status(400).json({
            message: "Invalid settings payload."
        });
    }

    const settings = {};

    for (const [key, allowedValues] of Object.entries(ALLOWED_SETTINGS)) {
        const value = Object.hasOwn(incomingSettings, key)
            ? incomingSettings[key]
            : defaultSettings[key];

        if (!allowedValues.includes(value)) {
            return res.status(400).json({
                message: `Invalid value for ${key}.`
            });
        }

        settings[key] = value;
    }

    res.json({
        message: "Settings saved successfully.",
        settings
    });
});

app.get("/account", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >
            <title>Account Settings</title>
            <link rel="stylesheet" href="/account.css">
        </head>

        <body>
            <div class="account-card">
                <h1>Account Settings</h1>

                <p>
                    <strong>Name:</strong>
                    ${escapeHtml(user.name)}
                </p>

                <p>
                    <strong>Email:</strong>
                    ${escapeHtml(user.email)}
                </p>

                <p>
                    <strong>Role:</strong>
                    ${escapeHtml(user.role)}
                </p>

                <button
                    id="delete-account"
                    class="danger"
                >
                    Delete Account
                </button>

                <p id="status"></p>
            </div>

            <script src="/account.js"></script>
        </body>
        </html>
    `);
});

app.use(express.static(path.join(__dirname, "..", "client")));

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Application running at http://localhost:${PORT}`);
    });
}

module.exports = app;
