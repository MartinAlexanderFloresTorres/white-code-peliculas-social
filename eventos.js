// variables
const menuToggle = document.querySelector("#menu");
const navegacion = document.querySelector("#navegacion");
const mensajesContenedor = document.querySelector("#mensajesContenedor");
const closeToggle = document.querySelector("#close-mensajes");
const notificacionToggle = document.querySelector("#notificacion-toggle");
const notificacionesContenedor = document.querySelector("#notificaciones-contenedor");
const notificacionCantidad = document.querySelector(".asidebar__notificacionCantidad");
const mensajesCantidad = document.querySelector(".asidebar__mensajesCantidad");
const themaToggle = document.querySelector("#thema-toggle");
const temaContenedor = document.querySelector("#tema-modo");
const body = document.querySelector("body");
const html = document.querySelector("html");
const root = document.querySelector(":root");
const itemToggle = document.querySelectorAll(".asidebar__item");

//===== EVENTOS DEL MENU =====
menuToggle.addEventListener("click", () => {
    navegacion.classList.toggle("active");
    notificacionesContenedor.classList.remove("active");
});
//===== EVENTOS DEL CLOSE DE LOS MENSAJES =====
closeToggle.addEventListener("click", () => {
    mensajesContenedor.classList.remove("active");
    body.classList.remove("hidden");
});
//===== EVENTOS DEL CONTENEDOR DEL TEMA =====
themaToggle.addEventListener("click", () => {
    temaContenedor.classList.add("active");
    body.classList.add("hiddenTema");
});
//===== EVENTOS DEL CERRAR EL CONTENEDOR DEL TEMA =====
temaContenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("tema")) {
        temaContenedor.classList.remove("active");
        body.classList.remove("hiddenTema");
    }
});

// remove las clases active
function removeItemClase() {
    itemToggle.forEach((item) => {
        item.classList.remove("active");
    });
}
// eventos de la navegacion
itemToggle.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        removeItemClase();
        item.classList.add("active");
        if (item.id === "notificacion-toggle") {
            notificacionCantidad.style.display = "none";
            notificacionesContenedor.classList.toggle("active");
        } else {
            notificacionesContenedor.classList.remove("active");
        }

        if (item.id === "mensaje") {
            mensajesCantidad.style.display = "none";
            mensajesContenedor.classList.add("active");
            body.classList.add("hidden");
        }
    });
});

//===== FONT SIZE =====
const fontSizes = document.querySelectorAll(".fontSpan");

// remove las clases active
function fontSizeRemoveActive() {
    fontSizes.forEach((span) => {
        span.classList.remove("active");
    });
}
// eventos del fon zise
fontSizes.forEach((span) => {
    span.addEventListener("click", () => {
        fontSizeRemoveActive();
        span.classList.add("active");
        let fontSize;

        if (span.classList.contains("font-size-1")) {
            fontSize = "10px";
            root.style.setProperty("--asidebar-witdh", "160px");
        } else if (span.classList.contains("font-size-2")) {
            fontSize = "14px";
            root.style.setProperty("--asidebar-witdh", "200px");
        } else if (span.classList.contains("font-size-3")) {
            fontSize = "16px";
            root.style.setProperty("--asidebar-witdh", "215px");
        } else if (span.classList.contains("font-size-4")) {
            fontSize = "19px";
            root.style.setProperty("--asidebar-witdh", "225px");
        } else if (span.classList.contains("font-size-5")) {
            fontSize = "22px";
            root.style.setProperty("--asidebar-witdh", "245px");
        }
        html.style.fontSize = fontSize;
        /////////// GUARDAR STORAGE //////////
        localStorage.setItem("font-Size", fontSize);
    });
});

//===== EVENTO DE SEARCH CHAT =====
const mensaje = document.querySelectorAll(".mensaje__contenido .mensaje__respuestas");
const mensajeSearch = document.querySelector(".mensaje__input");

mensajeSearch.addEventListener("input", buscarMensaje);

function buscarMensaje(e) {
    const valor = e.target.value.toLowerCase();

    mensaje.forEach((chat) => {
        let name = chat.querySelector("b").textContent.toLocaleLowerCase();

        if (name.indexOf(valor) != -1) {
            chat.style.display = "flex";
        } else {
            chat.style.display = "none";
        }
    });
}

//===== EVENTO DE COLOR =====
const colores = document.querySelectorAll(".tema__colorSpan");

// remove las clases active
function removeColorActive() {
    colores.forEach((color) => {
        color.classList.remove("active");
    });
}
// evento de los colores
colores.forEach((color) => {
    color.addEventListener("click", () => {
        removeColorActive();
        color.classList.add("active");
        let colorPrimario;

        if (color.classList.contains("temaColor-1")) {
            colorPrimario = 252;
        } else if (color.classList.contains("temaColor-2")) {
            colorPrimario = 52;
        } else if (color.classList.contains("temaColor-3")) {
            colorPrimario = 352;
        } else if (color.classList.contains("temaColor-4")) {
            colorPrimario = 120;
        } else if (color.classList.contains("temaColor-5")) {
            colorPrimario = 230;
        }
        root.style.setProperty("--primary-color", colorPrimario);
        /////////// GUARDAR STORAGE //////////
        localStorage.setItem("color-primario", colorPrimario);
    });
});

//===== EVENTO DEL BACKGROUND =====
const backgrounds = document.querySelectorAll(".tema__bg");

backgrounds.forEach((bg) => {
    bg.addEventListener("click", () => {
        if (bg.classList.contains("bg1")) {
            body.classList.remove("dark", "black");
            localStorage.setItem("modo-white", "");
        } else if (bg.classList.contains("bg2")) {
            body.classList.remove("black");
            body.classList.add("dark");
            localStorage.setItem("modo-white", "dark");
        } else if (bg.classList.contains("bg3")) {
            body.classList.remove("dark");
            body.classList.add("black");
            localStorage.setItem("modo-white", "black");
        }
    });
});

//===== LEER LOCAL STORAGE =====
const geFontSize = localStorage.getItem("font-Size");
if (geFontSize) {
    html.style.fontSize = geFontSize;
}

let getModo = localStorage.getItem("modo-white") || "";
if (getModo) {
    body.classList.add(getModo);
}

let getColor = localStorage.getItem("color-primario");
if (getColor) {
    root.style.setProperty("--primary-color", getColor);
}
