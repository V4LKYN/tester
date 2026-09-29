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

    hideAccountPassword();

    initializeSigningKeySettings();


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

}


/* =================================================
   CLOSE SETTINGS CARD
   ================================================= */

function closeSettingsForm() {

    hideAccountDetails();

    hideAccountPassword();

    hideSigningKeySettings();

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
   SIGNING KEY SETTINGS
   ================================================= */

function initializeSigningKeySettings() {

    const select =
        document.getElementById(
            "signingKeyBackupSetting"
        );


    if (!select) {
        return;
    }


    const savedSetting =
        sessionStorage.getItem(
            "signingKeyBackupSetting"
        );


    if (savedSetting) {

        select.value =
            savedSetting;

    }

}


function handleSigningKeyBackupSetting(
    value
) {

    sessionStorage.setItem(
        "signingKeyBackupSetting",
        value
    );

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

    }
);


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