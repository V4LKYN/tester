const API_BASE_URL =
"https://server-testing-production-7a62.up.railway.app";

let onboardingId = null;
let merchantId = null;
let authToken = null;

// ---------------------------------------------------------
// GENERAL STATUS
// ---------------------------------------------------------

function showStatus(
message,
type
) {

const element =
    document.getElementById(
        "signupStatus"
    );


if (!element) {
    return;
}


element.textContent =
    message;


element.className =
    "status " + type;

}

function clearStatus() {

const element =
    document.getElementById(
        "signupStatus"
    );


if (!element) {
    return;
}


element.textContent =
    "";


element.className =
    "status";

}

// ---------------------------------------------------------
// DEVELOPER RESPONSE MODAL
// ---------------------------------------------------------

function showDeveloperResponse(
response,
data
) {

const meta =
    document.getElementById(
        "developerMeta"
    );


const output =
    document.getElementById(
        "developerResponseText"
    );


if (!meta || !output) {
    return;
}


meta.textContent =
    "HTTP " +
    response.status +
    " " +
    response.statusText;


output.textContent =
    JSON.stringify(
        data,
        null,
        4
    );

}

function showDeveloperError(
error
) {

const meta =
    document.getElementById(
        "developerMeta"
    );


const output =
    document.getElementById(
        "developerResponseText"
    );


if (!meta || !output) {
    return;
}


meta.textContent =
    "Connection Error";


output.textContent =
    JSON.stringify(
        {
            error:
                error.message
        },
        null,
        4
    );

}

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
    event.target !== event.currentTarget
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

// ---------------------------------------------------------
// AUTHENTICATION NAVIGATION
// ---------------------------------------------------------

function hideAllScreens() {

document
    .querySelectorAll(
        ".step"
    )
    .forEach(
        function(element) {

            element.classList.remove(
                "active"
            );

        }
    );

}

function showAuthChoice() {

hideAllScreens();

clearStatus();


document
    .getElementById(
        "authChoice"
    )
    .classList.add(
        "active"
    );

}

function showLogin() {

hideAllScreens();

clearStatus();


document
    .getElementById(
        "login"
    )
    .classList.add(
        "active"
    );


document
    .getElementById(
        "loginEmail"
    )
    .focus();

}

function showSignup() {

hideAllScreens();

clearStatus();


document
    .getElementById(
        "signup"
    )
    .classList.add(
        "active"
    );


resetSignupState();

}

// ---------------------------------------------------------
// SIGNUP FLOW
// ---------------------------------------------------------

function setSignupStep(
step
) {

document
    .querySelectorAll(
        ".signup-step"
    )
    .forEach(
        function(element) {

            element.classList.remove(
                "active"
            );

        }
    );


document
    .getElementById(
        "signupStep" + step
    )
    .classList.add(
        "active"
    );


setFlowStep(
    step
);

}

function setFlowStep(
step
) {

for (
    let i = 1;
    i <= 3;
    i++
) {

    const circle =
        document.getElementById(
            "flowCircle" + i
        );


    const label =
        document.getElementById(
            "flowLabel" + i
        );


    if (circle) {

        circle.classList.remove(
            "active",
            "complete"
        );

    }


    if (label) {

        label.classList.remove(
            "active"
        );

    }

}


const line1 =
    document.getElementById(
        "flowLine1"
    );


const line2 =
    document.getElementById(
        "flowLine2"
    );


if (line1) {

    line1.classList.remove(
        "complete"
    );

}


if (line2) {

    line2.classList.remove(
        "complete"
    );

}


if (step >= 1) {

    document
        .getElementById(
            "flowCircle1"
        )
        .classList.add(
            step === 1
                ? "active"
                : "complete"
        );


    document
        .getElementById(
            "flowLabel1"
        )
        .classList.add(
            "active"
        );

}


if (step >= 2) {

    document
        .getElementById(
            "flowCircle2"
        )
        .classList.add(
            step === 2
                ? "active"
                : "complete"
        );


    document
        .getElementById(
            "flowLabel2"
        )
        .classList.add(
            "active"
        );


    document
        .getElementById(
            "flowLine1"
        )
        .classList.add(
            "complete"
        );

}


if (step >= 3) {

    document
        .getElementById(
            "flowCircle3"
        )
        .classList.add(
            "complete"
        );


    document
        .getElementById(
            "flowLabel3"
        )
        .classList.add(
            "active"
        );


    document
        .getElementById(
            "flowLine2"
        )
        .classList.add(
            "complete"
        );

}

}

