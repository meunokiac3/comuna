/* =====================================================
   CONFIGURAÇÃO
===================================================== */

const totalPages = 24;

const imagePath =
    "../../assets/img/zines/volume-01/";


/* =====================================================
   ESTADO
===================================================== */

let currentPage = 1;


/* =====================================================
   ELEMENTOS
===================================================== */

const leftPage =
    document.getElementById("left-page");

const rightPage =
    document.getElementById("right-page");

const counter =
    document.getElementById("page-counter");

const thumbnails =
    document.getElementById("thumbnail-list");


/* =====================================================
   IMAGEM
===================================================== */

function pageImage(number) {

    return `${imagePath}${String(number).padStart(2, "0")}.jpg`;

}


/* =====================================================
   MOSTRAR PÁGINAS
===================================================== */

function showPages() {

    let left = currentPage;

    let right = currentPage + 1;


    /*
     * Página esquerda
     */

    if (left <= totalPages) {

        leftPage.innerHTML = `
            <img
                src="${pageImage(left)}"
                alt="Página ${left}"
            >
        `;

    } else {

        leftPage.innerHTML = "";

    }


    /*
     * Página direita
     */

    if (right <= totalPages) {

        rightPage.innerHTML = `
            <img
                src="${pageImage(right)}"
                alt="Página ${right}"
            >
        `;

    } else {

        rightPage.innerHTML = "";

    }


    updateCounter();

    updateThumbnails();

}


/* =====================================================
   CONTADOR
===================================================== */

function updateCounter() {

    const displayed =
        Math.min(
            currentPage + 1,
            totalPages
        );


    counter.textContent =
        `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;

}


/* =====================================================
   PRÓXIMA
===================================================== */

function nextPage() {

    if (currentPage >= totalPages - 1) {
        return;
    }


    rightPage.classList.add(
        "page-turn-right"
    );


    setTimeout(() => {

        currentPage += 2;

        showPages();

        rightPage.classList.remove(
            "page-turn-right"
        );

    }, 250);

}


/* =====================================================
   ANTERIOR
===================================================== */

function previousPage() {

    if (currentPage <= 1) {
        return;
    }


    leftPage.classList.add(
        "page-turn-left"
    );


    setTimeout(() => {

        currentPage -= 2;

        showPages();

        leftPage.classList.remove(
            "page-turn-left"
        );

    }, 250);

}


/* =====================================================
   THUMBNAILS
===================================================== */

function createThumbnails() {

    thumbnails.innerHTML = "";


    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const thumb =
            document.createElement("button");


        thumb.className =
            "thumbnail";


        thumb.dataset.page =
            i;


        thumb.innerHTML = `
            <img
                src="${pageImage(i)}"
                alt="Página ${i}"
            >
        `;


        thumb.addEventListener(
            "click",
            () => {

                /*
                 * Mantemos sempre a abertura
                 * em página ímpar.
                 */

                currentPage =
                    i % 2 === 0
                        ? i - 1
                        : i;

                showPages();

            }
        );


        thumbnails.appendChild(
            thumb
        );

    }

}


/* =====================================================
   THUMBNAIL ATIVA
===================================================== */

function updateThumbnails() {

    const all =
        document.querySelectorAll(
            ".thumbnail"
        );


    all.forEach(thumb => {

        const number =
            Number(
                thumb.dataset.page
            );


        thumb.classList.toggle(
            "active",
            number === currentPage
        );

    });

}


/* =====================================================
   BOTÕES
===================================================== */

document
    .getElementById("next")
    .addEventListener(
        "click",
        nextPage
    );


document
    .getElementById("previous")
    .addEventListener(
        "click",
        previousPage
    );


document
    .getElementById("control-next")
    .addEventListener(
        "click",
        nextPage
    );


document
    .getElementById("control-prev")
    .addEventListener(
        "click",
        previousPage
    );


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowRight") {
            nextPage();
        }


        if (event.key === "ArrowLeft") {
            previousPage();
        }

    }
);


/* =====================================================
   FULLSCREEN
===================================================== */

document
    .getElementById("fullscreen")
    .addEventListener(
        "click",
        () => {

            if (!document.fullscreenElement) {

                document.documentElement.requestFullscreen();

            } else {

                document.exitFullscreen();

            }

        }
    );


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

createThumbnails();

showPages();