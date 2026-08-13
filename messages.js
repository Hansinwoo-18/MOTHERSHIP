const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const onlineCount = document.getElementById("onlineCount");

let username = prompt("Enter your MOTHERSHIP username:");

if (!username || username.trim() === "") {
    username = "Operator";
}

username = username.trim();

socket.emit("set username", username);


/* =========================================
   CURRENT AI OPERATOR
========================================= */

let selectedOperator = "NOVA";

const operatorButtons =
    document.querySelectorAll(".operator");

const chatHeader =
    document.querySelector(".chat-header strong");


/* =========================================
   SELECT OPERATOR
========================================= */

function selectOperator(operator) {

    selectedOperator = operator;

    operatorButtons.forEach(button => {

        button.classList.remove(
            "operator-selected"
        );

    });

    operatorButtons.forEach(button => {

        if (button.dataset.operator === operator) {

            button.classList.add(
                "operator-selected"
            );

        }

    });

    if (chatHeader) {

        chatHeader.textContent =
            selectedOperator;

    }

    if (input) {

        input.placeholder =
            "Message " +
            selectedOperator +
            "...";

    }

}


/* =========================================
   OPERATOR BUTTONS
========================================= */

operatorButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            selectOperator(
                this.dataset.operator
            );

        }
    );

});


/* =========================================
   SEND MESSAGE
========================================= */

function sendMessage() {

    const message =
        input.value.trim();

    if (message === "") {
        return;
    }

    socket.emit(
        "chat message",
        {
            username: username,
            message: message,
            operator: selectedOperator
        }
    );

    input.value = "";

    input.focus();

}


/* =========================================
   SEND BUTTON
========================================= */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );

}


/* =========================================
   ENTER KEY
========================================= */

if (input) {

    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                sendMessage();

            }

        }
    );

}


/* =========================================
   RECEIVE MESSAGE
========================================= */

socket.on(
    "chat message",
    function (data) {

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "chat-message";

        messageElement.innerHTML = `
            <strong>
                ${data.username}
            </strong>

            <div>
                ${data.message}
            </div>
        `;

        messages.appendChild(
            messageElement
        );

        messages.scrollTop =
            messages.scrollHeight;

    }
);


/* =========================================
   ONLINE COUNT
========================================= */

socket.on(
    "online users",
    function (users) {

        if (onlineCount) {

            onlineCount.textContent =
                users.length;

        }

    }
);


/* =========================================
   START WITH NOVA
========================================= */

selectOperator("NOVA");