// ---------------------------------------------------------
// FORM DATA
// ---------------------------------------------------------

function getFormData() {

return {

    email:
        document
            .getElementById(
                "email"
            )
            .value
            .trim(),

    first_name:
        document
            .getElementById(
                "firstName"
            )
            .value
            .trim(),

    last_name:
        document
            .getElementById(
                "lastName"
            )
            .value
            .trim(),

    password:
        document
            .getElementById(
                "password"
            )
            .value

};

}

// ---------------------------------------------------------
// PASSWORD VALIDATION
// ---------------------------------------------------------

function validatePassword(
password
) {

if (password.length < 8) {

    return (
        "Password must be at least 8 characters."
    );

}


if (password.length > 128) {

    return (
        "Password cannot exceed 128 characters."
    );

}


if (!/[A-Z]/.test(password)) {

    return (
        "Password must contain at least one uppercase letter."
    );

}


if (!/[a-z]/.test(password)) {

    return (
        "Password must contain at least one lowercase letter."
    );

}


if (!/[0-9]/.test(password)) {

    return (
        "Password must contain at least one number."
    );

}


if (!/[^A-Za-z0-9]/.test(password)) {

    return (
        "Password must contain at least one special character."
    );

}


return null;

}

// ---------------------------------------------------------
// START ONBOARDING
// ---------------------------------------------------------

async function startOnboarding() {

const data =
    getFormData();


const confirmPassword =
    document
        .getElementById(
            "confirmPassword"
        )
        .value;


if (!data.email) {

    showStatus(
        "Email is required.",
        "error"
    );

    return;

}


if (!data.first_name) {

    showStatus(
        "First name is required.",
        "error"
    );

    return;

}


if (!data.last_name) {

    showStatus(
        "Last name is required.",
        "error"
    );

    return;

}


if (!data.password) {

    showStatus(
        "Password is required.",
        "error"
    );

    return;

}


const passwordError =
    validatePassword(
        data.password
    );


if (passwordError) {

    showStatus(
        passwordError,
        "error"
    );

    return;

}


if (
    data.password !==
    confirmPassword
) {

    showStatus(
        "Passwords do not match.",
        "error"
    );

    return;

}


const button =
    document.getElementById(
        "startButton"
    );


button.disabled =
    true;


button.textContent =
    "Creating Account...";


showStatus(
    "Creating account...",
    "info"
);


try {

    const response =
        await fetch(
            API_BASE_URL +
            "/api/v1/onboarding",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(data)

            }
        );


    const responseData =
        await response.json();


    showDeveloperResponse(
        response,
        responseData
    );


    if (!response.ok) {

        showStatus(
            responseData.detail ||
            "The server rejected the account creation request.",
            "error"
        );

        return;

    }


    onboardingId =
        responseData.onboarding_id;


    if (!onboardingId) {

        showStatus(
            "The server did not return an onboarding ID.",
            "error"
        );

        return;

    }


    document
        .getElementById(
            "signupEmailDisplay"
        )
        .textContent =
        data.email;


    document
        .getElementById(
            "onboardingStatusDisplay"
        )
        .textContent =
        responseData.status ||
        "OTP_REQUIRED";


    setSignupStep(
        2
    );


    showStatus(
        "Enter the verification code sent to your email.",
        "success"
    );


    document
        .getElementById(
            "otp"
        )
        .focus();

} catch (error) {

    showStatus(
        "Could not connect to the Main Server.",
        "error"
    );


    showDeveloperError(
        error
    );

} finally {

    button.disabled =
        false;


    button.textContent =
        "Create Account";

}

}

