/* =================================================
SETTINGS PAGE
================================================= */

let accountMenuOpen = false;

/* =================================================
INITIALIZATION
================================================= */

document.addEventListener(
"DOMContentLoaded",
function() {

    initializeSettings();

    document.addEventListener(
        "click",
        handleDocumentClick
    );

}

);

function initializeSettings() {

const authToken =
    sessionStorage.getItem(
        "authToken"
    );


if (!authToken) {

    window.location.href =
        "index.html";

    return;

}


populateAccountDetails();

initializeSigningKeySettings();

}

/* =================================================
ACCOUNT DETAILS
================================================= */

function populateAccountDetails() {

const firstName =
    sessionStorage.getItem(
        "merchantFirstName"
    ) || "";

const lastName =
    sessionStorage.getItem(
        "merchantLastName"
    ) || "";

const email =
    sessionStorage.getItem(
        "merchantEmail"
    ) || "";


const firstNameInput =
    document.getElementById(
        "firstNameInput"
    );

const lastNameInput =
    document.getElementById(
        "lastNameInput"
    );

const emailInput =
    document.getElementById(
        "emailInput"
    );


if (firstNameInput) {

    firstNameInput.value =
        firstName;

}


if (lastNameInput) {

    lastNameInput.value =
        lastName;

}


if (emailInput) {

    emailInput.value =
        email;

}


updateAccountHeader();

}

/* =================================================
ACCOUNT HEADER
================================================= */

function updateAccountHeader() {

const email =
    sessionStorage.getItem(
        "merchantEmail"
    ) || "—";


const merchantId =
    sessionStorage.getItem(
        "merchantId"
    ) || "—";


const accountEmail =
    document.getElementById(
        "accountEmail"
    );


const menuEmail =
    document.getElementById(
        "menuEmail"
    );


const menuMerchantId =
    document.getElementById(
        "menuMerchantId"
    );


if (accountEmail) {

    accountEmail.textContent =
        email;

}


if (menuEmail) {

    menuEmail.textContent =
        email;

}


if (menuMerchantId) {

    menuMerchantId.textContent =
        merchantId;

}

}

/* =================================================
OPEN ACCOUNT DETAILS
================================================= */

function openAccountDetails() {

hideSettingsOptions();

hideAccountPassword();

hideSigningKeySettings();

populateAccountDetails();


const card =
    document.getElementById(
        "accountDetailsCard"
    );


if (!card) {
    return;
}


card.style.display =
    "block";


setSettingsBackButton(
    "Account Settings"
);

}

/* =================================================
OPEN ACCOUNT PASSWORD
================================================= */

function openAccountPassword() {

hideSettingsOptions();

hideAccountDetails();

hideSigningKeySettings();


const card =
    document.getElementById(
        "accountPasswordCard"
    );


if (!card) {
    return;
}


card.style.display =
    "block";


setSettingsBackButton(
    "Account Settings"
);

}

/* =================================================
OPEN SIGNING KEY SETTINGS
================================================= */

function openSigningKeySettings() {

hideSettingsOptions();

hideAccountDetails();

hideSigningKeyBackupPopup();


const card =
    document.getElementById(
        "signingKeySettingsCard"
    );


if (!card) {
    return;
}


card.style.display =
    "block";


initializeSigningKeySettings();


setSettingsBackButton(
    "Account Settings"
);

}

/* =================================================
CLOSE SETTINGS FORM
================================================= */

function closeSettingsForm() {

hideAccountDetails();

hideAccountPassword();

hideSigningKeySettings();

hideSigningKeyBackupPopup();

showSettingsOptions();

setSettingsBackButton(
    "Dashboard"
);

}

/* =================================================
SETTINGS BACK BUTTON
================================================= */

function handleSettingsBack() {

const optionsCard =
    document.getElementById(
        "settingsOptionsCard"
    );


if (
    optionsCard &&
    optionsCard.style.display !== "none"
) {

    goToDashboard();

    return;

}


closeSettingsForm();

}

/* =================================================
SETTINGS BACK BUTTON LABEL
================================================= */

function setSettingsBackButton(
label
) {

const labelElement =
    document.getElementById(
        "settingsBackLabel"
    );


if (!labelElement) {
    return;
}


labelElement.textContent =
    label;

}

/* =================================================
VISIBILITY HELPERS
================================================= */

function hideSettingsOptions() {

const card =
    document.getElementById(
        "settingsOptionsCard"
    );


if (!card) {
    return;
}


card.style.display =
    "none";

}

function showSettingsOptions() {

const card =
    document.getElementById(
        "settingsOptionsCard"
    );


if (!card) {
    return;
}


card.style.display =
    "block";

}

