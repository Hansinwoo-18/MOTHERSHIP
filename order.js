/* =========================================================
   MOTHERSHIP — ORDER / TRANSACTION SYSTEM
   Shared with Inventory System
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       GET STORED ITEM
    ===================================================== */

    let selectedItem = null;


    /*
     * FIRST:
     * Try the new complete object.
     */

    const storedItem =
        localStorage.getItem(
            "mothershipItem"
        );


    if (storedItem) {

        try {

            selectedItem =
                JSON.parse(
                    storedItem
                );

        }

        catch (error) {

            console.error(
                "MOTHERSHIP: Invalid mothershipItem.",
                error
            );

        }

    }


    /*
     * FALLBACK:
     * Older selectedItem ID system.
     */

    if (
        !selectedItem
    ) {

        const selectedId =
            localStorage.getItem(
                "selectedItem"
            );


        if (
            selectedId &&
            typeof guns !== "undefined" &&
            Array.isArray(guns)
        ) {

            const gun =
                guns.find(
                    item =>
                        String(item.id) ===
                        String(selectedId)
                );


            if (gun) {

                selectedItem = {

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

                    price:
                        "CLASSIFIED"

                };

            }

        }

    }


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const itemImage =
        document.getElementById(
            "itemImage"
        );

    const imageFallback =
        document.getElementById(
            "imageFallback"
        );

    const itemName =
        document.getElementById(
            "itemName"
        );

    const itemCategory =
        document.getElementById(
            "itemCategory"
        );

    const itemManufacturer =
        document.getElementById(
            "itemManufacturer"
        );

    const itemPrice =
        document.getElementById(
            "itemPrice"
        );


    const checkoutPanel =
        document.getElementById(
            "checkoutPanel"
        );

    const loadingScreen =
        document.getElementById(
            "loadingScreen"
        );

    const restrictedScreen =
        document.getElementById(
            "restrictedScreen"
        );

    const submitButton =
        document.getElementById(
            "submitButton"
        );

    const returnButton =
        document.getElementById(
            "returnButton"
        );

    const backInventory =
        document.getElementById(
            "backInventory"
        );


    /* =====================================================
       LOAD ITEM
    ===================================================== */

    if (!selectedItem) {

        console.error(
            "MOTHERSHIP: No selected item."
        );


        if (itemName) {

            itemName.textContent =
                "NO ITEM SELECTED";

        }


        if (itemCategory) {

            itemCategory.textContent =
                "---";

        }


        if (itemManufacturer) {

            itemManufacturer.textContent =
                "---";

        }


        if (itemPrice) {

            itemPrice.textContent =
                "---";

        }


        if (imageFallback) {

            imageFallback.style.display =
                "block";

        }

    }

    else {

        console.log(
            "MOTHERSHIP: Selected item:",
            selectedItem
        );


        if (itemName) {

            itemName.textContent =
                selectedItem.name ||
                "UNKNOWN ITEM";

        }


        if (itemCategory) {

            itemCategory.textContent =
                selectedItem.category ||
                "---";

        }


        if (itemManufacturer) {

            itemManufacturer.textContent =
                selectedItem.manufacturer ||
                "---";

        }


        if (itemPrice) {

            if (
                selectedItem.currency &&
                selectedItem.price
            ) {

                itemPrice.textContent =
                    selectedItem.currency +
                    Number(
                        selectedItem.price
                    ).toLocaleString();

            }

            else {

                itemPrice.textContent =
                    selectedItem.price ||
                    "CLASSIFIED";

            }

        }


        /* =================================================
           IMAGE
        ================================================= */

        if (
            itemImage &&
            selectedItem.image
        ) {

            itemImage.src =
                selectedItem.image;


            itemImage.onload = () => {

                itemImage.classList.add(
                    "loaded"
                );


                if (imageFallback) {

                    imageFallback.style.display =
                        "none";

                }

            };


            itemImage.onerror = () => {

                itemImage.classList.remove(
                    "loaded"
                );


                if (imageFallback) {

                    imageFallback.style.display =
                        "block";

                }

            };

        }

        else {

            if (imageFallback) {

                imageFallback.style.display =
                    "block";

            }

        }

    }


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
       TRANSACTION
    ===================================================== */

    if (submitButton) {

        submitButton.addEventListener(
            "click",
            () => {

                /*
                 * Never continue if there is
                 * no selected item.
                 */

                if (!selectedItem) {

                    alert(
                        "NO ITEM SELECTED."
                    );

                    return;

                }


                const paymentElement =
                    document.getElementById(
                        "paymentMethod"
                    );


                const addressElement =
                    document.getElementById(
                        "address"
                    );


                const cityElement =
                    document.getElementById(
                        "city"
                    );


                const postalElement =
                    document.getElementById(
                        "postal"
                    );


                const countryElement =
                    document.getElementById(
                        "country"
                    );


                const paymentMethod =
                    paymentElement
                        ? paymentElement.value
                        : "";


                const address =
                    addressElement
                        ? addressElement.value.trim()
                        : "";


                const city =
                    cityElement
                        ? cityElement.value.trim()
                        : "";


                const postal =
                    postalElement
                        ? postalElement.value.trim()
                        : "";


                const country =
                    countryElement
                        ? countryElement.value
                        : "";


                /* =========================================
                   FORM VALIDATION
                ========================================= */

                if (
                    !paymentMethod ||
                    !address ||
                    !city ||
                    !postal ||
                    !country
                ) {

                    alert(
                        "PLEASE COMPLETE ALL TRANSACTION FIELDS."
                    );

                    return;

                }


                /* =========================================
                   SAVE FICTIONAL REQUEST
                ========================================= */

                const requestData = {

                    item:
                        selectedItem.name,

                    itemId:
                        selectedItem.id,

                    code:
                        getCurrentCode(),

                    paymentMethod:
                        paymentMethod,

                    address:
                        address,

                    city:
                        city,

                    postal:
                        postal,

                    country:
                        country,

                    timestamp:
                        new Date().toISOString()

                };


                localStorage.setItem(
                    "mothershipRequest",
                    JSON.stringify(
                        requestData
                    )
                );


                /* =========================================
                   SHOW LOADING
                ========================================= */

                if (checkoutPanel) {

                    checkoutPanel.classList.add(
                        "hidden"
                    );

                }


                if (loadingScreen) {

                    loadingScreen.classList.remove(
                        "hidden"
                    );

                }


                const loadingText =
                    document.getElementById(
                        "loadingText"
                    );


                if (loadingText) {

                    loadingText.textContent =
                        "VERIFYING TRANSACTION DATA...";

                }


                setTimeout(() => {

                    if (loadingText) {

                        loadingText.textContent =
                            "CHECKING REGIONAL AVAILABILITY...";

                    }

                }, 1000);


                setTimeout(() => {

                    if (loadingText) {

                        loadingText.textContent =
                            "CONTACTING MOTHERSHIP SYSTEM...";

                    }

                }, 2000);


                /* =========================================
                   FINAL FICTIONAL RESULT
                ========================================= */

                setTimeout(() => {

                    if (loadingScreen) {

                        loadingScreen.classList.add(
                            "hidden"
                        );

                    }


                    if (restrictedScreen) {

                        restrictedScreen.classList.remove(
                            "hidden"
                        );

                    }

                }, 3200);

            }
        );

    }


    /* =====================================================
       RETURN
    ===================================================== */

    if (returnButton) {

        returnButton.addEventListener(
            "click",
            () => {

                window.location.href =
                    "inventory.html";

            }
        );

    }


    /* =====================================================
       BACK TO INVENTORY
    ===================================================== */

    if (backInventory) {

        backInventory.addEventListener(
            "click",
            () => {

                window.location.href =
                    "inventory.html";

            }
        );

    }

});