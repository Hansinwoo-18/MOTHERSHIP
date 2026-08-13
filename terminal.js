const terminal = document.getElementById("terminal");
const commandInput = document.getElementById("command");

function printMessage(message) {

    const line = document.createElement("div");

    line.innerHTML = message;

    terminal.appendChild(line);

    terminal.scrollTop = terminal.scrollHeight;
}


function runCommand(command) {

    command = command.trim().toLowerCase();

    if (command === "") {
        return;
    }

    printMessage("&gt; " + command);


    if (command === "help") {

        printMessage("AVAILABLE COMMANDS");
        printMessage("------------------");
        printMessage("help");
        printMessage("status");
        printMessage("mission");
        printMessage("intel");
        printMessage("code");
        printMessage("inventory");
        printMessage("profile");
        printMessage("home");
        printMessage("clear");

    }


    else if (command === "status") {

        printMessage("MOTHERSHIP SYSTEM STATUS");
        printMessage("------------------------");
        printMessage("AI CORE      : ONLINE");
        printMessage("NETWORK      : CONNECTED");
        printMessage("SECURITY     : ACTIVE");
        printMessage("DATABASE     : ONLINE");

    }


    else if (command === "mission") {

        const mission =
            localStorage.getItem("activeMission");

        const status =
            localStorage.getItem("missionStatus");

        if (mission && status === "ACTIVE") {

            printMessage("ACTIVE MISSION");
            printMessage("ID     : " + mission);
            printMessage("NAME   : OPERATION: NIGHTFALL");
            printMessage("STATUS : ACTIVE");

        } else {

            printMessage("NO ACTIVE MISSION");

        }

    }


    else if (command === "intel") {

        printMessage("MOTHERSHIP INTELLIGENCE");
        printMessage("-----------------------");
        printMessage("CLASSIFICATION: CLASSIFIED");

    }


    else if (command === "code") {

        const code =
            localStorage.getItem("mothershipCode") || "GREEN";

        printMessage(
            "CURRENT CODE: " +
            code.toUpperCase()
        );

    }


    else if (command === "inventory") {

        window.location.href = "inventory.html";

    }


    else if (command === "profile") {

        window.location.href = "profile.html";

    }


    else if (command === "home") {

        window.location.href = "home.html";

    }


    else if (command === "clear") {

        terminal.innerHTML = "";

    }


    else {

        printMessage(
            "UNKNOWN COMMAND: " +
            command
        );

        printMessage(
            "Type 'help' for available commands."
        );

    }

}


commandInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        runCommand(commandInput.value);

        commandInput.value = "";

    }

});