// ---------------------------------------------------------
// VERIFY ONBOARDING
// ---------------------------------------------------------

async function verifyOnboarding() {

if (!onboardingId) {

    showStatus(
        "No onboarding session is active.",
        "error"
    );

    return;

}


const otp =
    document
        .getElementById(
            "otp"
        )
        .value
        .trim();


if (!/^\d{6}$/.test(otp)) {

    showStatus(
        "Verification code must contain exactly 6 digits.",
        "error"
    );

    return;

}


const button =
    document.getElementById(
        "verifyButton"
    );


button.disabled =
    true;


button.textContent =
    "Verifying...";


showStatus(
    "Verifying your email...",
    "info"
);


try {

    const response =
        await fetch(

            API_BASE_URL +
            "/api/v1/onboarding/" +
            encodeURIComponent(
                onboardingId
            ) +
            "/verify",

            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({
                        otp: otp
                    })

            }

        );


    const responseData =
        await response.json();


    showDeveloperResponse(
        response,
        responseData
    );


    if (!response.ok) {

        showStatus(
            responseData.detail ||
            "Email verification failed.",
            "error"
        );

        return;

    }


    merchantId =
        responseData.merchant_id;


    document
        .getElementById(
            "resultStatus"
        )
        .textContent =
        responseData.status ||
        "COMPLETED";


    document
        .getElementById(
            "resultMerchantId"
        )
        .textContent =
        merchantId ||
        "Not returned";


    setSignupStep(
        3
    );


    showStatus(
        "Your merchant account was created successfully.",
        "success"
    );

} catch (error) {

    showStatus(
        "Could not connect to the Main Server.",
        "error"
    );


    showDeveloperError(
        error
    );

} finally {

    button.disabled =
        false;


    button.textContent =
        "Verify Email";

}

}

// ---------------------------------------------------------
// LOGIN
// ---------------------------------------------------------

async function login() {

const email =
    document
        .getElementById(
            "loginEmail"
        )
        .value
        .trim();


const password =
    document
        .getElementById(
            "loginPassword"
        )
        .value;


if (!email) {

    showStatus(
        "Email is required.",
        "error"
    );

    return;

}


if (!password) {

    showStatus(
        "Password is required.",
        "error"
    );

    return;

}


const button =
    document.getElementById(
        "loginButton"
    );


button.disabled =
    true;


button.textContent =
    "Signing In...";


showStatus(
    "Signing in...",
    "info"
);


try {

    const response =
        await fetch(
            API_BASE_URL +
            "/api/v1/auth/login",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({
                        email: email,
                        password: password
                    })

            }
        );


    const responseData =
        await response.json();


    showDeveloperResponse(
        response,
        responseData
    );


    if (!response.ok) {

        showStatus(
            responseData.detail ||
            "Invalid email or password.",
            "error"
        );

        return;

    }


    // -------------------------------------------------
    // STORE AUTHENTICATION
    // -------------------------------------------------

    authToken =
        responseData.access_token;


    merchantId =
        responseData.merchant_id;


    if (!authToken) {

        showStatus(
            "The server did not return an authentication token.",
            "error"
        );

        return;

    }


    // -------------------------------------------------
    // STORE SESSION
    // -------------------------------------------------

    sessionStorage.setItem(
        "authToken",
        authToken
    );


    sessionStorage.setItem(
        "merchantId",
        merchantId || ""
    );


    sessionStorage.setItem(
        "merchantEmail",
        responseData.email ||
        email
    );


    // -------------------------------------------------
    // DASHBOARD
    // -------------------------------------------------

    document
        .getElementById(
            "dashboardEmail"
        )
        .textContent =
        responseData.email ||
        email;


    document
        .getElementById(
            "dashboardMerchantId"
        )
        .textContent =
        merchantId ||
        "—";


    hideAllScreens();


    document
        .getElementById(
            "dashboard"
        )
        .classList.add(
            "active"
        );


    clearStatus();

} catch (error) {

    showStatus(
        "Could not connect to the Main Server.",
        "error"
    );


    showDeveloperError(
        error
    );

} finally {

    button.disabled =
        false;


    button.textContent =
        "Log In";

}

}

