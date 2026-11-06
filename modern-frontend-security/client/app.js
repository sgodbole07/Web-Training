const appRoot = document.getElementById("app");

function readInitialUser() {
    const element = document.getElementById("initial-user");

    if (!element) {
        return {};
    }

    try {
        return JSON.parse(element.textContent) || {};
    } catch (error) {
        return {};
    }
}

const initialUser = readInitialUser();

const params = new URLSearchParams(window.location.search);

const username =
    params.get("name") ||
    initialUser.name ||
    "Guest";

const profileCard = document.createElement("section");
profileCard.className = "profile-card";

const heading = document.createElement("h2");
heading.textContent = `Welcome, ${username}`;

const emailLine = document.createElement("p");
emailLine.append("Email: ", initialUser.email || "Unknown");

const roleLine = document.createElement("p");
roleLine.append("Role: ", initialUser.role || "User");

profileCard.append(heading, emailLine, roleLine);
appRoot.replaceChildren(profileCard);

const saveButton = document.getElementById("save-settings");
const settingsStatus = document.getElementById("settings-status");

saveButton.addEventListener("click", async () => {
    const settings = {
        theme: document.getElementById("theme").value,
        language: document.getElementById("language").value,
        fontSize: document.getElementById("fontSize").value
    };

    try {
        const response = await fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settings)
        });

        const result = await response.json();

        settingsStatus.textContent = result.message;
    } catch (error) {
        settingsStatus.textContent = "Unable to save settings.";
    }
});
