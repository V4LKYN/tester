const API_BASE_URL =
    "https://server-testing-production-7a62.up.railway.app";

let onboardingId = null;
let merchantId = null;
let authToken = null;


// ---------------------------------------------------------
// GENERAL STATUS
// ---------------------------------------------------------

function showStatus(message, type) {

    const element =
        document.getElementById("signupStatus");

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className =
        "status " + type;
}


function clearStatus() {

    const element =
        document.getElementById("signupStatus");

    if (!element) {
        return;
    }

    element.textContent = "";

    element.className = "status";
}


// ---------------------------------------------------------
// DEVELOPER RESPONSE MODAL
// ---------------------------------------------------------

function showDeveloperResponse(response, data) {

    const meta =
        document.getElementById("developerMeta");

    const output =
        document.getElementById("developerResponseText");

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


function showDeveloperError(error) {

    const meta =
        document.getElementById("developerMeta");

    const output =
        document.getElementById("developerResponseText");

    if (!meta || !output) {
        return;
    }

    meta.textContent =
        "Connection Error";

    output.textContent =
        JSON.stringify(
            {
                error: error.message
            },
            null,
            4
        );
}


function openDeveloperResponse() {

    const modal =
        document.getElementById("developerModal");

    if (!modal) {
        return;
    }

    modal.classList.add("visible");
}


function closeDeveloperResponse(event) {

    /*
     * If this function was triggered by clicking
     * inside the modal content, do nothing.
     */
    if (
        event &&
        event.target !== event.currentTarget
    ) {
        return;
    }

    const modal =
        document.getElementById("developerModal");

    if (!modal) {
        return;
    }

    modal.classList.remove("visible");
}


// ---------------------------------------------------------
// AUTHENTICATION NAVIGATION
// ---------------------------------------------------------

function hideAllScreens() {

    document
        .querySelectorAll(".step")
        .forEach(function(element) {

            element.classList.remove("active");

        });
}


function showAuthChoice() {

    hideAllScreens();

    clearStatus();

    const screen =
        document.getElementById("authChoice");

    if (!screen) {
        return;
    }

    screen.classList.add("active");
}


function showLogin() {

    hideAllScreens();

    clearStatus();

    const screen =
        document.getElementById("login");

    if (!screen) {
        return;
    }

    screen.classList.add("active");

    const emailInput =
        document.getElementById("loginEmail");

    if (emailInput) {
        emailInput.focus();
    }
}


function showSignup() {

    hideAllScreens();

    clearStatus();

    const screen =
        document.getElementById("signup");

    if (!screen) {
        return;
    }

    screen.classList.add("active");

    resetSignupState();
}


// ---------------------------------------------------------
// SIGNUP FLOW
// ---------------------------------------------------------

function setSignupStep(step) {

    document
        .querySelectorAll(".signup-step")
        .forEach(function(element) {

            element.classList.remove("active");

        });

    const target =
        document.getElementById(
            "signupStep" + step
        );

    if (target) {
        target.classList.add("active");
    }

    setFlowStep(step);
}


function setFlowStep(step) {

    for (let i = 1; i <= 3; i++) {

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
        document.getElementById("flowLine1");

    const line2 =
        document.getElementById("flowLine2");


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

        const circle1 =
            document.getElementById(
                "flowCircle1"
            );

        const label1 =
            document.getElementById(
                "flowLabel1"
            );

        if (circle1) {

            circle1.classList.add(
                step === 1
                    ? "active"
                    : "complete"
            );

        }

        if (label1) {

            label1.classList.add(
                "active"
            );

        }
    }


    if (step >= 2) {

        const circle2 =
            document.getElementById(
                "flowCircle2"
            );

        const label2 =
            document.getElementById(
                "flowLabel2"
            );

        if (circle2) {

            circle2.classList.add(
                step === 2
                    ? "active"
                    : "complete"
            );

        }

        if (label2) {

            label2.classList.add(
                "active"
            );

        }

        if (line1) {

            line1.classList.add(
                "complete"
            );

        }
    }


    if (step >= 3) {

        const circle3 =
            document.getElementById(
                "flowCircle3"
            );

        const label3 =
            document.getElementById(
                "flowLabel3"
            );

        if (circle3) {

            circle3.classList.add(
                "complete"
            );

        }

        if (label3) {

            label3.classList.add(
                "active"
            );

        }

        if (line2) {

            line2.classList.add(
                "complete"
            );

        }
    }
}


// ---------------------------------------------------------
// FORM DATA
// ---------------------------------------------------------

function getFormData() {

    const emailElement =
        document.getElementById("email");

    const firstNameElement =
        document.getElementById("firstName");

    const lastNameElement =
        document.getElementById("lastName");

    const passwordElement =
        document.getElementById("password");


    return {

        email:
            emailElement
                ? emailElement.value.trim()
                : "",

        first_name:
            firstNameElement
                ? firstNameElement.value.trim()
                : "",

        last_name:
            lastNameElement
                ? lastNameElement.value.trim()
                : "",

        password:
            passwordElement
                ? passwordElement.value
                : ""

    };
}


// ---------------------------------------------------------
// PASSWORD VALIDATION
// ---------------------------------------------------------

function validatePassword(password) {

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


    const confirmPasswordElement =
        document.getElementById(
            "confirmPassword"
        );


    const confirmPassword =
        confirmPasswordElement
            ? confirmPasswordElement.value
            : "";


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


    if (button) {

        button.disabled = true;

        button.textContent =
            "Creating Account...";

    }


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


        const emailDisplay =
            document.getElementById(
                "signupEmailDisplay"
            );


        if (emailDisplay) {

            emailDisplay.textContent =
                data.email;

        }


        const statusDisplay =
            document.getElementById(
                "onboardingStatusDisplay"
            );


        if (statusDisplay) {

            statusDisplay.textContent =
                responseData.status ||
                "OTP_REQUIRED";

        }


        setSignupStep(2);


        showStatus(
            "Enter the verification code sent to your email.",
            "success"
        );


        const otp =
            document.getElementById("otp");


        if (otp) {
            otp.focus();
        }

    } catch (error) {

        showStatus(
            "Could not connect to the Main Server.",
            "error"
        );


        showDeveloperError(error);

    } finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "Create Account";

        }
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


    const otpElement =
        document.getElementById("otp");


    const otp =
        otpElement
            ? otpElement.value.trim()
            : "";


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


    if (button) {

        button.disabled = true;

        button.textContent =
            "Verifying...";

    }


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


        const resultStatus =
            document.getElementById(
                "resultStatus"
            );


        if (resultStatus) {

            resultStatus.textContent =
                responseData.status ||
                "COMPLETED";

        }


        const resultMerchantId =
            document.getElementById(
                "resultMerchantId"
            );


        if (resultMerchantId) {

            resultMerchantId.textContent =
                merchantId ||
                "Not returned";

        }


        setSignupStep(3);


        showStatus(
            "Your merchant account was created successfully.",
            "success"
        );

    } catch (error) {

        showStatus(
            "Could not connect to the Main Server.",
            "error"
        );


        showDeveloperError(error);

    } finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "Verify Email";

        }
    }
}


