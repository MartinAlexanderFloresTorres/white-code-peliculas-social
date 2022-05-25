//===== VARIABLES =====
const contenedor = document.querySelector(".post");

//===== FUNCION DE CREAR ELEMENTOS =====
// crear un elemento cualquiera
function crearElemento(elemento, clase) {
    const e = document.createElement(elemento);
    if (clase) {
        e.className = clase;
    }
    return e;
}
// crear un enlace
function crearA(href, clase, title) {
    const a = document.createElement("A");
    if (clase) {
        a.className = clase;
    }
    if (title) {
        a.title = title;
    }
    a.href = href;
    return a;
}
// crear una imagen
function crearImg(src, clase, alt) {
    const img = document.createElement("IMG");
    img.className = clase;
    img.src = src;
    img.alt = alt;
    return img;
}

//===== API =====
const key = "6095d2e844434c39761dc6eed1a12b8b";
let paginaActual = 1;
let totalPaginas;
let buscador = false;

// consultar api cuando carga el documento
function ConsultarApi() {
    buscador = false;

    /* 
        crear tu propia api key gratis
        https://www.themoviedb.org/documentation/api
     */

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=es-ES&page=${paginaActual}`;

    limpiarHtmlPrevio()
    mostrarSpiner()
    fetch(url)
        .then((resultado) => resultado.json())
        .then((respuesta) => mostrarResultados(respuesta));
}
ConsultarApi();

//===== function de buscar =====
const searchPelicula = document.querySelector(".menu__input");
const formularioSearch = document.querySelector(".buscarPelicula");
const btnReset = document.querySelector("#botonReset");

formularioSearch.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = searchPelicula.value.toLowerCase();

    if (value === "") {
        searchPelicula.classList.add("error");
        setTimeout(() => {
            searchPelicula.classList.remove("error");
        }, 3000);
    } else {
        paginaActual = 1;
        ConsultarApiBusquedad();
    }
});

btnReset.addEventListener("click", () => {
    paginaActual = 1;
    ConsultarApi();
});

//===== MOSTRAR SPINER AL CARGAR =====
function mostrarSpiner() {
    const div = crearElemento("DIV", "spiner")
    const i = crearElemento("I", "bx bx-loader-circle bx-spin ico")
    div.appendChild(i)
    contenedor.appendChild(div)
}

//===== EVENTO BOTONES DE NAVEGACION =====
const siguiente = document.querySelector("#siguiente");
const anterior = document.querySelector("#anterior");

siguiente.addEventListener("click", () => {
    if (paginaActual >= 1 && paginaActual <= totalPaginas) {
        paginaActual++;
        if (buscador) {
            ConsultarApiBusquedad();
        } else {
            ConsultarApi();
        }
    }
});

anterior.addEventListener("click", () => {
    if (paginaActual > 1 && paginaActual <= totalPaginas) {
        paginaActual--;
        if (buscador) {
            ConsultarApiBusquedad();
        } else {
            ConsultarApi();
        }
    }
});

// consultar el api de busquedad
function ConsultarApiBusquedad() {
    buscador = true;
    const value = searchPelicula.value.toLowerCase();

    const url = `https://api.themoviedb.org/3/search/multi?api_key=${key}&language=es-ES&page=${paginaActual}&query=${value}`;
    limpiarHtmlPrevio()
    mostrarSpiner()
    fetch(url)
        .then((resultado) => resultado.json())
        .then((respuesta) => mostrarResultados(respuesta));
}

