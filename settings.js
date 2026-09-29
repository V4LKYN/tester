/* =================================================
   SETTINGS PAGE
   ================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeSettings();

        document.addEventListener(
            "click",
            handleDocumentClick
        );

        document.addEventListener(
            "keydown",
            handleSettingsKeydown
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


    populateAccountDetails();

    initializeAccountMenu();

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
            email || "—";

    }


    if (menuEmail) {

        menuEmail.textContent =
            email || "—";

    }


    if (menuMerchantId) {

        menuMerchantId.textContent =
            sessionStorage.getItem(
                "merchantId"
            ) || "—";

    }

}


/* =================================================
   ACCOUNT MENU
   ================================================= */

function initializeAccountMenu() {

    const menu =
        document.getElementById(
            "accountMenu"
        );

    if (!menu) {
        return;
    }

    menu.classList.remove("visible");

}


function toggleAccountMenu() {

    const menu =
        document.getElementById(
            "accountMenu"
        );

    if (!menu) {
        return;
    }


    menu.classList.toggle(
        "visible"
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


    menu.classList.remove(
        "visible"
    );

}


function handleDocumentClick(event) {

    const container =
        document.querySelector(
            ".account-container"
        );


    if (
        container &&
        !container.contains(event.target)
    ) {

        closeAccountMenu();

    }

}


/* =================================================
   ACCOUNT NAVIGATION
   ================================================= */

function goToSettings() {

    closeAccountMenu();

    window.location.href =
        "settings.html";

}


function goToDashboard() {

    closeAccountMenu();

    window.location.href =
        "dashboard.html";

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


    window.location.href =
        "index.html";

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
   OPEN KEY SETTINGS
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
   CLOSE SETTINGS FORM
   ================================================= */

function closeSettingsForm() {

    closeSigningKeyBackupPopup();

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

const DEFAULT_SIGNING_KEY_BACKUP_SETTING =
    "ask_each_time";


function initializeSigningKeySettings() {

    let setting =
        sessionStorage.getItem(
            "signingKeyBackupSetting"
        );


    if (
        setting !== "automatic" &&
        setting !== "self_managed" &&
        setting !== "ask_each_time"
    ) {

        setting =
            DEFAULT_SIGNING_KEY_BACKUP_SETTING;

        sessionStorage.setItem(
            "signingKeyBackupSetting",
            setting
        );

    }


    updateSigningKeyBackupDisplay(
        setting
    );


    updateSigningKeyBackupOptions(
        setting
    );

}


function updateSigningKeyBackupDisplay(
    setting
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
        labels[setting] ||
        labels.ask_each_time;

}


/* =================================================
   OPEN SIGNING KEY BACKUP POPUP
   ================================================= */

function openSigningKeyBackupPopup() {

    initializeSigningKeySettings();


    const popup =
        document.getElementById(
            "signingKeyBackupPopup"
        );

    if (!popup) {
        return;
    }


    popup.classList.add(
        "visible"
    );


    document.body.style.overflow =
        "hidden";

}


/* =================================================
   CLOSE SIGNING KEY BACKUP POPUP
   ================================================= */

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


    document.body.style.overflow =
        "";

}


/* =================================================
   POPUP BACKGROUND CLICK
   ================================================= */

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


    updateSigningKeyBackupDisplay(
        setting
    );


    updateSigningKeyBackupOptions(
        setting
    );


    closeSigningKeyBackupPopup();

}


/* =================================================
   UPDATE POPUP RADIO STATES
   ================================================= */

function updateSigningKeyBackupOptions(
    selectedSetting
) {

    const options = {

        automatic:
            document.getElementById(
                "signingKeyOptionAutomatic"
            ),

        self_managed:
            document.getElementById(
                "signingKeyOptionSelfManaged"
            ),

        ask_each_time:
            document.getElementById(
                "signingKeyOptionAskEachTime"
            )

    };


    Object.keys(options).forEach(
        function(setting) {

            const option =
                options[setting];

            if (!option) {
                return;
            }


            if (
                setting ===
                selectedSetting
            ) {

                option.classList.add(
                    "selected"
                );

                option.setAttribute(
                    "aria-checked",
                    "true"
                );

            } else {

                option.classList.remove(
                    "selected"
                );

                option.setAttribute(
                    "aria-checked",
                    "false"
                );

            }

        }
    );

}


/* =================================================
   KEYBOARD HANDLING
   ================================================= */

function handleSettingsKeydown(
    event
) {

    if (
        event.key === "Escape"
    ) {

        const popup =
            document.getElementById(
                "signingKeyBackupPopup"
            );


        if (
            popup &&
            popup.classList.contains(
                "visible"
            )
        ) {

            closeSigningKeyBackupPopup();

            return;

        }


        closeAccountMenu();

    }

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


    populateAccountDetails();


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


    alert(
        "Password change will be connected to the server next."
    );

}


/* =================================================
   DEVELOPER RESPONSE
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