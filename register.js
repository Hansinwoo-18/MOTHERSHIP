/* =========================================
   MOTHERSHIP — REGISTRATION SYSTEM
   FICTIONAL GAME INTERFACE
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const form =
            document.getElementById(
                "registerForm"
            );

        if (!form) {
            return;
        }


        const usernameInput =
            document.getElementById(
                "registerUsername"
            );

        const passwordInput =
            document.getElementById(
                "registerPassword"
            );

        const codeButtons =
            document.querySelectorAll(
                ".code-option"
            );

        const selectedCodeInput =
            document.getElementById(
                "selectedCode"
            );

        const message =
            document.getElementById(
                "registerMessage"
            );


        let selectedCode = null;


        /* =====================================
           CODE SELECTION
        ===================================== */

        codeButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    selectedCode =
                        button.dataset.code;

                    selectedCodeInput.value =
                        selectedCode;


                    codeButtons.forEach(
                        btn => {

                            btn.classList.remove(
                                "selected"
                            );

                        }
                    );


                    button.classList.add(
                        "selected"
                    );


                    if (message) {

                        message.textContent =
                            "CODE " +
                            selectedCode.toUpperCase() +
                            " SELECTED";

                    }

                }
            );

        });


        /* =====================================
           REGISTER
        ===================================== */

        form.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const username =
                    usernameInput.value.trim();

                const password =
                    passwordInput.value;


                /* -----------------------------
                   VALIDATION
                ----------------------------- */

                if (!username || !password) {

                    showMessage(
                        "COMPLETE ALL REQUIRED FIELDS."
                    );

                    return;
                }


                if (!selectedCode) {

                    showMessage(
                        "SELECT AN OPERATOR CODE."
                    );

                    return;
                }


                /*
                   GREEN IS NEVER ACCEPTED
                   FROM REGISTRATION.
                */

                if (
                    selectedCode === "green"
                ) {

                    showMessage(
                        "CODE GREEN IS NOT AVAILABLE FOR REGISTRATION."
                    );

                    return;
                }


                /* -----------------------------
                   CHECK EXISTING ACCOUNT
                ----------------------------- */

                const existing =
                    localStorage.getItem(
                        "mothershipOperator"
                    );


                if (existing) {

                    showMessage(
                        "AN OPERATOR PROFILE ALREADY EXISTS ON THIS TERMINAL."
                    );

                    return;
                }


                /* -----------------------------
                   CREATE OPERATOR
                ----------------------------- */

                const operator = {

                    username: username,

                    /*
                       Stored locally for this
                       fictional game interface.
                    */
                    password: password,

                    code: selectedCode,

                    registered:
                        new Date().toISOString()

                };


                /* -----------------------------
                   SAVE
                ----------------------------- */

                localStorage.setItem(
                    "mothershipOperator",
                    JSON.stringify(operator)
                );


                /* -----------------------------
                   SAVE LOGIN STATE
                ----------------------------- */

                localStorage.setItem(
                    "mothershipLoggedIn",
                    "true"
                );


                showMessage(
                    "OPERATOR PROFILE CREATED. ACCESS CODE LOCKED."
                );


                /* -----------------------------
                   GO TO HOME
                ----------------------------- */

                setTimeout(
                    () => {

                        window.location.href =
                            "home.html";

                    },
                    1200
                );

            }
        );


        function showMessage(text) {

            if (message) {

                message.textContent =
                    text;

            } else {

                alert(text);

            }

        }

    }
);