// ---------------------------------------------------------
// LOGOUT
// ---------------------------------------------------------

function logout() {

authToken =
    null;


merchantId =
    null;


sessionStorage.removeItem(
    "authToken"
);


sessionStorage.removeItem(
    "merchantId"
);


sessionStorage.removeItem(
    "merchantEmail"
);


document
    .getElementById(
        "loginEmail"
    )
    .value =
    "";


document
    .getElementById(
        "loginPassword"
    )
    .value =
    "";


showAuthChoice();

}

// ---------------------------------------------------------
// RESTORE SESSION
// ---------------------------------------------------------

function restoreSession() {

const storedToken =
    sessionStorage.getItem(
        "authToken"
    );


const storedMerchantId =
    sessionStorage.getItem(
        "merchantId"
    );


const storedEmail =
    sessionStorage.getItem(
        "merchantEmail"
    );


if (
    !storedToken ||
    !storedMerchantId
) {

    return;

}


authToken =
    storedToken;


merchantId =
    storedMerchantId;


document
    .getElementById(
        "dashboardEmail"
    )
    .textContent =
    storedEmail ||
    "—";


document
    .getElementById(
        "dashboardMerchantId"
    )
    .textContent =
    storedMerchantId;


hideAllScreens();


document
    .getElementById(
        "dashboard"
    )
    .classList.add(
        "active"
    );

}

// ---------------------------------------------------------
// RESET SIGNUP
// ---------------------------------------------------------

function resetSignupState() {

onboardingId =
    null;


merchantId =
    null;


document
    .getElementById(
        "email"
    )
    .value =
    "";


document
    .getElementById(
        "firstName"
    )
    .value =
    "John";


document
    .getElementById(
        "lastName"
    )
    .value =
    "Smith";


document
    .getElementById(
        "password"
    )
    .value =
    "";


document
    .getElementById(
        "confirmPassword"
    )
    .value =
    "";


document
    .getElementById(
        "otp"
    )
    .value =
    "";


document
    .getElementById(
        "signupEmailDisplay"
    )
    .textContent =
    "—";


document
    .getElementById(
        "onboardingStatusDisplay"
    )
    .textContent =
    "OTP_REQUIRED";


document
    .getElementById(
        "resultStatus"
    )
    .textContent =
    "—";


document
    .getElementById(
        "resultMerchantId"
    )
    .textContent =
    "—";


setSignupStep(
    1
);

}

// ---------------------------------------------------------
// OTP INPUT
// ---------------------------------------------------------

document
.getElementById(
"otp"
)
.addEventListener(
"input",
function() {

        this.value =
            this.value
                .replace(
                    /\D/g,
                    ""
                )
                .slice(
                    0,
                    6
                );

    }
);

document
.getElementById(
"otp"
)
.addEventListener(
"keydown",
function(event) {

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();

            verifyOnboarding();

        }

    }
);

// ---------------------------------------------------------
// LOGIN ENTER KEY
// ---------------------------------------------------------

document
.getElementById(
"loginPassword"
)
.addEventListener(
"keydown",
function(event) {

        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();

            login();

        }

    }
);

// ---------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------

document.addEventListener(
"DOMContentLoaded",
function() {

    restoreSession();

}

);