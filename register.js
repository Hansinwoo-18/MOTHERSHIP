/* =========================================
   MOTHERSHIP — REGISTRATION SYSTEM
   FICTIONAL GAME INTERFACE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("registerForm");

    if (!form) return;

    const usernameInput =
        document.getElementById("registerUsername");

    const passwordInput =
        document.getElementById("registerPassword");

    const codeButtons =
        document.querySelectorAll(".code-option");

    const selectedCodeInput =
        document.getElementById("selectedCode");

    const message =
        document.getElementById("registerMessage");

    let selectedCode = null;


    /* =====================================
       CODE SELECTION
    ===================================== */

    codeButtons.forEach(button => {

        button.addEventListener("click", () => {

            selectedCode = button.dataset.code;

            selectedCodeInput.value = selectedCode;

            codeButtons.forEach(btn => {
                btn.classList.remove("selected");
            });

            button.classList.add("selected");

            showMessage(
                "CODE " +
                selectedCode.toUpperCase() +
                " SELECTED"
            );

        });

    });


    /* =====================================
       REGISTER
    ===================================== */

    form.addEventListener("submit", event => {

        event.preventDefault();

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;


        /* =================================
           VALIDATION
        ================================= */

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


        /* =================================
           GREEN PROTECTION
        ================================= */

        if (selectedCode === "green") {

            showMessage(
                "CODE GREEN IS NOT AVAILABLE FOR REGISTRATION."
            );

            return;
        }


        /* =================================
           GET ALL OPERATORS
        ================================= */

        let operators = [];

        const savedOperators =
            localStorage.getItem(
                "mothershipOperators"
            );

        if (savedOperators) {

            try {

                operators =
                    JSON.parse(savedOperators);

                if (!Array.isArray(operators)) {
                    operators = [];
                }

            } catch (error) {

                console.error(
                    "Operator database error:",
                    error
                );

                operators = [];

            }

        }


        /* =================================
           CHECK USERNAME
        ================================= */

        const usernameExists =
            operators.some(operator =>
                operator.username.toLowerCase() ===
                username.toLowerCase()
            );


        if (usernameExists) {

            showMessage(
                "THIS OPERATOR NAME ALREADY EXISTS."
            );

            return;
        }


        /* =================================
           CREATE NEW OPERATOR
        ================================= */

        const operator = {

            id:
                crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now().toString(),

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


        /* =================================
           ADD TO OPERATOR DATABASE
        ================================= */

        operators.push(operator);


        localStorage.setItem(
            "mothershipOperators",
            JSON.stringify(operators)
        );


        /* =================================
           SAVE CURRENT OPERATOR
        ================================= */

        localStorage.setItem(
            "mothershipOperator",
            JSON.stringify(operator)
        );


        /* =================================
           LOGIN STATE
        ================================= */

        localStorage.setItem(
            "mothershipLoggedIn",
            "true"
        );


        /* =================================
           SUCCESS
        ================================= */

        showMessage(
            "OPERATOR PROFILE CREATED. ACCESS CODE LOCKED."
        );


        /* =================================
           GO TO HOME
        ================================= */

        setTimeout(() => {

            window.location.href =
                "home.html";

        }, 1200);

    });


    /* =====================================
       MESSAGE
    ===================================== */

    function showMessage(text) {

        if (message) {

            message.textContent = text;

        } else {

            alert(text);

        }

    }

});