/* =================================================
   SETTINGS PAGE
   ================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeSettings();

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


    populateAccountDetails();

    initializeSigningKeyBackupSetting();

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

    closeSigningKeyBackupPopup();

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

    closeSigningKeyBackupPopup();

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

    closeSigningKeyBackupPopup();

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

}


/* =================================================
   CLOSE SETTINGS FORM
   ================================================= */

function closeSettingsForm() {

    hideAccountDetails();

    hideAccountPassword();

    hideSigningKeySettings();

    closeSigningKeyBackupPopup();

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
   SIGNING KEY BACKUP SETTING
   ================================================= */

function initializeSigningKeyBackupSetting() {

    let setting =
        sessionStorage.getItem(
            "signingKeyBackupSetting"
        );


    if (!setting) {

        setting =
            "ask_each_time";

        sessionStorage.setItem(
            "signingKeyBackupSetting",
            setting
        );

    }


    updateSigningKeyBackupSettingUI();

}


/* =================================================
   UPDATE SIGNING KEY BACKUP UI
   ================================================= */

function updateSigningKeyBackupSettingUI() {

    const setting =
        sessionStorage.getItem(
            "signingKeyBackupSetting"
        ) || "ask_each_time";


    const label =
        document.getElementById(
            "signingKeyBackupSettingLabel"
        );


    if (label) {

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


    const options =
        document.querySelectorAll(
            ".signing-key-popup-option"
        );


    options.forEach(
        function(option) {

            const optionSetting =
                option.getAttribute(
                    "data-setting"
                );

            const check =
                option.querySelector(
                    ".signing-key-popup-check"
                );


            if (
                optionSetting === setting
            ) {

                option.classList.add(
                    "selected"
                );


                if (check) {

                    check.style.visibility =
                        "visible";

                }

            }
            else {

                option.classList.remove(
                    "selected"
                );


                if (check) {

                    check.style.visibility =
                        "hidden";

                }

            }

        }
    );

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


    updateSigningKeyBackupSettingUI();


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


    sessionStorage.setItem(
        "signingKeyBackupSetting",
        setting
    );


    updateSigningKeyBackupSettingUI();


    closeSigningKeyBackupPopup();

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


    if (newPassword !== confirmPassword) {

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
   NAVIGATION
   ================================================= */

function goToDashboard() {

    window.location.href =
        "dashboard.html";

}