// mostrar el hmtl
function mostrarResultados(datos) {
    limpiarHtmlPrevio();

    const { total_pages, results } = datos;
    totalPaginas = total_pages;

    // verificar si hay datos 
    if (results.length) {
        results.forEach((pelicula) => {

            const {
                backdrop_path,
                release_date,
                title,
                overview,
                popularity,
                poster_path,
                vote_count,
                id,
            } = pelicula;

            // si hay  imagenes que lo agrege
            if (backdrop_path && poster_path) {
                const postItem = crearElemento("DIV", "post__item");

                // elementos del post top
                const postTop = crearElemento("DIV", "post__top");
                const postUsuario = crearElemento("DIV", "post__usuario");

                const postUser = crearA("#", null, "User");
                const postImgUser = crearImg(
                    `https://image.tmdb.org/t/p/w500/${backdrop_path}`,
                    "post__user"
                );
                postUser.appendChild(postImgUser);

                const divSimple = crearElemento("DIV");
                const postUsuarioText = crearA("#", "post__usuarioText");

                // si hay un titulo mostrarlo
                if (title) {
                    postUsuarioText.textContent = `${
                        title.split(" ")[0]
                    } ${id}`;
                } else {
                    // si no hay que mueste por defecto usuario
                    postUsuarioText.textContent = "Usuario";
                }

                const pSimple = crearElemento("P");
                pSimple.textContent = release_date;
                divSimple.appendChild(postUsuarioText);
                divSimple.appendChild(pSimple);

                const spanIco = crearElemento("SPAN", "ico");
                const iDots = crearElemento(
                    "I",
                    "bx bx-dots-horizontal-rounded"
                );
                spanIco.appendChild(iDots);

                postUsuario.appendChild(postUser);
                postUsuario.appendChild(divSimple);

                postTop.appendChild(postUsuario);
                postTop.appendChild(spanIco);

                // elementos centrales
                const postImagen = crearImg(
                    `https://image.tmdb.org/t/p/w500/${poster_path}`,
                    "post__imagen",
                    "nombreUser"
                );

                // elementos de iconos
                const postIconos = crearElemento("DIV", "post__iconos");
                const postIconosLeft = crearElemento("DIV", "post__iconoLeft");

                const postIconosHeart = crearElemento(
                    "DIV",
                    "post__iconosHeart"
                );

                const postHeartSpan1 = crearElemento("SPAN", "ico bx");
                const postIconIbx = crearElemento("I", "bx bx-heart");
                postHeartSpan1.appendChild(postIconIbx);

                const postHeartSpan2 = crearElemento("SPAN", "ico bxs");
                const postIconIbxs = crearElemento("I", "bx bxs-heart");
                postHeartSpan2.appendChild(postIconIbxs);

                const postHeartSpan3 = crearElemento("SPAN", "ico");
                const postIconImessage = crearElemento(
                    "I",
                    "bx bx-message-rounded-dots"
                );
                postHeartSpan3.appendChild(postIconImessage);

                const postHeartSpan4 = crearElemento("SPAN", "ico");
                const postIconIshare = crearElemento("I", "bx bx-share-alt");
                postHeartSpan4.appendChild(postIconIshare);

                const postHeartSpan5 = crearElemento("SPAN", "ico");
                const postIconIbookmark = crearElemento("I", "bx bx-bookmark");
                postHeartSpan5.appendChild(postIconIbookmark);

                postIconosHeart.appendChild(postHeartSpan1);
                postIconosHeart.appendChild(postHeartSpan2);

                postIconosLeft.appendChild(postIconosHeart);
                postIconosLeft.appendChild(postHeartSpan3);
                postIconosLeft.appendChild(postHeartSpan4);

                postIconos.appendChild(postIconosLeft);
                postIconos.appendChild(postHeartSpan5);

                // elementos del comentarios
                const postComentario = crearElemento(
                    "DIV",
                    "post__comentarios"
                );

                const divSimple2 = crearElemento("DIV");
                const postUsers = crearElemento("DIV", "post__imagenes");

                const postImg1 = crearImg(
                    `https://image.tmdb.org/t/p/w500/${poster_path}`,
                    "post__img",
                    "profile 1"
                );
                const postImg2 = crearImg(
                    `https://image.tmdb.org/t/p/w500/${backdrop_path}`,
                    "post__img",
                    "profile 2"
                );
                const postImg3 = crearImg(
                    `https://image.tmdb.org/t/p/w500/${poster_path}`,
                    "post__img",
                    "profile 3"
                );
                postUsers.appendChild(postImg1);
                postUsers.appendChild(postImg2);
                postUsers.appendChild(postImg3);

                divSimple2.appendChild(postUsers);

                const divSimple3 = crearElemento("DIV");
                divSimple3.innerHTML = "Le gustan a ";

                const postLink1 = crearA("#", "post__link", "Ir");
                postLink1.textContent = "White code";
                divSimple3.appendChild(postLink1);
                divSimple3.innerHTML += " y a ";

                const postLink2 = crearA("#", "post__link", "Ir");
                postLink2.textContent = `${popularity} personas mas`;
                divSimple3.appendChild(postLink2);

                divSimple3.innerHTML += `, ${overview} `;

                const postLink3 = crearA("#", "post__link", "Ir");
                postLink3.textContent = `#${title} #whiteSocial`;
                divSimple3.appendChild(postLink3);

                const postVerComent = crearA(
                    "#",
                    "post__cantidadComent",
                    "Ver comentarios"
                );
                postVerComent.textContent = `Ver los ${vote_count} comentarios`;

                divSimple2.appendChild(divSimple3);
                postComentario.appendChild(divSimple2);
                postComentario.appendChild(postVerComent);

                // principal
                postItem.appendChild(postTop);
                postItem.appendChild(postImagen);
                postItem.appendChild(postIconos);
                postItem.appendChild(postComentario);
                contenedor.appendChild(postItem);
            }
        });

        // eventos de icono heart
        contenedor.addEventListener("click", (e) => {
            if (e.target.classList.contains("post__iconosHeart")) {
                e.target.classList.toggle("active");
            }
        });
    } else {
        // si no hay datos llamar a la funcion que muestre los datos de la api por default
        searchPelicula.value = "";
        ConsultarApi();
    }
}

// limpiar html previo del contenedor
function limpiarHtmlPrevio() {
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
}
