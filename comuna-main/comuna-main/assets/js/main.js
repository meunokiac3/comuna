const dots =
    document.querySelectorAll(".nav-dot");

const label =
    document.querySelector(".nav-label");

const transition =
    document.querySelector(".page-transition");


dots.forEach(dot => {

    /* =========================
       HOVER
    ========================= */

    dot.addEventListener("mouseenter", () => {

        if (label) {
            label.textContent =
                dot.dataset.name;
        }

    });


    dot.addEventListener("mouseleave", () => {

        if (label) {
            label.textContent = "";
        }

    });


    /* =========================
       CLIQUE
    ========================= */

    dot.addEventListener("click", event => {

        event.preventDefault();

        const destination =
            dot.getAttribute("href");

        if (!destination) {
            return;
        }

        if (transition) {
            transition.classList.add("is-active");
        }


        setTimeout(() => {

            window.location.href =
                destination;

        }, 700);

    });

});


/* =====================================================
   ZINES — ABRIR / FECHAR VOLUMES
===================================================== */

const volumeTabs =
    document.querySelectorAll(".volume-tab");


volumeTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const volume =
            tab.closest(".zine-volume");

        if (!volume) {
            return;
        }


        if (
            volume.classList.contains("is-open")
        ) {

            volume.classList.remove("is-open");
            tab.setAttribute("aria-expanded", "false");

            return;

        }


        document
            .querySelectorAll(".zine-volume.is-open")
            .forEach(openVolume => {

                openVolume.classList.remove(
                    "is-open"
                );

                openVolume
                    .querySelector(".volume-tab")
                    .setAttribute("aria-expanded", "false");

            });


        volume.classList.add(
            "is-open"
        );
        tab.setAttribute("aria-expanded", "true");

    });

});
