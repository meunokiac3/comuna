
/* =====================================================
   EDIÇÕES
===================================================== */

const editions = {
    "u_0_01": {
        title: "ZINE 01",
        folder: "u_0_01",
        pages: [
            "mani 1.png",
            "mani 2.png",
            "mani 3.png",
            "mani 4.png"
        ]
    },

    "u-1_01": {
        title: "ZINE 02",
        folder: "u-1_01",
        pages: [
            "u_01_01.png",
            "u_01_02.png",
            "u_01_03.png",
            "u_01_04.png",
            "u_01_05.png",
            "u_01_06.png",
            "u_01_07.png",
            "u_01_08.png",
            "u_01_09.png"
        ]
    },

    "u-2_01": {
        title: "ZINE 03",
        folder: "u-2_01",
        pages: [
            "U 1.png",
            "U 2.png",
            "U 3.png",
            "U 4.png",
            "U 5.png",
            "U 6.png",
            "U 7.png",
            "U 8.png",
            "U 10.png",
            "U 11.png",
            "U 12.png",
            "U 13.png",
            "U 14.png",
            "U 15.png",
            "U 18.png",
            "U 19.png"
        ]
    }
};


/* =====================================================
   IDENTIFICAR EDIÇÃO
===================================================== */

const params = new URLSearchParams(window.location.search);

const editionId = params.get("edicao") || "u_0_01";

const edition = editions[editionId] || editions["u_0_01"];

const totalPages = edition.pages.length;

const imagePath = `../${edition.folder}/`;


/* =====================================================
   ESTADO
===================================================== */

let currentPage = 1;


/* =====================================================
   ELEMENTOS
===================================================== */

const page = document.getElementById("left-page");
const counter = document.getElementById("page-counter");
const thumbnails = document.getElementById("thumbnail-list");
const editionLabel = document.querySelector(".reader-header > span");


/* =====================================================
   CAMINHO DAS IMAGENS
===================================================== */

function pageImage(number) {
    const filename = edition.pages[number - 1];

    return imagePath + encodeURIComponent(filename);
}


/* =====================================================
   MOSTRAR UMA PÁGINA
===================================================== */

function showPage() {

    page.innerHTML = "";

    if (currentPage < 1 || currentPage > totalPages) {
        return;
    }

    const img = document.createElement("img");

    img.src = pageImage(currentPage);
    img.alt = `Página ${currentPage}`;
    img.draggable = false;

    img.onerror = () => {
        console.error("Imagem não encontrada:", img.src);
    };

    page.appendChild(img);

    updateCounter();
    updateThumbnails();
}


/* =====================================================
   CONTADOR
===================================================== */

function updateCounter() {

    counter.textContent =
        `${String(currentPage).padStart(2, "0")} / ${String(totalPages).padStart(2, "0")}`;

}


/* =====================================================
   PRÓXIMA PÁGINA
===================================================== */

function nextPage() {

    if (currentPage >= totalPages) return;

    currentPage++;

    showPage();

}


/* =====================================================
   PÁGINA ANTERIOR
===================================================== */

function previousPage() {

    if (currentPage <= 1) return;

    currentPage--;

    showPage();

}


/* =====================================================
   MINIATURAS
===================================================== */

function createThumbnails() {

    thumbnails.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const thumb = document.createElement("button");

        thumb.className = "thumbnail";
        thumb.dataset.page = i;
        thumb.type = "button";

        thumb.setAttribute(
            "aria-label",
            `Abrir página ${i}`
        );

        const img = document.createElement("img");

        img.src = pageImage(i);
        img.alt = `Miniatura da página ${i}`;
        img.loading = "lazy";

        img.onerror = () => {
            console.error("Miniatura não encontrada:", img.src);
        };

        thumb.appendChild(img);

        thumb.addEventListener("click", () => {

            currentPage = i;

            showPage();

        });

        thumbnails.appendChild(thumb);

    }

}


/* =====================================================
   MINIATURA ATIVA
===================================================== */

function updateThumbnails() {

    const all = document.querySelectorAll(".thumbnail");

    all.forEach(thumb => {

        const number = Number(thumb.dataset.page);

        const active = number === currentPage;

        thumb.classList.toggle("active", active);

        if (active) {
            thumb.setAttribute("aria-current", "page");
        } else {
            thumb.removeAttribute("aria-current");
        }

    });

}


/* =====================================================
   BOTÕES
===================================================== */

document.getElementById("next").addEventListener(
    "click",
    nextPage
);

document.getElementById("previous").addEventListener(
    "click",
    previousPage
);

document.getElementById("control-next").addEventListener(
    "click",
    nextPage
);

document.getElementById("control-prev").addEventListener(
    "click",
    previousPage
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "ArrowRight") {
        nextPage();
    }

    if (event.key === "ArrowLeft") {
        previousPage();
    }

});


/* =====================================================
   TELA CHEIA
===================================================== */

document.getElementById("fullscreen").addEventListener(
    "click",
    async () => {

        try {

            if (!document.fullscreenElement) {

                await document.documentElement.requestFullscreen();

            } else {

                await document.exitFullscreen();

            }

        } catch (error) {

            console.error("Erro ao abrir tela cheia:", error);

        }

    }
);


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

editionLabel.textContent = edition.title;

document.title = `Leitura — ${edition.title}`;

createThumbnails();

showPage();
