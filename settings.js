/* =================================================
SETTINGS PAGE
================================================= */

let accountMenuOpen = false;

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

/* =================================================
INITIALIZATION
================================================= */

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

populateAccountMenu();

populateAccountDetails();

initializeSigningKeyBackupSetting();

initializeConfigurationSecuritySetting();

}

/* =================================================
ACCOUNT MENU
================================================= */

function populateAccountMenu() {

const email =
sessionStorage.getItem(
"merchantEmail"
);

const merchantId =
sessionStorage.getItem(
"merchantId"
);

const displayEmail =
email || "—";

const displayMerchantId =
merchantId || "—";

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
    displayEmail;

}

if (menuEmail) {

menuEmail.textContent =
    displayEmail;

}

if (menuMerchantId) {

menuMerchantId.textContent =
    displayMerchantId;

}

}

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

accountMenuOpen =
false;

if (menu) {

menu.classList.remove(
    "open"
);

}

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
ACCOUNT MENU NAVIGATION
================================================= */

function goToSettings() {

closeAccountMenu();

}

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

sessionStorage.removeItem(
"merchantTrustSessions"
);

sessionStorage.removeItem(
"merchantSigningKeyBackup"
);

sessionStorage.removeItem(
"merchantBackupPasswordState"
);

sessionStorage.removeItem(
"signingKeyBackupSetting"
);

sessionStorage.removeItem(
"securitySetting"
);

window.location.href =
"index.html";

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

}

/* =================================================
OPEN ACCOUNT DETAILS
================================================= */

