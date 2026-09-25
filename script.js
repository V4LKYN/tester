const API_BASE_URL =
    "https://server-testing-production-7a62.up.railway.app";


let onboardingId = null;

let merchantId = null;


// ---------------------------------------------------------
// STATUS
// ---------------------------------------------------------

function showStatus(
    message,
    type
) {

    const element =
        document.getElementById(
            "status"
        );


    element.textContent =
        message;


    element.className =
        "status " + type;

}


function clearStatus() {

    const element =
        document.getElementById(
            "status"
        );


    element.textContent =
        "";


    element.className =
        "status";

}


// ---------------------------------------------------------
// DEVELOPER RESPONSE
// ---------------------------------------------------------

function showDeveloperResponse(
    response,
    data
) {

    const responseBox =
        document.getElementById(
            "developerResponse"
        );


    const meta =
        document.getElementById(
            "developerMeta"
        );


    const output =
        document.getElementById(
            "developerResponseText"
        );


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


    responseBox.classList.add(
        "visible"
    );


    document
        .getElementById(
            "developerToggle"
        )
        .textContent =
        "Hide";

}


function showDeveloperError(
    error
) {

    showDeveloperResponse(
        {
            status: 0,
            statusText: "Connection Error"
        },
        {
            error:
                error.message
        }
    );

}


function toggleDeveloperResponse() {

    const responseBox =
        document.getElementById(
            "developerResponse"
        );


    const button =
        document.getElementById(
            "developerToggle"
        );


    if (
        responseBox.classList.contains(
            "visible"
        )
    ) {

        responseBox.classList.remove(
            "visible"
        );


        button.textContent =
            "Show";

    } else {

        responseBox.classList.add(
            "visible"
        );


        button.textContent =
            "Hide";

    }

}


// ---------------------------------------------------------
// FLOW
// ---------------------------------------------------------