function hideAccountDetails() {

const card =
    document.getElementById(
        "accountDetailsCard"
    );


if (!card) {
    return;
}


card.style.display =
    "none";

}

function hideAccountPassword() {

const card =
    document.getElementById(
        "accountPasswordCard"
    );


if (!card) {
    return;
}


card.style.display =
    "none";

}

function hideSigningKeySettings() {

const card =
    document.getElementById(
        "signingKeySettingsCard"
    );


if (!card) {
    return;
}


card.style.display =
    "none";

}

/* =================================================
SIGNING KEY BACKUP SETTINGS
================================================= */

const SIGNING_KEY_BACKUP_DEFAULT =
"ask_each_time";

function initializeSigningKeySettings() {

const valueElement =
    document.getElementById(
        "signingKeyBackupValue"
    );


if (!valueElement) {
    return;
}


let savedSetting =
    sessionStorage.getItem(
        "signingKeyBackupSetting"
    );


if (
    savedSetting !==
        "automatic" &&
    savedSetting !==
        "self_managed" &&
    savedSetting !==
        "ask_each_time"
) {

    savedSetting =
        SIGNING_KEY_BACKUP_DEFAULT;

    sessionStorage.setItem(
        "signingKeyBackupSetting",
        savedSetting
    );

}


updateSigningKeyBackupDisplay(
    savedSetting
);

}

/* =================================================
SIGNING KEY BACKUP POPUP
================================================= */

function openSigningKeyBackupPopup() {

const popup =
    document.getElementById(
        "signingKeyBackupPopup"
    );


if (!popup) {
    return;
}


initializeSigningKeySettings();

updateSigningKeyBackupOptions();


popup.classList.add(
    "visible"
);


document.body.classList.add(
    "settings-popup-open"
);

}

function closeSigningKeyBackupPopup() {

const popup =
    document.getElementById(
        "signingKeyBackupPopup"
    );


if (!popup) {
    return;
}


popup.classList.remove(
    "visible"
);


document.body.classList.remove(
    "settings-popup-open"
);

}

function hideSigningKeyBackupPopup() {

const popup =
    document.getElementById(
        "signingKeyBackupPopup"
    );


if (!popup) {
    return;
}


popup.classList.remove(
    "visible"
);


document.body.classList.remove(
    "settings-popup-open"
);

}

function handleSigningKeyBackupPopupClick(
event
) {

if (
    event.target ===
    event.currentTarget
) {

    closeSigningKeyBackupPopup();

}

}

/* =================================================
SELECT SIGNING KEY BACKUP SETTING
================================================= */

function selectSigningKeyBackupSetting(
value
) {

if (
    value !== "automatic" &&
    value !== "self_managed" &&
    value !== "ask_each_time"
) {

    return;

}


sessionStorage.setItem(
    "signingKeyBackupSetting",
    value
);


updateSigningKeyBackupDisplay(
    value
);


updateSigningKeyBackupOptions();


closeSigningKeyBackupPopup();

}

/* =================================================
UPDATE SIGNING KEY BACKUP DISPLAY
================================================= */

function updateSigningKeyBackupDisplay(
value
) {

const valueElement =
    document.getElementById(
        "signingKeyBackupValue"
    );


if (!valueElement) {
    return;
}


const labels = {

    automatic:
        "Back Up Automatically",

    self_managed:
        "I’ll Manage My Keys",

    ask_each_time:
        "Ask Me Each Time"

};


valueElement.textContent =
    labels[value] ||
    labels.ask_each_time;

}

/* =================================================
UPDATE POPUP SELECTION
================================================= */

function updateSigningKeyBackupOptions() {

const automatic =
    document.getElementById(
        "signingKeyOptionAutomatic"
    );

const selfManaged =
    document.getElementById(
        "signingKeyOptionSelfManaged"
    );

const askEachTime =
    document.getElementById(
        "signingKeyOptionAskEachTime"
    );


const savedSetting =
    sessionStorage.getItem(
        "signingKeyBackupSetting"
    ) ||
    SIGNING_KEY_BACKUP_DEFAULT;


if (automatic) {

    automatic.classList.toggle(
        "selected",
        savedSetting === "automatic"
    );

}


if (selfManaged) {

    selfManaged.classList.toggle(
        "selected",
        savedSetting === "self_managed"
    );

}


if (askEachTime) {

    askEachTime.classList.toggle(
        "selected",
        savedSetting === "ask_each_time"
    );

}

}

/* =================================================
ACCOUNT MENU
================================================= */

function toggleAccountMenu() {

const menu =
    document.getElementById(
        "accountMenu"
    );


if (!menu) {
    return;
}


accountMenuOpen =
    !accountMenuOpen;


menu.classList.toggle(
    "open",
    accountMenuOpen
);

}

