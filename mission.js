const socket = io();

const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const onlineCount = document.getElementById("onlineCount");
const onlineUsers = document.getElementById("onlineUsers");


/* =========================================
   USERNAME
========================================= */

let username = prompt("Enter your MOTHERSHIP username:");

if (!username || username.trim() === "") {
    username = "Operator";
}

username = username.trim();

socket.emit("set username", username);


/* =========================================
   SEND MESSAGE
========================================= */

function sendMessage() {

    const message = input.value.trim();

    if (message === "") {
        return;
    }

    socket.emit("chat message", {
        username: username,
        message: message
    });

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
        (event) => {

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
    (data) => {

        if (!messages) {
            return;
        }

        const messageElement =
            document.createElement("div");

        messageElement.className =
            "chat-message";


        const nameElement =
            document.createElement("div");

        nameElement.className =
            "message-name";

        nameElement.textContent =
            data.username;


        const textElement =
            document.createElement("div");

        textElement.className =
            "message-text";

        textElement.textContent =
            data.message;


        messageElement.appendChild(
            nameElement
        );

        messageElement.appendChild(
            textElement
        );


        messages.appendChild(
            messageElement
        );


        messages.scrollTop =
            messages.scrollHeight;

    }
);


/* =========================================
   ONLINE USERS
========================================= */

socket.on(
    "online users",
    (users) => {

        if (onlineCount) {

            onlineCount.textContent =
                users.length;

        }


        if (onlineUsers) {

            onlineUsers.innerHTML = "";


            users.forEach(user => {

                const operator =
                    document.createElement("div");

                operator.className =
                    "operator";


                const dot =
                    document.createElement("span");

                dot.className =
                    "online-dot";


                operator.appendChild(dot);

                operator.appendChild(
                    document.createTextNode(
                        " " + user
                    )
                );


                onlineUsers.appendChild(
                    operator
                );

            });

        }

    }
);