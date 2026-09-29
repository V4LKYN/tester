let accountMenuOpen = false;


/* ==============================
   Initialization
   ============================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeDashboard();

        document.addEventListener(
            "click",
            handleDocumentClick
        );

    }
);


/* ==============================
   Dashboard Initialization
   ============================== */

function initializeDashboard() {

    const authToken =
        sessionStorage.getItem(
            "authToken"
        );

    const merchantId =
        sessionStorage.getItem(
            "merchantId"
        );

    const email =
        sessionStorage.getItem(
            "merchantEmail"
        );

    const firstName =
        sessionStorage.getItem(
            "merchantFirstName"
        );

    const accountType =
        sessionStorage.getItem(
            "merchantType"
        );

    const accountStatus =
        sessionStorage.getItem(
            "merchantStatus"
        );

    const createdAt =
        sessionStorage.getItem(
            "merchantCreatedAt"
        );

    const updatedAt =
        sessionStorage.getItem(
            "merchantUpdatedAt"
        );


    /*
     * If there is no login session,
     * return the user to the
     * authentication page.
     */

    if (!authToken) {

        window.location.href =
            "index.html";

        return;

    }


    /*
     * Display the authenticated
     * merchant information.
     */

    const displayEmail =
        email || "—";

    const displayMerchantId =
        merchantId || "—";

    const displayFirstName =
        firstName || "Merchant";

    const displayAccountType =
        accountType || "—";

    const displayAccountStatus =
        accountStatus || "ACTIVE";


    /*
     * Account header email.
     */

    setText(
        "accountEmail",
        displayEmail
    );


    /*
     * Account menu email.
     */

    setText(
        "menuEmail",
        displayEmail
    );


    /*
     * Merchant ID in account menu.
     */

    setText(
        "menuMerchantId",
        displayMerchantId
    );


    /*
     * Merchant ID.
     */

    setText(
        "merchantId",
        displayMerchantId
    );


    /*
     * Welcome message.
     */

    setText(
        "welcomeName",
        "Welcome, " +
        displayFirstName
    );


    /*
     * Account Type.
     */

    setText(
        "configurationAccountType",
        displayAccountType
    );


    /*
     * Account Status.
     */

    setText(
        "accountStatusBadge",
        formatAccountStatus(
            displayAccountStatus
        )
    );


    /*
     * Entities.
     *
     * Entity configuration has not
     * been implemented yet.
     */

    setText(
        "configurationEntityCount",
        "0 configured"
    );


    /*
     * Last Updated.
     */

    setText(
        "configurationUpdatedAt",
        formatDateTime(
            updatedAt
        )
    );


    /*
     * Created.
     */

    setText(
        "configurationCreatedAt",
        formatDateTime(
            createdAt
        )
    );

}


/* ==============================
   Helpers
   ============================== */

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {
        return;
    }


    element.textContent =
        value;

}


function formatDateTime(
    value
) {

    if (!value) {

        return "—";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;

    }


    return date.toLocaleString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit"
        }
    );

}


function formatAccountStatus(
    status
) {

    if (!status) {

        return "—";

    }


    return status
        .toLowerCase()
        .replace(
            /\b\w/g,
            function(character) {

                return character.toUpperCase();

            }
        );

}


/* ==============================
   Dashboard Tabs
   ============================== */

function showOverview() {

    setDashboardTab(
        "overview"
    );

}


function showEntities() {

    setDashboardTab(
        "entities"
    );

}


function showEndpoints() {

    setDashboardTab(
        "endpoints"
    );

}


function showSources() {

    setDashboardTab(
        "sources"
    );

}


function setDashboardTab(tab) {

    const overviewContent =
        document.getElementById(
            "overviewContent"
        );

    const entitiesContent =
        document.getElementById(
            "entitiesContent"
        );

    const endpointsContent =
        document.getElementById(
            "endpointsContent"
        );

    const sourcesContent =
        document.getElementById(
            "sourcesContent"
        );


    const overviewNavigation =
        document.getElementById(
            "overviewNavigation"
        );

    const entitiesNavigation =
        document.getElementById(
            "entitiesNavigation"
        );

    const endpointsNavigation =
        document.getElementById(
            "endpointsNavigation"
        );

    const sourcesNavigation =
        document.getElementById(
            "sourcesNavigation"
        );


    if (
        !overviewContent ||
        !entitiesContent ||
        !endpointsContent ||
        !sourcesContent ||
        !overviewNavigation ||
        !entitiesNavigation ||
        !endpointsNavigation ||
        !sourcesNavigation
    ) {

        return;

    }


    overviewContent.style.display =
        "none";

    entitiesContent.style.display =
        "none";

    endpointsContent.style.display =
        "none";

    sourcesContent.style.display =
        "none";


    overviewNavigation.classList.remove(
        "active"
    );

    entitiesNavigation.classList.remove(
        "active"
    );

    endpointsNavigation.classList.remove(
        "active"
    );

    sourcesNavigation.classList.remove(
        "active"
    );


    if (tab === "entities") {

        entitiesContent.style.display =
            "block";

        entitiesNavigation.classList.add(
            "active"
        );

        return;

    }


    if (tab === "endpoints") {

        endpointsContent.style.display =
            "block";

        endpointsNavigation.classList.add(
            "active"
        );

        return;

    }


    if (tab === "sources") {

        sourcesContent.style.display =
            "block";

        sourcesNavigation.classList.add(
            "active"
        );

        return;

    }


    overviewContent.style.display =
        "block";

    overviewNavigation.classList.add(
        "active"
    );

}


/* ==============================
   Page Navigation
   ============================== */

function goToSettings() {

    window.location.href =
        "settings.html";

}


function goToDashboard() {

    window.location.href =
        "dashboard.html";

}


/* ==============================
   Account Menu
   ============================== */

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


/* ==============================
   Logout
   ============================== */

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


/* ==============================
   Copy Merchant ID
   ============================== */

async function copyMerchantId() {

    const element =
        document.getElementById(
            "merchantId"
        );


    if (!element) {
        return;
    }


    const merchantId =
        element.textContent.trim();


    if (
        !merchantId ||
        merchantId === "—"
    ) {

        return;

    }


    try {

        await navigator.clipboard.writeText(
            merchantId
        );

        showCopyState();

    } catch (error) {

        console.log(
            "Unable to copy Merchant ID.",
            error
        );

    }

}


function showCopyState() {

    const merchantIdElement =
        document.getElementById(
            "merchantId"
        );


    if (!merchantIdElement) {
        return;
    }


    const row =
        merchantIdElement.closest(
            ".merchant-id-row"
        );


    if (!row) {
        return;
    }


    const button =
        row.querySelector(
            ".copy-button"
        );


    if (!button) {
        return;
    }


    const originalText =
        button.textContent;


    button.textContent =
        "Copied";


    setTimeout(
        function() {

            button.textContent =
                originalText;

        },
        1200
    );

}


/* ==============================
   Coming Soon
   ============================== */

function showComingSoon(
    section
) {

    alert(
        section +
        " configuration is coming soon."
    );

}


/* ==============================
   Developer Modal
   ============================== */

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


/* ==============================
   Escape Key
   ============================== */

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