function closeAccountMenu() {

const menu =
    document.getElementById(
        "accountMenu"
    );


if (!menu) {
    return;
}


accountMenuOpen =
    false;


menu.classList.remove(
    "open"
);

}

function handleDocumentClick(
event
) {

const container =
    document.querySelector(
        ".account-container"
    );


if (!container) {
    return;
}


if (
    !container.contains(
        event.target
    )
) {

    closeAccountMenu();

}

}

/* =================================================
LOGOUT
================================================= */

function logout() {

sessionStorage.removeItem(
    "authToken"
);

sessionStorage.removeItem(
    "merchantId"
);

sessionStorage.removeItem(
    "merchantEmail"
);

sessionStorage.removeItem(
    "merchantFirstName"
);

sessionStorage.removeItem(
    "merchantLastName"
);

sessionStorage.removeItem(
    "merchantType"
);

sessionStorage.removeItem(
    "merchantStatus"
);

sessionStorage.removeItem(
    "merchantCreatedAt"
);

sessionStorage.removeItem(
    "merchantUpdatedAt"
);


window.location.href =
    "index.html";

}

/* =================================================
ACCOUNT NAVIGATION
================================================= */

function goToSettings() {

window.location.href =
    "settings.html";

}

function goToDashboard() {

window.location.href =
    "dashboard.html";

}

/* =================================================
DEVELOPER MODAL
================================================= */

function openDeveloperResponse() {

const modal =
    document.getElementById(
        "developerModal"
    );


if (!modal) {
    return;
}


modal.classList.add(
    "visible"
);

}

function closeDeveloperResponse(
event
) {

if (
    event &&
    event.target &&
    event.currentTarget &&
    event.target !==
        event.currentTarget
) {

    return;

}


const modal =
    document.getElementById(
        "developerModal"
    );


if (!modal) {
    return;
}


modal.classList.remove(
    "visible"
);

}

/* =================================================
SAVE ACCOUNT DETAILS
================================================= */

function saveAccountDetails(
event
) {

event.preventDefault();


const firstNameInput =
    document.getElementById(
        "firstNameInput"
    );

const lastNameInput =
    document.getElementById(
        "lastNameInput"
    );

const emailInput =
    document.getElementById(
        "emailInput"
    );


const firstName =
    firstNameInput
        ? firstNameInput.value.trim()
        : "";

const lastName =
    lastNameInput
        ? lastNameInput.value.trim()
        : "";

const email =
    emailInput
        ? emailInput.value.trim().toLowerCase()
        : "";


if (!firstName) {

    alert(
        "First name is required."
    );

    return;

}


if (!lastName) {

    alert(
        "Last name is required."
    );

    return;

}


if (!email) {

    alert(
        "Email address is required."
    );

    return;

}


/*
 * Backend update will be connected here.
 *
 * For now, update the local session so
 * the dashboard reflects the edited values
 * during development.
 */

sessionStorage.setItem(
    "merchantFirstName",
    firstName
);


sessionStorage.setItem(
    "merchantLastName",
    lastName
);


sessionStorage.setItem(
    "merchantEmail",
    email
);


updateAccountHeader();


alert(
    "Account details updated."
);


closeSettingsForm();

}

/* =================================================
SAVE ACCOUNT PASSWORD
================================================= */

function saveAccountPassword(
event
) {

event.preventDefault();


const currentPasswordInput =
    document.getElementById(
        "currentPasswordInput"
    );

const newPasswordInput =
    document.getElementById(
        "newPasswordInput"
    );

const confirmPasswordInput =
    document.getElementById(
        "confirmPasswordInput"
    );


const currentPassword =
    currentPasswordInput
        ? currentPasswordInput.value
        : "";

const newPassword =
    newPasswordInput
        ? newPasswordInput.value
        : "";

const confirmPassword =
    confirmPasswordInput
        ? confirmPasswordInput.value
        : "";


if (!currentPassword) {

    alert(
        "Current password is required."
    );

    return;

}


if (!newPassword) {

    alert(
        "New password is required."
    );

    return;

}


if (
    newPassword !==
    confirmPassword
) {

    alert(
        "The new passwords do not match."
    );

    return;

}


/*
 * Backend password update will be
 * connected here.
 */

alert(
    "Password change will be connected to the server next."
);

}

/* =================================================
ESCAPE KEY
================================================= */

document.addEventListener(
"keydown",
function(event) {

    if (
        event.key !== "Escape"
    ) {

        return;

    }


    closeAccountMenu();

    closeSigningKeyBackupPopup();

    closeDeveloperResponse();

}

);