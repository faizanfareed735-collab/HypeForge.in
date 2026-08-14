// =====================================================
// HYPEFORGE - AUTHENTICATION FRONTEND
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------------------
    // LOGIN FORM
    // -------------------------------------------------

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const email =
                document.getElementById("email")?.value.trim();

            const password =
                document.getElementById("password")?.value;

            if (!email || !password) {
                showAuthMessage(
                    "Please enter your email and password.",
                    "error"
                );
                return;
            }

            /*
             * FRONTEND DEMO ONLY
             *
             * Real authentication must be handled
             * by a secure backend.
             */

            localStorage.setItem(
                "hypeforge_demo_user",
                email
            );

            showAuthMessage(
                "Login successful. Redirecting...",
                "success"
            );

            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
    }


    // -------------------------------------------------
    // REGISTER FORM
    // -------------------------------------------------

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const password =
                document.getElementById("password")?.value;

            const confirmPassword =
                document.getElementById("confirmPassword")?.value;

            const accountType =
                document.getElementById("accountType")?.value;


            if (!name || !email || !password) {

                showAuthMessage(
                    "Please complete all required fields.",
                    "error"
                );

                return;
            }


            if (password.length < 8) {

                showAuthMessage(
                    "Password must contain at least 8 characters.",
                    "error"
                );

                return;
            }


            if (confirmPassword &&
                password !== confirmPassword) {

                showAuthMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            if (!accountType) {

                showAuthMessage(
                    "Please select an account type.",
                    "error"
                );

                return;
            }


            /*
             * FRONTEND DEMO ONLY
             *
             * Do not store passwords in localStorage.
             * A real production account system needs
             * server-side authentication.
             */

            localStorage.setItem(
                "hypeforge_demo_user",
                email
            );

            localStorage.setItem(
                "hypeforge_demo_account_type",
                accountType
            );


            showAuthMessage(
                "Account created successfully. Redirecting...",
                "success"
            );


            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);

        });

    }


    // -------------------------------------------------
    // PASSWORD VISIBILITY
    // -------------------------------------------------

    document
        .querySelectorAll("[data-password-toggle]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const targetId =
                    button.getAttribute(
                        "data-password-toggle"
                    );

                const input =
                    document.getElementById(targetId);

                if (!input) return;

                if (input.type === "password") {

                    input.type = "text";
                    button.textContent = "Hide";

                } else {

                    input.type = "password";
                    button.textContent = "Show";

                }

            });

        });

});


// =====================================================
// AUTH MESSAGE
// =====================================================

function showAuthMessage(message, type = "info") {

    let messageBox =
        document.getElementById("authMessage");

    if (!messageBox) {

        messageBox =
            document.createElement("div");

        messageBox.id = "authMessage";

        const form =
            document.querySelector(
                ".auth-form"
            );

        if (form) {
            form.prepend(messageBox);
        } else {
            document.body.prepend(messageBox);
        }
    }


    messageBox.className =
        `auth-message ${type}`;

    messageBox.textContent =
        message;


    setTimeout(() => {

        messageBox.classList.add("visible");

    }, 10);


    setTimeout(() => {

        messageBox.classList.remove("visible");

    }, 4000);
}