function openAccountDetails() {

closeAccountMenu();

hideSettingsOptions();

hideAccountPassword();

hideChangePassword();

hideSigningKeySettings();

hideBackupPassword();

hideCreateBackupPassword();

closeSigningKeyBackupPopup();

closeConfigurationSecurityPopup();

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
OPEN PASSWORD SETTINGS
================================================= */

function openAccountPassword() {

closeAccountMenu();

hideSettingsOptions();

hideAccountDetails();

hideChangePassword();

hideSigningKeySettings();

hideBackupPassword();

hideCreateBackupPassword();

closeSigningKeyBackupPopup();

closeConfigurationSecurityPopup();

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

updateConfigurationSecuritySettingUI();

updateSavedConfigurationSecuritySettingUI();

}

/* =================================================
OPEN CHANGE PASSWORD
================================================= */

function openChangePassword() {

closeAccountMenu();

hideSettingsOptions();

hideAccountDetails();

hideAccountPassword();

hideSigningKeySettings();

hideBackupPassword();

hideCreateBackupPassword();

closeSigningKeyBackupPopup();

closeConfigurationSecurityPopup();

const card =
document.getElementById(
"changePasswordCard"
);

if (!card) {
return;
}

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

if (currentPasswordInput) {

currentPasswordInput.value =
    "";

}

if (newPasswordInput) {

newPasswordInput.value =
    "";

}

if (confirmPasswordInput) {

confirmPasswordInput.value =
    "";

}

card.style.display =
"block";

setSettingsBackButton(
"Password Settings"
);

}

/* =================================================
OPEN SIGNING KEY SETTINGS
================================================= */

function openSigningKeySettings() {

closeAccountMenu();

hideSettingsOptions();

hideAccountDetails();

hideAccountPassword();

hideChangePassword();

hideBackupPassword();

hideCreateBackupPassword();

closeSigningKeyBackupPopup();

closeConfigurationSecurityPopup();

const card =
document.getElementById(
"signingKeySettingsCard"
);

if (!card) {
return;
}

card.style.display =
"block";

setSettingsBackButton(
"Account Settings"
);

updateSigningKeyBackupSettingUI();

updateSavedSigningKeyBackupSettingUI();

}

/* =================================================
OPEN BACKUP PASSWORD
================================================= */

function openBackupPassword() {

closeAccountMenu();

hideSettingsOptions();

hideAccountDetails();

hideAccountPassword();

hideChangePassword();

hideSigningKeySettings();

hideBackupPassword();

hideCreateBackupPassword();

closeSigningKeyBackupPopup();

closeConfigurationSecurityPopup();

const backupPasswordState =
sessionStorage.getItem(
"merchantBackupPasswordState"
);

if (
backupPasswordState ===
"true"
) {

openChangeBackupPassword();

}
else {

openCreateBackupPassword();

}

}

/* =================================================
OPEN CREATE BACKUP PASSWORD
================================================= */

function openCreateBackupPassword() {

const card =
document.getElementById(
"createBackupPasswordCard"
);

if (!card) {
return;
}

const newBackupPasswordInput =
document.getElementById(
"newCreateBackupPasswordInput"
);

const confirmNewBackupPasswordInput =
document.getElementById(
"confirmCreateBackupPasswordInput"
);

const accountPasswordInput =
document.getElementById(
"createBackupAccountPasswordInput"
);

if (newBackupPasswordInput) {

newBackupPasswordInput.value =
    "";

}

if (confirmNewBackupPasswordInput) {

confirmNewBackupPasswordInput.value =
    "";

}

if (accountPasswordInput) {

accountPasswordInput.value =
    "";

}

card.style.display =
"block";

setSettingsBackButton(
"Signing Key Settings"
);

}

/* =================================================
OPEN CHANGE BACKUP PASSWORD
================================================= */

function openChangeBackupPassword() {

const card =
document.getElementById(
"backupPasswordCard"
);

if (!card) {
return;
}

const currentBackupPasswordInput =
document.getElementById(
"currentBackupPasswordInput"
);

const newBackupPasswordInput =
document.getElementById(
"newBackupPasswordInput"
);

const confirmNewBackupPasswordInput =
document.getElementById(
"confirmNewBackupPasswordInput"
);

const accountPasswordInput =
document.getElementById(
"backupAccountPasswordInput"
);

if (currentBackupPasswordInput) {

currentBackupPasswordInput.value =
    "";

}

if (newBackupPasswordInput) {

newBackupPasswordInput.value =
    "";

}

if (confirmNewBackupPasswordInput) {

confirmNewBackupPasswordInput.value =
    "";

}

if (accountPasswordInput) {

accountPasswordInput.value =
    "";

}

card.style.display =
"block";

setSettingsBackButton(
"Signing Key Settings"
);

}

/* =================================================
CLOSE SETTINGS FORM
================================================= */

function closeSettingsForm() {

hideAccountDetails();

hideAccountPassword();

hideChangePassword();

hideSigningKeySettings();

hideBackupPassword();

hideCreateBackupPassword();

closeSigningKeyBackupPopup();

closeConfigurationSecurityPopup();

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

const changePasswordCard =
document.getElementById(
"changePasswordCard"
);

if (
changePasswordCard &&
changePasswordCard.style.display !== "none"
) {

openAccountPassword();

return;

}

const backupPasswordCard =
document.getElementById(
"backupPasswordCard"
);

if (
backupPasswordCard &&
backupPasswordCard.style.display !== "none"
) {

openSigningKeySettings();

return;

}

const createBackupPasswordCard =
document.getElementById(
"createBackupPasswordCard"
);

if (
createBackupPasswordCard &&
createBackupPasswordCard.style.display !== "none"
) {

openSigningKeySettings();

return;

}

const accountPasswordCard =
document.getElementById(
"accountPasswordCard"
);

if (
accountPasswordCard &&
accountPasswordCard.style.display !== "none"
) {

closeSettingsForm();

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

function hideChangePassword() {

const card =
document.getElementById(
"changePasswordCard"
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

function hideBackupPassword() {

const card =
document.getElementById(
"backupPasswordCard"
);

if (!card) {
return;
}

card.style.display =
"none";

}

function hideCreateBackupPassword() {

const card =
document.getElementById(
"createBackupPasswordCard"
);

if (!card) {
return;
}

card.style.display =
"none";

}

/* =================================================
SIGNING KEY BACKUP SETTING
================================================= */

let originalSigningKeyBackupSetting =
"ask_each_time";

let pendingSigningKeyBackupSetting =
"ask_each_time";

function initializeSigningKeyBackupSetting() {

const loginSetting =
sessionStorage.getItem(
"merchantSigningKeyBackup"
);

let setting;

if (
loginSetting === null ||
loginSetting.trim() === "" ||
loginSetting.toLowerCase() === "null"
) {

setting =
    "ask_each_time";

}
else if (
loginSetting.toLowerCase() ===
"true"
) {

setting =
    "automatic";

}
else if (
loginSetting.toLowerCase() ===
"false"
) {

setting =
    "self_managed";

}
else {

setting =
    "ask_each_time";

}

sessionStorage.setItem(
"signingKeyBackupSetting",
setting
);

originalSigningKeyBackupSetting =
setting;

pendingSigningKeyBackupSetting =
setting;

updateSigningKeyBackupSettingUI();

updateSavedSigningKeyBackupSettingUI();

}

/* =================================================
UPDATE SIGNING KEY BACKUP UI
================================================= */

function updateSigningKeyBackupSettingUI() {

const setting =
pendingSigningKeyBackupSetting ||
"ask_each_time";

const options =
document.querySelectorAll(
"#signingKeyBackupPopup .signing-key-popup-option"
);

options.forEach(
function(option) {

    const optionSetting =
        option.getAttribute(
            "data-setting"
        );


    if (
        optionSetting ===
        setting
    ) {

        option.classList.add(
            "selected"
        );

    }
    else {

        option.classList.remove(
            "selected"
        );

    }

}

);

updateSigningKeyBackupActions();

}

/* =================================================
UPDATE SAVED SIGNING KEY BACKUP LABEL
================================================= */

function updateSavedSigningKeyBackupSettingUI() {

const setting =
originalSigningKeyBackupSetting ||
"ask_each_time";

const label =
document.getElementById(
"signingKeyBackupSettingLabel"
);

if (!label) {
return;
}

if (setting === "automatic") {

label.textContent =
    "Back Up Automatically";

}
else if (setting === "self_managed") {

label.textContent =
    "I’ll Manage My Keys";

}
else {

label.textContent =
    "Ask Me Each Time";

}

}

/* =================================================
OPEN SIGNING KEY BACKUP POPUP
================================================= */

function openSigningKeyBackupPopup() {

const popup =
document.getElementById(
"signingKeyBackupPopup"
);

if (!popup) {
return;
}

const savedSetting =
sessionStorage.getItem(
"signingKeyBackupSetting"
) || "ask_each_time";

originalSigningKeyBackupSetting =
savedSetting;

pendingSigningKeyBackupSetting =
savedSetting;

updateSigningKeyBackupSettingUI();

updateSavedSigningKeyBackupSettingUI();

popup.classList.add(
"open"
);

const selector =
document.getElementById(
"signingKeyBackupSetting"
);

if (selector) {

selector.setAttribute(
    "aria-expanded",
    "true"
);

}

}

/* =================================================
CLOSE SIGNING KEY BACKUP POPUP
================================================= */

function closeSigningKeyBackupPopup(
event
) {

if (
event &&
event.target &&
event.target.id !==
"signingKeyBackupPopup"
) {

return;

}

const popup =
document.getElementById(
"signingKeyBackupPopup"
);

if (popup) {

popup.classList.remove(
    "open"
);

}

const selector =
document.getElementById(
"signingKeyBackupSetting"
);

if (selector) {

selector.setAttribute(
    "aria-expanded",
    "false"
);

}

}

/* =================================================
HANDLE SIGNING KEY BACKUP SETTING
================================================= */

function handleSigningKeyBackupSetting(
setting
) {

if (
setting !== "automatic" &&
setting !== "self_managed" &&
setting !== "ask_each_time"
) {

return;

}

pendingSigningKeyBackupSetting =
setting;

updateSigningKeyBackupSettingUI();

}

/* =================================================
UPDATE SIGNING KEY BACKUP ACTIONS
================================================= */

function updateSigningKeyBackupActions() {

const actions =
document.getElementById(
"signingKeyBackupActions"
);

if (!actions) {
return;
}

if (
pendingSigningKeyBackupSetting !==
originalSigningKeyBackupSetting
) {

actions.style.display =
    "flex";

}
else {

actions.style.display =
    "none";

}

}

/* =================================================
CANCEL SIGNING KEY BACKUP SETTING
================================================= */

function cancelSigningKeyBackupSetting() {

pendingSigningKeyBackupSetting =
originalSigningKeyBackupSetting;

updateSigningKeyBackupSettingUI();

closeSigningKeyBackupPopup();

}

/* =================================================
SAVE SIGNING KEY BACKUP SETTING
================================================= */

function saveSigningKeyBackupSetting() {

if (
pendingSigningKeyBackupSetting ===
originalSigningKeyBackupSetting
) {

return;

}

const backupPasswordState =
sessionStorage.getItem(
"merchantBackupPasswordState"
);

if (
pendingSigningKeyBackupSetting ===
"automatic" &&
backupPasswordState !==
"true"
) {

alert(
"You must create a Backup Password before enabling automatic signing key backups."
);

return;

}

sessionStorage.setItem(
"signingKeyBackupSetting",
pendingSigningKeyBackupSetting
);

originalSigningKeyBackupSetting =
pendingSigningKeyBackupSetting;

updateSigningKeyBackupSettingUI();

updateSavedSigningKeyBackupSettingUI();

closeSigningKeyBackupPopup();

}

/* =================================================
CONFIGURATION SECURITY SETTING
================================================= */

let originalConfigurationSecuritySetting =
"ask_every_time";

let pendingConfigurationSecuritySetting =
"ask_every_time";

function initializeConfigurationSecuritySetting() {

const loginSetting =
sessionStorage.getItem(
"merchantTrustSessions"
);

let setting;

if (
loginSetting === null ||
loginSetting.trim() === ""
) {

setting =
    "ask_every_time";

}
else if (
loginSetting.toLowerCase() ===
"true"
) {

setting =
    "trust_sessions";

}
else {

setting =
    "ask_every_time";

}

sessionStorage.setItem(
"securitySetting",
setting
);

originalConfigurationSecuritySetting =
setting;

pendingConfigurationSecuritySetting =
setting;

updateConfigurationSecuritySettingUI();

updateSavedConfigurationSecuritySettingUI();

}

/* =================================================
UPDATE CONFIGURATION SECURITY UI
================================================= */

function updateConfigurationSecuritySettingUI() {

const options =
document.querySelectorAll(
"#configurationSecurityPopup .signing-key-popup-option"
);

options.forEach(
function(option) {

    const optionSetting =
        option.dataset.securitySetting;


    if (
        optionSetting ===
        pendingConfigurationSecuritySetting
    ) {

        option.classList.add(
            "selected"
        );

    }
    else {

        option.classList.remove(
            "selected"
        );

    }

}

);

/* =================================================
UPDATE CONFIGURATION SECURITY ACTIONS
================================================= */

updateConfigurationSecurityActions();

}

/* =================================================
UPDATE SAVED CONFIGURATION SECURITY LABEL
================================================= */

function updateSavedConfigurationSecuritySettingUI() {

const label =
document.getElementById(
"configurationSecuritySettingLabel"
);

if (!label) {
return;
}

if (
originalConfigurationSecuritySetting ===
"trust_sessions"
) {

label.textContent =
    "Trust Sessions";

}
else {

label.textContent =
    "Ask Every Time";

}

}

/* =================================================
OPEN CONFIGURATION SECURITY POPUP
================================================= */

function openConfigurationSecurityPopup() {

const popup =
document.getElementById(
"configurationSecurityPopup"
);

const settingButton =
document.getElementById(
"configurationSecuritySetting"
);

if (!popup) {
return;
}

let setting =
sessionStorage.getItem(
"securitySetting"
);

if (
setting !== "trust_sessions" &&
setting !== "ask_every_time"
) {

setting =
    "ask_every_time";

sessionStorage.setItem(
    "securitySetting",
    setting
);

}

originalConfigurationSecuritySetting =
setting;

pendingConfigurationSecuritySetting =
setting;

updateConfigurationSecuritySettingUI();

updateConfigurationSecurityActions();

popup.classList.add(
"open"
);

if (settingButton) {

settingButton.setAttribute(
    "aria-expanded",
    "true"
);

}

}

/* =================================================
CLOSE CONFIGURATION SECURITY POPUP
================================================= */

function closeConfigurationSecurityPopup(
event
) {

const popup =
document.getElementById(
"configurationSecurityPopup"
);

const settingButton =
document.getElementById(
"configurationSecuritySetting"
);

if (!popup) {
return;
}

if (
event &&
event.target !== popup
) {

return;

}

popup.classList.remove(
"open"
);

if (settingButton) {

settingButton.setAttribute(
    "aria-expanded",
    "false"
);

}

}

/* =================================================
HANDLE CONFIGURATION SECURITY SETTING
================================================= */

function handleConfigurationSecuritySetting(
setting
) {

if (
setting !== "trust_sessions" &&
setting !== "ask_every_time"
) {

return;

}

pendingConfigurationSecuritySetting =
setting;

updateConfigurationSecuritySettingUI();

updateConfigurationSecurityActions();

}

/* =================================================
UPDATE CONFIGURATION SECURITY ACTIONS
================================================= */

function updateConfigurationSecurityActions() {

const actions =
document.getElementById(
"configurationSecurityActions"
);

if (!actions) {
return;
}

if (
pendingConfigurationSecuritySetting !==
originalConfigurationSecuritySetting
) {

actions.style.display =
    "flex";

}
else {

actions.style.display =
    "none";

}

}

/* =================================================
CANCEL CONFIGURATION SECURITY SETTING
================================================= */

function cancelConfigurationSecuritySetting() {

pendingConfigurationSecuritySetting =
originalConfigurationSecuritySetting;

updateConfigurationSecuritySettingUI();

updateConfigurationSecurityActions();

closeConfigurationSecurityPopup();

}

/* =================================================
SAVE CONFIGURATION SECURITY SETTING
================================================= */

function saveConfigurationSecuritySetting() {

sessionStorage.setItem(
"securitySetting",
pendingConfigurationSecuritySetting
);

originalConfigurationSecuritySetting =
pendingConfigurationSecuritySetting;

updateConfigurationSecuritySettingUI();

updateSavedConfigurationSecuritySettingUI();

updateConfigurationSecurityActions();

closeConfigurationSecurityPopup();

}

/* =================================================
SAVE ACCOUNT DETAILS
================================================= */

function saveAccountDetails(
event
) {

event.preventDefault();

const firstName =
document.getElementById(
"firstNameInput"
).value.trim();

const lastName =
document.getElementById(
"lastNameInput"
).value.trim();

const email =
document.getElementById(
"emailInput"
).value.trim().toLowerCase();

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

populateAccountMenu();

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

const currentPassword =
document.getElementById(
"currentPasswordInput"
).value;

const newPassword =
document.getElementById(
"newPasswordInput"
).value;

const confirmPassword =
document.getElementById(
"confirmPasswordInput"
).value;

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
SAVE BACKUP PASSWORD
================================================= */

function saveBackupPassword(
event
) {

event.preventDefault();

const backupPasswordState =
sessionStorage.getItem(
"merchantBackupPasswordState"
);

if (
backupPasswordState ===
"true"
) {

saveChangedBackupPassword();

}
else {

saveCreatedBackupPassword();

}

}

/* =================================================
SAVE CREATED BACKUP PASSWORD
================================================= */

function saveCreatedBackupPassword() {

const newBackupPassword =
document.getElementById(
"newCreateBackupPasswordInput"
).value;

const confirmNewBackupPassword =
document.getElementById(
"confirmCreateBackupPasswordInput"
).value;

const accountPassword =
document.getElementById(
"createBackupAccountPasswordInput"
).value;

if (!newBackupPassword) {

alert(
    "New Backup Password is required."
);

return;

}

if (!confirmNewBackupPassword) {

alert(
    "Please confirm your new Backup Password."
);

return;

}

if (
newBackupPassword !==
confirmNewBackupPassword
) {

alert(
    "The new Backup Passwords do not match."
);

return;

}

if (!accountPassword) {

alert(
    "Account Password is required."
);

return;

}

/*

* Actual verification will be handled
* by the server later.
* 
* The server will eventually:
* 
* 1. Verify the Account Password.
* 2. Create the Backup Password.
* 3. Derive the encryption key from
*    the Backup Password.
* 4. Wrap the Entity Signing Key.
* 5. Store the encrypted backup.
* 
* The Backup Password is not stored
* or verified in the browser.
  */

void newBackupPassword;

void accountPassword;

alert(
"Backup password setup will be connected to the server next."
);

}

/* =================================================
SAVE CHANGED BACKUP PASSWORD
================================================= */

function saveChangedBackupPassword() {

const currentBackupPassword =
document.getElementById(
"currentBackupPasswordInput"
).value;

const newBackupPassword =
document.getElementById(
"newBackupPasswordInput"
).value;

const confirmNewBackupPassword =
document.getElementById(
"confirmNewBackupPasswordInput"
).value;

const accountPassword =
document.getElementById(
"backupAccountPasswordInput"
).value;

if (!currentBackupPassword) {

alert(
    "Current Backup Password is required."
);

return;

}

if (!newBackupPassword) {

alert(
    "New Backup Password is required."
);

return;

}

if (!confirmNewBackupPassword) {

alert(
    "Please confirm your new Backup Password."
);

return;

}

if (
newBackupPassword !==
confirmNewBackupPassword
) {

alert(
    "The new Backup Passwords do not match."
);

return;

}

if (!accountPassword) {

alert(
    "Account Password is required."
);

return;

}

/*

* Actual verification will be handled
* by the server later.
* 
* The server will eventually:
* 
* 1. Verify the Account Password.
* 2. Verify the Current Backup Password.
* 3. Derive the encryption key from
*    the new Backup Password.
* 4. Re-wrap the Entity Signing Key backup.
* 5. Store the updated encrypted backup.
* 
* The Backup Password is not stored
* or verified in the browser.
  */

void currentBackupPassword;

void newBackupPassword;

void accountPassword;

alert(
"Backup password change will be connected to the server next."
);

}

/* =================================================
NAVIGATION
================================================= */

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
"open"
);

}

function closeDeveloperResponse(
event
) {

if (
event &&
event.target &&
event.target.id !==
"developerModal"
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
"open"
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

closeDeveloperResponse();

closeSigningKeyBackupPopup();

closeConfigurationSecurityPopup();

}

);