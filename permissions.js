/* =========================================
   MOTHERSHIP — OPERATOR PERMISSIONS
   FICTIONAL GAME SYSTEM
========================================= */

const MOTHERSHIP_PERMISSIONS = {

    green: {
        name: "CODE GREEN",
        level: 5,

        pages: [
            "home.html",
            "inventory.html",
            "intel.html",
            "mission.html",
            "profile.html",
            "terminal.html",
            "codeboard.html"
        ]
    },

    blue: {
        name: "CODE BLUE",
        level: 4,

        pages: [
            "home.html",
            "inventory.html",
            "intel.html",
            "mission.html",
            "profile.html",
            "terminal.html"
        ]
    },

    red: {
        name: "CODE RED",
        level: 3,

        pages: [
            "home.html",
            "inventory.html",
            "profile.html"
        ]
    },

    purple: {
        name: "CODE PURPLE",
        level: 2,

        pages: [
            "home.html",
            "intel.html",
            "terminal.html",
            "profile.html"
        ]
    },

    yellow: {
        name: "CODE YELLOW",
        level: 1,

        pages: [
            "home.html",
            "mission.html",
            "profile.html"
        ]
    }

};


/* =========================================
   GET CURRENT OPERATOR
========================================= */

function getCurrentOperator() {

    const saved =
        localStorage.getItem("mothershipOperator");

    if (!saved) {
        return null;
    }

    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "MOTHERSHIP: Invalid operator data."
        );

        return null;
    }
}


/* =========================================
   GET CURRENT CODE
========================================= */

function getCurrentCode() {

    const operator =
        getCurrentOperator();

    if (!operator) {
        return null;
    }

    return operator.code;
}


/* =========================================
   CHECK PAGE ACCESS
========================================= */

function hasPageAccess(pageName) {

    const code =
        getCurrentCode();

    if (!code) {
        return false;
    }

    const permission =
        MOTHERSHIP_PERMISSIONS[code];

    if (!permission) {
        return false;
    }

    return permission.pages.includes(pageName);
}


/* =========================================
   PROTECT CURRENT PAGE
========================================= */

function protectPage(pageName) {

    const operator =
        getCurrentOperator();

    if (!operator) {

        window.location.href =
            "login.html";

        return false;
    }

    if (!hasPageAccess(pageName)) {

        console.warn(
            "MOTHERSHIP: Access denied."
        );

        window.location.href =
            "home.html";

        return false;
    }

    return true;
}


/* =========================================
   DISPLAY OPERATOR DATA
========================================= */

function updateOperatorUI() {

    const operator =
        getCurrentOperator();

    if (!operator) {
        return;
    }

    const nameElements =
        document.querySelectorAll(
            "[data-operator-name]"
        );

    nameElements.forEach(element => {

        element.textContent =
            operator.username;

    });


    const codeElements =
        document.querySelectorAll(
            "[data-operator-code]"
        );

    codeElements.forEach(element => {

        element.textContent =
            operator.code.toUpperCase();

    });

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    updateOperatorUI
);