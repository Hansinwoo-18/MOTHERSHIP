const terminal = document.getElementById("terminal");
const progress = document.getElementById("progress");

const messages = [
    "Starting AI Core...",
    "Loading Neural Network...",
    "Power Systems Online...",
    "Connecting Satellites...",
    "Security Matrix Active...",
    "Scanning User...",
    "ACCESS GRANTED"
];

let index = 0;

function nextMessage() {

    if (index < messages.length) {

        if (terminal) {
            terminal.innerHTML +=
                messages[index] + "<br>";
        }

        if (progress) {
            progress.style.width =
                ((index + 1) / messages.length) * 100 + "%";
        }

        index++;

        setTimeout(nextMessage, 900);

    } else {

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1000);

    }
}

nextMessage();