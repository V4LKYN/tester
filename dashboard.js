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
        sessionStorage.getItem("authToken");

    const merchantId =
        sessionStorage.getItem("merchantId");

    const email =
        sessionStorage.getItem("merchantEmail");

    const accountType =
        sessionStorage.getItem("merchantType");


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

    const displayAccountType =
        accountType || "—";


    /*
     * Account header.
     */

    setText(
        "accountEmail",
        displayEmail
    );


    setText(
        "menuEmail",
        displayEmail
    );


    /*
     * Merchant ID.
     */

    setText(
        "merchantId",
        displayMerchantId
    );


    /*
     * Welcome name.
     *
     * Until we have an authenticated
     * account profile endpoint, derive
     * a display name from the email.
     */

    const firstName =
        getFirstNameFromEmail(
            displayEmail
        );


    setText(
        "welcomeName",
        "Welcome, " + firstName
    );


    /*
     * Account Type.
     *
     * This comes directly from the
     * type returned by the login API.
     *
     * Login stores:
     *
     * sessionStorage.setItem(
     *     "merchantType",
     *     responseData.type || ""
     * );
     */

    setText(
        "configurationAccountType",
        displayAccountType
    );


    /*
     * Account Status.
     *
     * The current login system only
     * allows ACTIVE merchants to log in.
     */

    setText(
        "accountStatusBadge",
        "Active"
    );


    /*
     * Endpoints / API Keys.
     *
     * These remain zero until their
     * configuration systems are built.
     */

    setText(
        "configurationEndpointCount",
        "0 configured"
    );


    setText(
        "configurationApiKeyCount",
        "0 active"
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


function getFirstNameFromEmail(
    email
) {

    if (
        !email ||
        email === "—"
    ) {

        return "Merchant";

    }


    const localPart =
        email.split("@")[0];


    if (!localPart) {
        return "Merchant";
    }


    const cleaned =
        localPart
            .replace(/[._-]+/g, " ")
            .trim();


    if (!cleaned) {
        return "Merchant";
    }


    return cleaned
        .split(" ")
        .map(function(word) {

            if (!word) {
                return "";
            }

            return (
                word.charAt(0).toUpperCase() +
                word.slice(1)
            );

        })
        .join(" ");

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
        "merchantType"
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

    const button =
        document.querySelector(
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
Developer Response
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

        if (event.key !== "Escape") {
            return;
        }


        closeAccountMenu();

        closeDeveloperResponse();

    }
);