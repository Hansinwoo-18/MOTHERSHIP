/* =========================================================
   MOTHERSHIP — INVENTORY SYSTEM
   Shared with Code Board + Order System
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards =
        document.getElementById("cards");

    const searchInput =
        document.querySelector(".search");

    const categoryButtons =
        document.querySelectorAll(
            ".categories button"
        );


    /* =====================================================
       SAFETY
    ===================================================== */

    if (!cards) {

        console.error(
            "MOTHERSHIP: #cards not found."
        );

        return;
    }


    if (
        typeof guns === "undefined" ||
        !Array.isArray(guns)
    ) {

        cards.innerHTML = `
            <div class="no-results">
                DATABASE NOT LOADED
            </div>
        `;

        console.error(
            "MOTHERSHIP: guns.js not loaded."
        );

        return;

    }


    let currentCategory = "All";
    let currentSearch = "";


    /* =====================================================
       CURRENT CODE
    ===================================================== */

    function getCurrentCode() {

        return (
            localStorage.getItem(
                "mothershipCode"
            ) || "green"
        ).toLowerCase();

    }


    /* =====================================================
       CODE NAME
    ===================================================== */

    function getCodeName() {

        const code =
            getCurrentCode();


        const names = {

            green: "CODE GREEN",
            red: "CODE RED",
            blue: "CODE BLUE",
            purple: "CODE PURPLE",
            yellow: "CODE YELLOW"

        };


        return (
            names[code] ||
            "UNKNOWN CODE"
        );

    }


    /* =====================================================
       INVENTORY PERMISSION
    ===================================================== */

    function canAccessItem(gun) {

        const code =
            getCurrentCode();


        /*
         * GREEN
         * Full fictional inventory.
         */

        if (code === "green") {

            return true;

        }


        /*
         * RED
         * Full fictional inventory.
         */

        if (code === "red") {

            return true;

        }


        /*
         * BLUE
         * Full fictional inventory.
         */

        if (code === "blue") {

            return true;

        }


        /*
         * PURPLE
         * Pistol-category records only.
         */

        if (code === "purple") {

            return (
                String(
                    gun.category || ""
                ).toLowerCase() === "pistol"
            );

        }


        /*
         * YELLOW
         * No inventory records.
         */

        return false;

    }


    /* =====================================================
       FICTIONAL VALUE
    ===================================================== */

    const itemPrices = {};


    function generatePrice(id) {

        if (itemPrices[id]) {

            return itemPrices[id];

        }


        const currencies = [
            "₩",
            "¥"
        ];


        const currency =
            currencies[
                Math.floor(
                    Math.random() *
                    currencies.length
                )
            ];


        let price;


        if (currency === "₩") {

            price =
                (
                    180 +
                    Math.floor(
                        Math.random() * 771
                    )
                ) * 1000;

        }

        else {

            price =
                (
                    25 +
                    Math.floor(
                        Math.random() * 126
                    )
                ) * 1000;

        }


        itemPrices[id] = {

            currency,
            price

        };


        return itemPrices[id];

    }


    /* =====================================================
       CREATE CARD
    ===================================================== */

    function createCard(gun) {

        const price =
            generatePrice(gun.id);


        const card =
            document.createElement("div");

        card.className =
            "card";


        card.innerHTML = `

            <div class="image-box">

                <img
                    src="${escapeHTML(
                        gun.image || ""
                    )}"
                    alt="${escapeHTML(
                        gun.name
                    )}"
                    loading="lazy"
                >

            </div>


            <div class="card-info">

                <h2>
                    ${escapeHTML(
                        gun.name
                    )}
                </h2>


                <p>
                    ${escapeHTML(
                        gun.category ||
                        "---"
                    )}
                </p>


                <p>
                    ${escapeHTML(
                        gun.manufacturer ||
                        "---"
                    )}
                </p>


                <div class="shop-price">

                    <span>
                        FICTIONAL VALUE
                    </span>

                    <strong>
                        ${price.currency}
                        ${price.price.toLocaleString()}
                    </strong>

                </div>


                <div class="shop-status">

                    <span class="status-dot"></span>

                    AVAILABLE

                </div>


                <div class="card-buttons">

                    <button
                        type="button"
                        class="order-button"
                    >
                        REQUEST
                    </button>


                    <button
                        type="button"
                        class="view-button"
                    >
                        VIEW DETAILS
                    </button>

                </div>

            </div>

        `;


        /* =================================================
           IMAGE
        ================================================= */

        const image =
            card.querySelector("img");


        if (image) {

            image.addEventListener(
                "error",
                () => {

                    image.style.display =
                        "none";


                    image.parentElement.innerHTML += `
                        <span style="
                            color:#555;
                            font-size:11px;
                            letter-spacing:2px;
                        ">
                            IMAGE UNAVAILABLE
                        </span>
                    `;

                }
            );

        }


        /* =================================================
           REQUEST
        ================================================= */

        const requestButton =
            card.querySelector(
                ".order-button"
            );


        if (requestButton) {

            requestButton.addEventListener(
                "click",
                () => {

                    openRequestPage(
                        gun
                    );

                }
            );

        }


        /* =================================================
           DETAILS
        ================================================= */

        const viewButton =
            card.querySelector(
                ".view-button"
            );


        if (viewButton) {

            viewButton.addEventListener(
                "click",
                () => {

                    showDetails(
                        gun
                    );

                }
            );

        }


        return card;

    }


    /* =====================================================
       DISPLAY
    ===================================================== */

    function displayItems() {

        const code =
            getCurrentCode();


        /*
         * YELLOW
         */

        if (code === "yellow") {

            cards.innerHTML = `

                <div class="no-results">

                    <strong>
                        INVENTORY ACCESS RESTRICTED
                    </strong>

                    <br><br>

                    CURRENT CLEARANCE:
                    CODE YELLOW

                    <br><br>

                    INVENTORY ACCESS IS NOT
                    AVAILABLE FOR THIS CODE.

                </div>

            `;

            return;

        }


        cards.innerHTML = "";


        const search =
            currentSearch.toLowerCase();


        const filteredGuns =
            guns.filter(gun => {

                if (!gun) {
                    return false;
                }


                if (
                    !canAccessItem(gun)
                ) {

                    return false;

                }


                const name =
                    String(
                        gun.name || ""
                    ).toLowerCase();


                const category =
                    String(
                        gun.category || ""
                    );


                const categoryMatch =
                    currentCategory === "All" ||
                    category === currentCategory;


                const searchMatch =
                    name.includes(
                        search
                    );


                return (
                    categoryMatch &&
                    searchMatch
                );

            });


        /* =================================================
           EMPTY
        ================================================= */

        if (
            filteredGuns.length === 0
        ) {

            if (code === "purple") {

                cards.innerHTML = `

                    <div class="no-results">

                        <strong>
                            LIMITED INVENTORY ACCESS
                        </strong>

                        <br><br>

                        CURRENT CLEARANCE:
                        CODE PURPLE

                        <br><br>

                        ONLY PISTOL-CATEGORY
                        RECORDS ARE AVAILABLE.

                    </div>

                `;

            }

            else {

                cards.innerHTML = `

                    <div class="no-results">
                        NO ITEMS FOUND
                    </div>

                `;

            }


            return;

        }


        /* =================================================
           RENDER
        ================================================= */

        const fragment =
            document.createDocumentFragment();


        filteredGuns.forEach(gun => {

            fragment.appendChild(
                createCard(gun)
            );

        });


        cards.appendChild(
            fragment
        );

    }


    /* =====================================================
       OPEN ORDER PAGE
    ===================================================== */

    function openRequestPage(gun) {

        /*
         * Permission check.
         */

        if (
            !canAccessItem(gun)
        ) {

            alert(
                "MOTHERSHIP: ACCESS RESTRICTED."
            );

            return;

        }


        const price =
            generatePrice(
                gun.id
            );


        const selectedItem = {

            id:
                gun.id,

            name:
                gun.name,

            category:
                gun.category,

            manufacturer:
                gun.manufacturer ||
                "UNKNOWN",

            country:
                gun.country ||
                "UNKNOWN",

            image:
                gun.image ||
                "",

            currency:
                price.currency,

            price:
                price.price

        };


        /*
         * MAIN ORDER STORAGE
         */

        localStorage.setItem(
            "mothershipItem",
            JSON.stringify(
                selectedItem
            )
        );


        /*
         * COMPATIBILITY STORAGE
         */

        localStorage.setItem(
            "selectedItem",
            String(
                gun.id
            )
        );


        window.location.href =
            "order.html";

    }


    /* =====================================================
       DETAILS
    ===================================================== */

    function showDetails(gun) {

        const price =
            generatePrice(
                gun.id
            );


        alert(`

${gun.name}

CATEGORY:
${gun.category || "---"}

MANUFACTURER:
${gun.manufacturer || "---"}

COUNTRY:
${gun.country || "---"}

YEAR:
${gun.year || "---"}

FICTIONAL VALUE:
${price.currency}${price.price.toLocaleString()}

        `);

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                currentSearch =
                    this.value.trim();

                displayItems();

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                currentCategory =
                    this.dataset.category ||
                    "All";


                categoryButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                this.classList.add(
                    "active"
                );


                displayItems();

            }
        );

    });


    /* =====================================================
       START
    ===================================================== */

    displayItems();

});


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}