function setFlowStep(
    step
) {

    for (
        let i = 1;
        i <= 3;
        i++
    ) {

        document
            .getElementById(
                "flowCircle" + i
            )
            .classList.remove(
                "active",
                "complete"
            );


        document
            .getElementById(
                "flowLabel" + i
            )
            .classList.remove(
                "active"
            );

    }


    document
        .getElementById(
            "flowLine1"
        )
        .classList.remove(
            "complete"
        );


    document
        .getElementById(
            "flowLine2"
        )
        .classList.remove(
            "complete"
        );


    if (step === 1) {

        document
            .getElementById(
                "flowCircle1"
            )
            .classList.add(
                "active"
            );


        document
            .getElementById(
                "flowLabel1"
            )
            .classList.add(
                "active"
            );

    }


    if (step === 2) {

        document
            .getElementById(
                "flowCircle1"
            )
            .classList.add(
                "complete"
            );


        document
            .getElementById(
                "flowCircle2"
            )
            .classList.add(
                "active"
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


    if (step === 3) {

        document
            .getElementById(
                "flowCircle1"
            )
            .classList.add(
                "complete"
            );


        document
            .getElementById(
                "flowCircle2"
            )
            .classList.add(
                "complete"
            );


        document
            .getElementById(
                "flowCircle3"
            )
            .classList.add(
                "complete"
            );


        document
            .getElementById(
                "flowLine1"
            )
            .classList.add(
                "complete"
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


function setStep(
    step
) {

    document
        .querySelectorAll(".step")
        .forEach(
            function(element) {

                element.classList.remove(
                    "active"
                );

            }
        );


    document
        .getElementById(
            "step" + step
        )
        .classList.add(
            "active"
        );


    setFlowStep(step);

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


    // -----------------------------------------------------
    // EMAIL
    // -----------------------------------------------------

    if (!data.email) {

        showStatus(
            "Email is required.",
            "error"
        );

        return;
    }


    // -----------------------------------------------------
    // FIRST NAME
    // -----------------------------------------------------

    if (!data.first_name) {

        showStatus(
            "First name is required.",
            "error"
        );

        return;
    }


    // -----------------------------------------------------
    // LAST NAME
    // -----------------------------------------------------

    if (!data.last_name) {

        showStatus(
            "Last name is required.",
            "error"
        );

        return;
    }


    // -----------------------------------------------------
    // PASSWORD
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // CONFIRM PASSWORD
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // BUTTON
    // -----------------------------------------------------

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


    // -----------------------------------------------------
    // REQUEST
    // -----------------------------------------------------

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


        // -------------------------------------------------
        // SERVER ERROR
        // -------------------------------------------------

        if (!response.ok) {

            showStatus(
                responseData.detail ||
                "The server rejected the account creation request.",
                "error"
            );

            return;
        }


        // -------------------------------------------------
        // ONBOARDING ID
        // -------------------------------------------------

        onboardingId =
            responseData.onboarding_id;


        if (!onboardingId) {

            showStatus(
                "The server did not return an onboarding ID.",
                "error"
            );

            return;
        }


        // -------------------------------------------------
        // DISPLAY SESSION
        // -------------------------------------------------

        document
            .getElementById(
                "onboardingIdDisplay"
            )
            .textContent =
            onboardingId;


        document
            .getElementById(
                "onboardingStatusDisplay"
            )
            .textContent =
            responseData.status ||
            "OTP_REQUIRED";


        // -------------------------------------------------
        // MOVE TO OTP
        // -------------------------------------------------

        setStep(2);


        showStatus(
            "Account setup started. Enter the OTP sent to your email.",
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
            "OTP must contain exactly 6 digits.",
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
        "Verifying OTP and creating merchant account...",
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


        // -------------------------------------------------
        // SERVER ERROR
        // -------------------------------------------------

        if (!response.ok) {

            showStatus(
                responseData.detail ||
                "OTP verification failed.",
                "error"
            );

            return;
        }


        // -------------------------------------------------
        // MERCHANT ID
        // -------------------------------------------------

        merchantId =
            responseData.merchant_id;


        // -------------------------------------------------
        // DISPLAY RESULT
        // -------------------------------------------------

        document
            .getElementById(
                "resultStatus"
            )
            .textContent =
            responseData.status ||
            "COMPLETED";


        document
            .getElementById(
                "resultOnboardingId"
            )
            .textContent =
            onboardingId;


        document
            .getElementById(
                "resultMerchantId"
            )
            .textContent =
            merchantId ||
            "Not returned";


        // -------------------------------------------------
        // COMPLETE
        // -------------------------------------------------

        setStep(3);


        showStatus(
            "Merchant account created successfully.",
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
// SERVER HEALTH
// ---------------------------------------------------------

async function testServer() {

    const button =
        document.getElementById(
            "healthButton"
        );


    const status =
        document.getElementById(
            "serverStatus"
        );


    button.disabled =
        true;


    button.textContent =
        "Testing...";


    status.className =
        "server-status-value";


    status.textContent =
        "Connecting...";


    try {

        const response =
            await fetch(
                API_BASE_URL +
                "/api/health",
                {
                    method: "GET"
                }
            );


        const data =
            await response.json();


        showDeveloperResponse(
            response,
            data
        );


        if (response.ok) {

            status.className =
                "server-status-value connected";


            status.textContent =
                "✓ Connected";

        } else {

            status.className =
                "server-status-value error";


            status.textContent =
                "✕ API Error";

        }

    } catch (error) {

        status.className =
            "server-status-value error";


        status.textContent =
            "✕ Connection Failed";


        showDeveloperError(
            error
        );

    } finally {

        button.disabled =
            false;


        button.textContent =
            "Test Server";

    }

}


// ---------------------------------------------------------
// RESTART TEST
// ---------------------------------------------------------

function restartTest() {

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
            "onboardingIdDisplay"
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
            "resultOnboardingId"
        )
        .textContent =
        "—";


    document
        .getElementById(
            "resultMerchantId"
        )
        .textContent =
        "—";


    setStep(1);


    clearStatus();

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