/* =========================================================
   COMUNA — LEITOR
   ========================================================= */


/* =========================================================
   CONFIGURAÇÃO
   ========================================================= */

const TOTAL_PAGES = 24;


/*
 * Estrutura do leitor:
 *
 * 01
 *
 * 02 | 03
 * 04 | 05
 * 06 | 07
 * 08 | 09
 * ...
 * 22 | 23
 *
 * 24
 *
 */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const leftPage =
    document.getElementById("left-page");

const rightPage =
    document.getElementById("right-page");

const currentPage =
    document.getElementById("current-page");

const totalPages =
    document.getElementById("total-pages");

const thumbnails =
    document.getElementById("thumbnails");

const previousButton =
    document.getElementById("previous-button");

const nextButton =
    document.getElementById("next-button");

const previousZone =
    document.getElementById("prev-zone");

const nextZone =
    document.getElementById("next-zone");

const fullscreenButton =
    document.getElementById("fullscreen-button");


/* =========================================================
   ESTADO
   ========================================================= */

/*
 * currentPageNumber representa o primeiro número
 * da visualização atual.
 *
 * 1  = capa
 * 2  = 02 | 03
 * 4  = 04 | 05
 * 6  = 06 | 07
 * ...
 * 24 = última página
 */

let currentPageNumber = 1;


/* =========================================================
   CORES
   ========================================================= */

const pageColors = [

    "page-cream",
    "page-red",
    "page-pink",
    "page-green",
    "page-indigo",
    "page-wine"

];


/* =========================================================
   FORMATAÇÃO
   ========================================================= */

function formatNumber(number) {

    return String(number)
        .padStart(2, "0");

}


/* =========================================================
   APLICA PÁGINA
   ========================================================= */

function applyPage(
    element,
    pageNumber
) {

    if (!element) return;


    const content =
        element.querySelector(
            ".page-content"
        );


    if (!content) return;


    /*
     * Limpa as classes anteriores.
     */

    content.className =
        "page-content";


    /*
     * Aplica a cor correspondente.
     */

    content.classList.add(

        pageColors[
            (pageNumber - 1)
            % pageColors.length
        ]

    );


    /*
     * Número da página.
     */

    content.textContent =
        formatNumber(pageNumber);

}


/* =========================================================
   ESCONDE PÁGINA
   ========================================================= */

function hidePage(element) {

    if (!element) return;

    element.style.visibility = "hidden";

}


/* =========================================================
   MOSTRA PÁGINA
   ========================================================= */

function showPage(element) {

    if (!element) return;

    element.style.visibility = "visible";

}


/* =========================================================
   RENDERIZA O LIVRO
   ========================================================= */

function renderBook() {


    /*
     * PRIMEIRA PÁGINA
     *
     * 01
     */

    if (
        currentPageNumber === 1
    ) {

        showPage(leftPage);

        hidePage(rightPage);


        applyPage(
            leftPage,
            1
        );

    }


    /*
     * ÚLTIMA PÁGINA
     *
     * 24
     */

    else if (
        currentPageNumber === TOTAL_PAGES
    ) {

        hidePage(leftPage);

        showPage(rightPage);


        applyPage(
            rightPage,
            TOTAL_PAGES
        );

    }


    /*
     * ABERTURAS INTERNAS
     *
     * 02 | 03
     * 04 | 05
     * 06 | 07
     * ...
     */

    else {

        showPage(leftPage);

        showPage(rightPage);


        applyPage(
            leftPage,
            currentPageNumber
        );


        applyPage(
            rightPage,
            currentPageNumber + 1
        );

    }


    /*
     * Atualiza contador.
     */

    currentPage.textContent =
        formatNumber(
            currentPageNumber
        );


    totalPages.textContent =
        formatNumber(
            TOTAL_PAGES
        );


    /*
     * Atualiza miniaturas.
     */

    updateThumbnails();

}


/* =========================================================
   CRIA MINIATURAS
   ========================================================= */

/*
 * Agora existem miniaturas para:
 *
 * 01
 * 02 | 03
 * 04 | 05
 * 06 | 07
 * ...
 * 22 | 23
 * 24
 */

function createThumbnails() {

    thumbnails.innerHTML = "";


    /*
     * CAPA
     */

    createThumbnail(
        [1]
    );


    /*
     * ABERTURAS INTERNAS
     */

    for (
        let page = 2;
        page < TOTAL_PAGES;
        page += 2
    ) {

        createThumbnail([
            page,
            page + 1
        ]);

    }


    /*
     * ÚLTIMA PÁGINA
     */

    createThumbnail([
        TOTAL_PAGES
    ]);

}


/* =========================================================
   CRIA UMA MINIATURA
   ========================================================= */

function createThumbnail(pages) {


    const thumbnail =
        document.createElement("button");


    thumbnail.className =
        "thumbnail";


    thumbnail.type =
        "button";


    /*
     * A primeira página do grupo identifica
     * aquela miniatura.
     */

    thumbnail.dataset.page =
        pages[0];


    thumbnail.setAttribute(
        "aria-label",
        pages.length === 1

            ? `Ir para página ${formatNumber(pages[0])}`

            : `Ir para páginas ${formatNumber(pages[0])} e ${formatNumber(pages[1])}`
    );


    /*
     * Container da miniatura.
     */

    const inner =
        document.createElement("div");


    inner.className =
        "thumbnail-inner";


    /*
     * Para manter a estética existente,
     * usamos a cor da primeira página.
     */

    inner.classList.add(

        pageColors[
            (pages[0] - 1)
            % pageColors.length
        ]

    );


    /*
     * Mostra os números juntos.
     */

    if (pages.length === 1) {

        inner.textContent =
            formatNumber(pages[0]);

    }

    else {

        inner.textContent =
            `${formatNumber(pages[0])} | ${formatNumber(pages[1])}`;

    }


    thumbnail.appendChild(
        inner
    );


    /*
     * Clique na miniatura.
     */

    thumbnail.addEventListener(
        "click",
        () => {

            goToPage(
                pages[0]
            );

        }
    );


    thumbnails.appendChild(
        thumbnail
    );

}


