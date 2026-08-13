/* =================================
   MOTHERSHIP INVENTORY SYSTEM
================================= */

const cardsContainer = document.getElementById("cards");
const search = document.querySelector(".search");

const inventory =
    typeof guns !== "undefined" ? guns : [];


/* =================================
   DISPLAY INVENTORY
================================= */

function displayCards(items) {

    if (!cardsContainer) return;

    cardsContainer.innerHTML = "";

    items.forEach(item => {

        cardsContainer.innerHTML += `

            <div class="card">

                <div class="image-box">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>

                <h2>${item.name}</h2>

                <p>
                    <strong>Category:</strong>
                    ${item.category}
                </p>

                <p>
                    <strong>Manufacturer:</strong>
                    ${item.manufacturer}
                </p>

                <p>
                    <strong>Country:</strong>
                    ${item.country}
                </p>

                <p>
                    <strong>Caliber:</strong>
                    ${item.caliber}
                </p>

                <button onclick="viewDetails(${item.id})">
                    View Details
                </button>

            </div>

        `;

    });

}

displayCards(inventory);


/* =================================
   SEARCH
================================= */

if (search) {

    search.addEventListener("keyup", () => {

        const value =
            search.value.toLowerCase();

        const filtered =
            inventory.filter(item =>

                item.name
                    .toLowerCase()
                    .includes(value)

                ||

                item.category
                    .toLowerCase()
                    .includes(value)

            );

        displayCards(filtered);

    });

}


/* =================================
   CATEGORY FILTER
================================= */

const categoryButtons =
    document.querySelectorAll(
        ".categories button"
    );

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        const category =
            button.dataset.category;

        if (category === "All") {

            displayCards(inventory);

        } else {

            const filtered =
                inventory.filter(
                    item =>
                        item.category === category
                );

            displayCards(filtered);

        }

    });

});


/* =================================
   VIEW DETAILS
================================= */

function viewDetails(id) {

    localStorage.setItem(
        "selectedItem",
        id
    );

    window.location.href =
        "details.html";
}


/* =================================
   DASHBOARD NUMBERS
================================= */

function animateNumber(id, end) {

    let start = 0;

    const element =
        document.getElementById(id);

    if (!element) return;

    const interval =
        setInterval(() => {

            start++;

            element.innerText =
                start;

            if (start >= end) {

                clearInterval(interval);

            }

        }, 25);

}


/*
   Change these numbers later
   when your database grows.
*/

animateNumber("items", 120);

animateNumber("categories", 8);


/* =================================
   LIVE CLOCK
================================= */

const time =
    document.getElementById("time");

const date =
    document.getElementById("date");

if (time && date) {

    function updateClock() {

        const now = new Date();

        const timeString =
            now.toLocaleTimeString();

        const dateString =
            now.toLocaleDateString(
                undefined,
                {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        time.textContent =
            timeString;

        date.textContent =
            dateString;

    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );

}


/* =================================
   MOTHERSHIP CODE SYSTEM
================================= */

const codeButtons =
    document.querySelectorAll(
        ".code-card"
    );

const currentCode =
    document.getElementById(
        "current-code"
    );

const navCode =
    document.getElementById(
        "nav-code"
    );


/*
   Get saved code.
   GREEN is the default.
*/

let mothershipCode =
    localStorage.getItem(
        "mothershipCode"
    );

if (!mothershipCode) {

    mothershipCode = "green";

    localStorage.setItem(
        "mothershipCode",
        mothershipCode
    );

}


/* =================================
   SHOW CURRENT CODE
================================= */

if (currentCode) {

    currentCode.textContent =
        mothershipCode.toUpperCase();

}

if (navCode) {

    navCode.textContent =
        mothershipCode.toUpperCase();

}


/* =================================
   CODE BUTTONS
================================= */

codeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const selectedCode =
                button.dataset.code;

            mothershipCode =
                selectedCode.toLowerCase();


            /*
               Save code
            */

            localStorage.setItem(
                "mothershipCode",
                mothershipCode
            );


            /*
               Update dashboard
            */

            if (currentCode) {

                currentCode.textContent =
                    mothershipCode.toUpperCase();

            }


            /*
               Update navbar
            */

            if (navCode) {

                navCode.textContent =
                    mothershipCode.toUpperCase();

            }

        }
    );

});
/* =================================
   DASHBOARD ACTIVE MISSION
================================= */

const homeMissionStatus =
    document.getElementById("home-mission-status");

const homeMissionId =
    document.getElementById("home-mission-id");

const homeMissionName =
    document.getElementById("home-mission-name");


const activeMission =
    localStorage.getItem("activeMission");

const missionStatus =
    localStorage.getItem("missionStatus");


if (
    homeMissionStatus &&
    homeMissionId &&
    homeMissionName
) {

    if (
        activeMission &&
        missionStatus === "ACTIVE"
    ) {

        homeMissionStatus.textContent =
            "ACTIVE";

        homeMissionId.textContent =
            activeMission;

        homeMissionName.textContent =
            "OPERATION: NIGHTFALL";

    } else {

        homeMissionStatus.textContent =
            "OFFLINE";

        homeMissionId.textContent =
            "NO ACTIVE MISSION";

        homeMissionName.textContent =
            "Awaiting mission assignment...";

    }

}
/* =================================
   INTEL / MISSION CONNECTION
================================= */

const intelMission =
    document.getElementById("intel-mission");

const intelMissionStatus =
    document.getElementById("intel-mission-status");

const intelObjective =
    document.getElementById("intel-objective");