// ---------------------------------------------------------
// LOGIN
// ---------------------------------------------------------

async function login() {

    const emailElement =
        document.getElementById(
            "loginEmail"
        );


    const passwordElement =
        document.getElementById(
            "loginPassword"
        );


    const email =
        emailElement
            ? emailElement.value.trim()
            : "";


    const password =
        passwordElement
            ? passwordElement.value
            : "";


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


    if (button) {

        button.disabled = true;

        button.textContent =
            "Signing In...";

    }


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


        const dashboardEmail =
            document.getElementById(
                "dashboardEmail"
            );


        if (dashboardEmail) {

            dashboardEmail.textContent =
                responseData.email ||
                email;

        }


        const dashboardMerchantId =
            document.getElementById(
                "dashboardMerchantId"
            );


        if (dashboardMerchantId) {

            dashboardMerchantId.textContent =
                merchantId ||
                "—";

        }


        hideAllScreens();


        const dashboard =
            document.getElementById(
                "dashboard"
            );


        if (dashboard) {

            dashboard.classList.add(
                "active"
            );

        }


        clearStatus();

    } catch (error) {

        showStatus(
            "Could not connect to the Main Server.",
            "error"
        );


        showDeveloperError(error);

    } finally {

        if (button) {

            button.disabled = false;

            button.textContent =
                "Log In";

        }
    }
}