/* =========================================================
   ATUALIZA MINIATURAS
   ========================================================= */

function updateThumbnails() {

    const items =
        document.querySelectorAll(
            ".thumbnail"
        );


    items.forEach(
        item => {

            const page =
                Number(
                    item.dataset.page
                );


            /*
             * CAPA
             */

            let active =
                currentPageNumber === 1
                    ? page === 1
                    : false;


            /*
             * ÚLTIMA PÁGINA
             */

            if (
                currentPageNumber === TOTAL_PAGES
            ) {

                active =
                    page === TOTAL_PAGES;

            }


            /*
             * ABERTURA INTERNA
             */

            if (
                currentPageNumber > 1 &&
                currentPageNumber < TOTAL_PAGES
            ) {

                active =
                    page === currentPageNumber;

            }


            item.classList.toggle(
                "active",
                active
            );


            /*
             * Mantém a miniatura atual
             * visível na coluna.
             */

            if (active) {

                item.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest"
                });

            }

        }
    );

}


/* =========================================================
   PRÓXIMA ABERTURA
   ========================================================= */

function nextPage() {


    /*
     * Se já estamos na última página,
     * não fazemos nada.
     */

    if (
        currentPageNumber >= TOTAL_PAGES
    ) {

        return;

    }


    /*
     * CAPA → PRIMEIRA ABERTURA
     *
     * 01 → 02 | 03
     */

    if (
        currentPageNumber === 1
    ) {

        currentPageNumber = 2;

    }


    /*
     * ABERTURA → PRÓXIMA ABERTURA
     *
     * 02 | 03 → 04 | 05
     */

    else if (
        currentPageNumber + 2 < TOTAL_PAGES
    ) {

        currentPageNumber += 2;

    }


    /*
     * ÚLTIMA ABERTURA → ÚLTIMA PÁGINA
     *
     * 22 | 23 → 24
     */

    else {

        currentPageNumber =
            TOTAL_PAGES;

    }


    renderBook();

}


/* =========================================================
   ABERTURA ANTERIOR
   ========================================================= */

function previousPage() {


    /*
     * Se estamos na capa,
     * não podemos voltar mais.
     */

    if (
        currentPageNumber <= 1
    ) {

        return;

    }


    /*
     * ÚLTIMA PÁGINA → ÚLTIMA ABERTURA
     *
     * 24 → 22 | 23
     */

    if (
        currentPageNumber === TOTAL_PAGES
    ) {

        currentPageNumber =
            TOTAL_PAGES - 2;

    }


    /*
     * PRIMEIRA ABERTURA → CAPA
     *
     * 02 | 03 → 01
     */

    else if (
        currentPageNumber === 2
    ) {

        currentPageNumber = 1;

    }


    /*
     * ABERTURA → ABERTURA ANTERIOR
     *
     * 06 | 07 → 04 | 05
     */

    else {

        currentPageNumber -= 2;

    }


    renderBook();

}


/* =========================================================
   IR PARA UMA PÁGINA / ABERTURA
   ========================================================= */

function goToPage(page) {


    if (
        page < 1 ||
        page > TOTAL_PAGES
    ) {

        return;

    }


    /*
     * CAPA
     */

    if (
        page === 1
    ) {

        currentPageNumber = 1;

        renderBook();

        return;

    }


    /*
     * ÚLTIMA PÁGINA
     */

    if (
        page === TOTAL_PAGES
    ) {

        currentPageNumber =
            TOTAL_PAGES;

        renderBook();

        return;

    }


    /*
     * PÁGINAS INTERNAS
     *
     * 02 ou 03 → 02
     * 04 ou 05 → 04
     * 06 ou 07 → 06
     */

    currentPageNumber =
        page % 2 === 0
            ? page
            : page - 1;


    renderBook();

}


/* =========================================================
   TELA CHEIA
   ========================================================= */

function toggleFullscreen() {

    if (
        !document.fullscreenElement
    ) {

        document.documentElement
            .requestFullscreen()
            .catch(() => {});

    }

    else {

        document
            .exitFullscreen()
            .catch(() => {});

    }

}


/* =========================================================
   EVENTOS — BOTÕES
   ========================================================= */

nextButton.addEventListener(
    "click",
    nextPage
);


previousButton.addEventListener(
    "click",
    previousPage
);


nextZone.addEventListener(
    "click",
    nextPage
);


previousZone.addEventListener(
    "click",
    previousPage
);


fullscreenButton.addEventListener(
    "click",
    toggleFullscreen
);


/* =========================================================
   TECLADO
   ========================================================= */

document.addEventListener(
    "keydown",
    event => {


        if (
            event.key === "ArrowRight"
        ) {

            nextPage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousPage();

        }


        if (
            event.key.toLowerCase() === "f"
        ) {

            toggleFullscreen();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

createThumbnails();

renderBook();