const storedMission =
    localStorage.getItem("activeMission");

const storedMissionStatus =
    localStorage.getItem("missionStatus");


if (
    intelMission &&
    intelMissionStatus &&
    intelObjective
) {

    if (
        storedMission &&
        storedMissionStatus === "ACTIVE"
    ) {

        intelMission.textContent =
            storedMission;

        intelMissionStatus.textContent =
            "ACTIVE";

        intelObjective.textContent =
            "Recover the encrypted data fragment.";

    } else {

        intelMission.textContent =
            "NO ACTIVE MISSION";

        intelMissionStatus.textContent =
            "STANDBY";

        intelObjective.textContent =
            "Awaiting mission assignment.";

    }

}
/* =================================
   MISSION DATABASE
================================= */

const missionList =
    document.getElementById("mission-list");

if (missionList && typeof missions !== "undefined") {

    missionList.innerHTML = "";

    missions.forEach(mission => {

        const card =
            document.createElement("div");

        card.className = "mission-database-card";

        card.innerHTML = `

            <div class="mission-db-header">

                <span>${mission.id}</span>

                <span>
                    ${mission.status}
                </span>

            </div>

            <h3>
                ${mission.name}
            </h3>

            <p>
                ${mission.briefing}
            </p>

            <div class="mission-db-info">

                <span>
                    PRIORITY:
                    <strong>
                        ${mission.priority}
                    </strong>
                </span>

                <span>
                    CLEARANCE:
                    <strong>
                        ${mission.clearance}
                    </strong>
                </span>

            </div>

            <button
                class="mission-select-button"
                onclick="selectMission('${mission.id}')">

                VIEW MISSION

            </button>

        `;

        missionList.appendChild(card);

    });

}


/* SELECT MISSION */

function selectMission(id) {

    const mission =
        missions.find(item => item.id === id);

    if (!mission) return;

    localStorage.setItem(
        "selectedMission",
        mission.id
    );

    alert(
        "MISSION SELECTED: " +
        mission.id
    );

}
/* =========================================
   MOTHERSHIP LOGIN SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const usernameInput =
        document.getElementById("loginUsername");

    const passwordInput =
        document.getElementById("loginPassword");

    const loginButton =
        document.getElementById("loginButton");

    const message =
        document.getElementById("loginMessage");


    if (!loginButton) {
        return;
    }


    /* =====================================
       CODE GREEN OWNER
       CHANGE THESE TWO VALUES
    ===================================== */

    const GREEN_USERNAME = "Murthelp";
    const GREEN_PASSWORD = "codeuser";


    /* =====================================
       LOGIN
    ===================================== */

    function login() {

        const username =
            usernameInput.value.trim();

        const password =
            passwordInput.value;


        if (!username || !password) {

            showMessage(
                "ENTER USERNAME AND PASSWORD."
            );

            return;
        }


        /* =================================
           CODE GREEN
        ================================= */

        if (
            username === GREEN_USERNAME &&
            password === GREEN_PASSWORD
        ) {

            const greenOperator = {

                username: username,

                code: "green",

                role: "owner",

                permissions: {

                    dashboard: true,
                    inventory: true,
                    intel: true,
                    missions: true,
                    profile: true,
                    terminal: true,
                    codeboard: true,
                    admin: true

                }

            };


            localStorage.setItem(
                "mothershipOperator",
                JSON.stringify(greenOperator)
            );


            localStorage.setItem(
                "mothershipLoggedIn",
                "true"
            );


            localStorage.setItem(
                "mothershipCode",
                "green"
            );


            showMessage(
                "CODE GREEN ACCESS GRANTED."
            );


            setTimeout(() => {

                window.location.href =
                    "home.html";

            }, 700);


            return;
        }


        /* =================================
           NORMAL OPERATOR
        ================================= */

        const savedData =
            localStorage.getItem(
                "mothershipOperator"
            );


        if (!savedData) {

            showMessage(
                "OPERATOR PROFILE NOT FOUND. REGISTER FIRST."
            );

            return;
        }


        let operator;

        try {

            operator =
                JSON.parse(savedData);

        } catch (error) {

            console.error(
                "MOTHERSHIP: Invalid operator data.",
                error
            );

            showMessage(
                "OPERATOR DATA CORRUPTED."
            );

            return;
        }


        /* =================================
           CHECK USERNAME
        ================================= */

        if (
            username !== operator.username
        ) {

            showMessage(
                "INVALID OPERATOR USERNAME."
            );

            return;
        }


        /* =================================
           CHECK PASSWORD
        ================================= */

        if (
            password !== operator.password
        ) {

            showMessage(
                "INVALID OPERATOR PASSWORD."
            );

            return;
        }


        /* =================================
           SUCCESS
        ================================= */

        localStorage.setItem(
            "mothershipLoggedIn",
            "true"
        );


        localStorage.setItem(
            "mothershipCode",
            operator.code
        );


        showMessage(
            "ACCESS GRANTED · CODE " +
            operator.code.toUpperCase()
        );


        setTimeout(() => {

            window.location.href =
                "home.html";

        }, 700);

    }


    /* =====================================
       BUTTON
    ===================================== */

    loginButton.addEventListener(
        "click",
        login
    );


    /* =====================================
       ENTER KEY
    ===================================== */

    if (usernameInput) {

        usernameInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    login();
                }

            }
        );

    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    login();
                }

            }
        );

    }


    /* =====================================
       MESSAGE
    ===================================== */

    function showMessage(text) {

        if (message) {

            message.textContent =
                text;

        } else {

            alert(text);

        }

    }

});