// ---------------------------------------------------------
// LOGOUT
// ---------------------------------------------------------

function logout() {

    authToken = null;

    merchantId = null;


    sessionStorage.removeItem(
        "authToken"
    );


    sessionStorage.removeItem(
        "merchantId"
    );


    sessionStorage.removeItem(
        "merchantEmail"
    );


    const loginEmail =
        document.getElementById(
            "loginEmail"
        );


    const loginPassword =
        document.getElementById(
            "loginPassword"
        );


    if (loginEmail) {

        loginEmail.value = "";

    }


    if (loginPassword) {

        loginPassword.value = "";

    }


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


    const dashboardEmail =
        document.getElementById(
            "dashboardEmail"
        );


    const dashboardMerchantId =
        document.getElementById(
            "dashboardMerchantId"
        );


    if (dashboardEmail) {

        dashboardEmail.textContent =
            storedEmail ||
            "—";

    }


    if (dashboardMerchantId) {

        dashboardMerchantId.textContent =
            storedMerchantId;

    }


    hideAllScreens();


    const dashboard =
        document.getElementById(
            "dashboard"
        );


    if (dashboard) {

        dashboard.classList.add(
            "active"
        );

    }
}


// ---------------------------------------------------------
// RESET SIGNUP
// ---------------------------------------------------------

function resetSignupState() {

    onboardingId = null;

    merchantId = null;


    const email =
        document.getElementById("email");

    const firstName =
        document.getElementById("firstName");

    const lastName =
        document.getElementById("lastName");

    const password =
        document.getElementById("password");

    const confirmPassword =
        document.getElementById(
            "confirmPassword"
        );

    const otp =
        document.getElementById("otp");

    const signupEmailDisplay =
        document.getElementById(
            "signupEmailDisplay"
        );

    const onboardingStatusDisplay =
        document.getElementById(
            "onboardingStatusDisplay"
        );

    const resultStatus =
        document.getElementById(
            "resultStatus"
        );

    const resultMerchantId =
        document.getElementById(
            "resultMerchantId"
        );


    if (email) {

        email.value = "";

    }


    if (firstName) {

        firstName.value = "John";

    }


    if (lastName) {

        lastName.value = "Smith";

    }


    if (password) {

        password.value = "";

    }


    if (confirmPassword) {

        confirmPassword.value = "";

    }


    if (otp) {

        otp.value = "";

    }


    if (signupEmailDisplay) {

        signupEmailDisplay.textContent =
            "—";

    }


    if (onboardingStatusDisplay) {

        onboardingStatusDisplay.textContent =
            "OTP_REQUIRED";

    }


    if (resultStatus) {

        resultStatus.textContent =
            "—";

    }


    if (resultMerchantId) {

        resultMerchantId.textContent =
            "—";

    }


    setSignupStep(1);
}


// ---------------------------------------------------------
// DOM INITIALIZATION
// ---------------------------------------------------------

function initializePage() {

    /*
     * Always begin with the Developer modal closed.
     *
     * The Developer BUTTON remains visible at all times.
     * Only the modal itself is forced closed here.
     */
    const developerModal =
        document.getElementById(
            "developerModal"
        );

    if (developerModal) {

        developerModal.classList.remove(
            "visible"
        );

        developerModal.style.display =
            "none";

    }


    const otp =
        document.getElementById("otp");


    if (otp) {

        otp.addEventListener(
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


        otp.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    verifyOnboarding();

                }

            }
        );

    }


    const loginPassword =
        document.getElementById(
            "loginPassword"
        );


    if (loginPassword) {

        loginPassword.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    login();

                }

            }
        );

    }


    restoreSession();
}


// ---------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializePage
    );

} else {

    initializePage();

}