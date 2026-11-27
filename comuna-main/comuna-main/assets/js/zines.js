/* =========================================================
   COMUNA — ZINES
   INTERAÇÃO DAS EDIÇÕES
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".featured-track");

    if (!track) return;

    const header = document.querySelector(".zines-header");
    const previousButton = document.querySelector(".featured-control-previous");
    const nextButton = document.querySelector(".featured-control-next");
    const zines = [...track.querySelectorAll(".featured-zine")];
    let currentZineIndex = 0;

    const showZine = (index) => {

        const boundedIndex = Math.max(
            0,
            Math.min(index, zines.length - 1)
        );

        currentZineIndex = boundedIndex;
        track.scrollLeft = zines[boundedIndex].offsetLeft;

    };

    if (previousButton && nextButton) {

        previousButton.addEventListener("click", () => {
            showZine(currentZineIndex - 1);
        });

        nextButton.addEventListener("click", () => {
            showZine(currentZineIndex + 1);
        });

    }

    track.querySelectorAll(".featured-zine").forEach((zine, zineIndex) => {

        [...zine.querySelectorAll(".spine-dots i")].forEach((dot, dotIndex) => {

            const targetIndex = zineIndex + dotIndex - 1;

            dot.setAttribute("role", "button");
            dot.setAttribute("tabindex", "0");
            dot.setAttribute(
                "aria-label",
                targetIndex < 0
                    ? "primeira edição"
                    : targetIndex >= zines.length
                        ? "última edição"
                        : `ir para edição ${targetIndex + 1}`
            );

            const activateDot = () => showZine(targetIndex);

            dot.addEventListener("click", activateDot);
            dot.addEventListener("keydown", (event) => {

                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activateDot();
                }

            });

        });

    });

    if (header) {

        let lastScrollY = window.scrollY;

        window.addEventListener("scroll", () => {

            const currentScrollY = window.scrollY;

            if (currentScrollY <= 120) {
                header.classList.remove("is-hidden");
            } else if (currentScrollY > lastScrollY) {
                header.classList.add("is-hidden");
            }

            lastScrollY = currentScrollY;

        }, { passive: true });

    }


    /* =====================================================
       EVITA QUE LINKS SEJAM ARRASTADOS
       COMO IMAGENS / TEXTO
       ===================================================== */

    track.querySelectorAll("a").forEach((link) => {

        link.addEventListener(
            "dragstart",
            (event) => {
                event.preventDefault();
            }
        );

    });

});