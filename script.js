/* ==================================================
   ELEMENTOS
================================================== */

let longitud =
    document.getElementById("longitud");

let passwordDisplay =
    document.getElementById("passwordDisplay");

let eyeButton =
    document.getElementById("eyeButton");

let copyButton =
    document.getElementById("copyButton");

let language =
    document.getElementById("language");

let strength =
    document.getElementById("strength");

let strengthText =
    document.getElementById("strengthText");

let strength1 =
    document.getElementById("strength1");

let strength2 =
    document.getElementById("strength2");

let strength3 =
    document.getElementById("strength3");

let strength4 =
    document.getElementById("strength4");


/* ==================================================
   CARACTERES
================================================== */

let caracteres = {

    mayusculas:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    minusculas:
        "abcdefghijklmnopqrstuvwxyz",

    numeros:
        "0123456789",

    simbolos:
        "!@#$%^&*()_+-=[]{}"

};


/* ==================================================
   IDIOMAS DISPONIBLES
================================================== */

let idiomasSoportados = [
    "en",
    "es",
    "fr",
    "de",
    "it"
];


/* ==================================================
   ESTADO
================================================== */

let passwordActual = "";

let passwordVisible = false;

let idiomaActual = "en";

let traducciones = {};


/* ==================================================
   DETECTAR IDIOMA
================================================== */

function detectarIdioma() {

    /*
        Primero comprobamos si el usuario
        ya eligió manualmente un idioma.
    */

    let idiomaGuardado =
        localStorage.getItem(
            "passwordForgeLanguage"
        );


    if (
        idiomasSoportados.includes(
            idiomaGuardado
        )
    ) {

        return idiomaGuardado;

    }


    /*
        Después miramos las preferencias
        del navegador.

        navigator.languages puede contener
        valores como:

        es-ES
        en-US
        fr-FR
        de-DE
        it-IT
    */

    let idiomasNavegador =
        navigator.languages;


    if (
        !idiomasNavegador ||
        idiomasNavegador.length === 0
    ) {

        idiomasNavegador = [
            navigator.language
        ];

    }


    for (
        let i = 0;
        i < idiomasNavegador.length;
        i++
    ) {

        let idioma =
            idiomasNavegador[i]
            .toLowerCase()
            .split("-")[0];


        /*
            También soportamos variantes
            como es_ES.
        */

        idioma =
            idioma.split("_")[0];


        if (
            idiomasSoportados.includes(
                idioma
            )
        ) {

            return idioma;

        }

    }


    /*
        Idioma predeterminado.
    */

    return "en";

}


/* ==================================================
   CARGAR JSON
================================================== */

async function cargarIdioma(idioma) {

    try {

        let respuesta =
            await fetch(
                "./translations/"
                + idioma
                + ".json",
                {
                    cache: "no-store"
                }
            );


        if (
            !respuesta.ok
        ) {

            throw new Error(
                "Translation file not found: "
                + idioma
            );

        }


        let datos =
            await respuesta.json();


        traducciones =
            datos;


        idiomaActual =
            idioma;


        language.value =
            idioma;


        document.documentElement.lang =
            idioma;


        aplicarTraducciones();


    } catch (error) {

        console.error(
            "Error loading language:",
            error
        );


        /*
            Si falla el idioma solicitado,
            intentamos cargar inglés.
        */

        if (
            idioma !== "en"
        ) {

            await cargarIdioma("en");

        }

    }

}


/* ==================================================
   APLICAR TRADUCCIONES
================================================== */

function aplicarTraducciones() {

    let elementos =
        document.querySelectorAll(
            "[data-i18n]"
        );


    for (
        let i = 0;
        i < elementos.length;
        i++
    ) {

        let clave =
            elementos[i].getAttribute(
                "data-i18n"
            );


        if (
            Object.prototype.hasOwnProperty.call(
                traducciones,
                clave
            )
        ) {

            elementos[i].textContent =
                traducciones[clave];

        }

    }


    actualizarAtributos();

    actualizarTextoFortaleza();

}


/* ==================================================
   CAMBIAR IDIOMA
================================================== */

async function cambiarIdioma() {

    let nuevoIdioma =
        language.value;


    if (
        !idiomasSoportados.includes(
            nuevoIdioma
        )
    ) {

        return;

    }


    /*
        Guardamos la elección del usuario.
    */

    localStorage.setItem(
        "passwordForgeLanguage",
        nuevoIdioma
    );


    await cargarIdioma(
        nuevoIdioma
    );

}


/* ==================================================
   ACTUALIZAR ATRIBUTOS
================================================== */

function actualizarAtributos() {

    if (
        Object.keys(
            traducciones
        ).length === 0
    ) {

        return;

    }


    if (
        passwordVisible
    ) {

        eyeButton.setAttribute(
            "aria-label",
            traducciones.hidePassword
        );

        eyeButton.setAttribute(
            "title",
            traducciones.hidePassword
        );

    } else {

        eyeButton.setAttribute(
            "aria-label",
            traducciones.showPassword
        );

        eyeButton.setAttribute(
            "title",
            traducciones.showPassword
        );

    }


    copyButton.setAttribute(
        "aria-label",
        traducciones.copyPassword
    );

    copyButton.setAttribute(
        "title",
        traducciones.copyPassword
    );


    longitud.setAttribute(
        "aria-label",
        traducciones.lengthLabel
    );

}


/* ==================================================
   CARÁCTER ALEATORIO
================================================== */

function caracterAleatorio(texto) {

    let arrayAleatorio =
        new Uint32Array(1);


    crypto.getRandomValues(
        arrayAleatorio
    );


    let posicion =
        arrayAleatorio[0]
        %
        texto.length;


    return texto[posicion];

}


/* ==================================================
   ESTADO COPY
================================================== */

function actualizarEstadoCopy() {

    if (
        passwordActual === ""
    ) {

        copyButton.classList.add(
            "disabled"
        );

    } else {

        copyButton.classList.remove(
            "disabled"
        );

    }

}


/* ==================================================
   GENERAR PASSWORD
================================================== */

function generarPassword() {

    let longitudPassword =
        Number(
            longitud.value
        );


    /* =========================
       VALIDAR LONGITUD
    ========================== */

    if (
        Number.isNaN(
            longitudPassword
        ) ||
        longitudPassword < 4 ||
        longitudPassword > 64
    ) {

        passwordActual = "";

        passwordVisible = false;


        passwordDisplay.textContent =
            traducciones.lengthError;


        eyeButton.classList.remove(
            "is-visible"
        );


        eyeButton.setAttribute(
            "aria-pressed",
            "false"
        );


        actualizarEstadoCopy();

        resetStrength();

        actualizarAtributos();

        return;

    }


    /* =========================
       LEER OPCIONES
    ========================== */

    let opciones = {

        mayusculas:
            document.getElementById(
                "mayusculas"
            ).checked,

        minusculas:
            document.getElementById(
                "minusculas"
            ).checked,

        numeros:
            document.getElementById(
                "numeros"
            ).checked,

        simbolos:
            document.getElementById(
                "simbolos"
            ).checked

    };


    /* =========================
       CARACTERES DISPONIBLES
    ========================== */

    let disponibles = "";


    if (
        opciones.mayusculas
    ) {

        disponibles +=
            caracteres.mayusculas;

    }


    if (
        opciones.minusculas
    ) {

        disponibles +=
            caracteres.minusculas;

    }


    if (
        opciones.numeros
    ) {

        disponibles +=
            caracteres.numeros;

    }


    if (
        opciones.simbolos
    ) {

        disponibles +=
            caracteres.simbolos;

    }


    /* =========================
       NINGUNA OPCIÓN
    ========================== */

    if (
        disponibles === ""
    ) {

        passwordActual = "";

        passwordVisible = false;


        passwordDisplay.textContent =
            traducciones.selectOption;


        eyeButton.classList.remove(
            "is-visible"
        );


        eyeButton.setAttribute(
            "aria-pressed",
            "false"
        );


        actualizarEstadoCopy();

        resetStrength();

        actualizarAtributos();

        return;

    }


    /* =========================
       CREAR PASSWORD
    ========================== */

    let nuevaPassword = "";


    /*
        Garantizamos al menos un carácter
        de cada categoría seleccionada.
    */

    if (
        opciones.mayusculas
    ) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.mayusculas
            );

    }


    if (
        opciones.minusculas
    ) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.minusculas
            );

    }


    if (
        opciones.numeros
    ) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.numeros
            );

    }


    if (
        opciones.simbolos
    ) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.simbolos
            );

    }


    /* =========================
       COMPLETAR LONGITUD
    ========================== */

    while (
        nuevaPassword.length
        <
        longitudPassword
    ) {

        nuevaPassword +=
            caracterAleatorio(
                disponibles
            );

    }


    /* =========================
       MEZCLAR
    ========================== */

    nuevaPassword =
        mezclarPassword(
            nuevaPassword
        );


    /* =========================
       GUARDAR
    ========================== */

    passwordActual =
        nuevaPassword;

    passwordVisible =
        false;


    eyeButton.classList.remove(
        "is-visible"
    );


    eyeButton.setAttribute(
        "aria-pressed",
        "false"
    );


    actualizarPassword();

    actualizarEstadoCopy();

    actualizarFortaleza();

    actualizarAtributos();


    copyButton.classList.remove(
        "copied"
    );

}


/* ==================================================
   MEZCLAR PASSWORD
================================================== */

function mezclarPassword(password) {

    let resultado =
        password.split("");


    for (
        let i = resultado.length - 1;
        i > 0;
        i--
    ) {

        let arrayAleatorio =
            new Uint32Array(1);


        crypto.getRandomValues(
            arrayAleatorio
        );


        let posicion =
            arrayAleatorio[0]
            %
            (i + 1);


        let temporal =
            resultado[i];


        resultado[i] =
            resultado[posicion];


        resultado[posicion] =
            temporal;

    }


    return resultado.join("");

}


/* ==================================================
   ACTUALIZAR PASSWORD
================================================== */

function actualizarPassword() {

    if (
        passwordActual === ""
    ) {

        return;

    }


    passwordDisplay.style.opacity =
        "0";


    passwordDisplay.style.transform =
        "translateY(2px)";


    setTimeout(
        function () {

            if (
                passwordVisible
            ) {

                passwordDisplay.textContent =
                    passwordActual;

            } else {

                passwordDisplay.textContent =
                    "•".repeat(
                        passwordActual.length
                    );

            }


            passwordDisplay.style.opacity =
                "1";


            passwordDisplay.style.transform =
                "translateY(0)";

        },
        90
    );

}


/* ==================================================
   MOSTRAR / OCULTAR
================================================== */

function mostrarOcultarPassword() {

    if (
        passwordActual === ""
    ) {

        passwordDisplay.textContent =
            traducciones.generateFirst;

        return;

    }


    passwordVisible =
        !passwordVisible;


    eyeButton.classList.toggle(
        "is-visible"
    );


    eyeButton.setAttribute(
        "aria-pressed",
        passwordVisible.toString()
    );


    actualizarPassword();

    actualizarAtributos();

}


/* ==================================================
   COPIAR
================================================== */

function copiarPassword() {

    if (
        passwordActual === ""
    ) {

        passwordDisplay.textContent =
            traducciones.generateFirst;

        return;

    }


    navigator.clipboard
        .writeText(
            passwordActual
        )
        .then(
            function () {

                copyButton.classList.add(
                    "copied"
                );


                setTimeout(
                    function () {

                        copyButton.classList.remove(
                            "copied"
                        );

                    },
                    1200
                );

            }
        )
        .catch(
            function (error) {

                console.error(
                    "Could not copy password:",
                    error
                );

            }
        );

}


/* ==================================================
   CALCULAR FORTALEZA
================================================== */

function calcularFortaleza(password) {

    if (
        password === ""
    ) {

        return 0;

    }


    let score = 0;

    let tipos = 0;


    /* LONGITUD */

    if (
        password.length >= 8
    ) {

        score++;

    }


    if (
        password.length >= 12
    ) {

        score++;

    }


    if (
        password.length >= 16
    ) {

        score++;

    }


    /* MAYÚSCULAS */

    if (
        /[A-Z]/.test(password)
    ) {

        tipos++;

    }


    /* MINÚSCULAS */

    if (
        /[a-z]/.test(password)
    ) {

        tipos++;

    }


    /* NÚMEROS */

    if (
        /[0-9]/.test(password)
    ) {

        tipos++;

    }


    /* SÍMBOLOS */

    if (
        /[^A-Za-z0-9]/.test(password)
    ) {

        tipos++;

    }


    if (
        tipos >= 2
    ) {

        score++;

    }


    if (
        tipos === 4
    ) {

        score++;

    }


    return Math.min(
        score,
        4
    );

}


/* ==================================================
   ACTUALIZAR FORTALEZA
================================================== */

function actualizarFortaleza() {

    let score =
        calcularFortaleza(
            passwordActual
        );


    resetStrength();


    if (
        score === 0
    ) {

        strengthText.textContent =
            traducciones.veryWeak;

        strength.classList.add(
            "weak"
        );

        activarSegmentos(1);

        return;

    }


    if (
        score === 1
    ) {

        strengthText.textContent =
            traducciones.weak;

        strength.classList.add(
            "weak"
        );

        activarSegmentos(1);

        return;

    }


    if (
        score === 2
    ) {

        strengthText.textContent =
            traducciones.medium;

        strength.classList.add(
            "medium"
        );

        activarSegmentos(2);

        return;

    }


    if (
        score === 3
    ) {

        strengthText.textContent =
            traducciones.strong;

        strength.classList.add(
            "strong"
        );

        activarSegmentos(3);

        return;

    }


    strengthText.textContent =
        traducciones.veryStrong;


    strength.classList.add(
        "very-strong"
    );


    activarSegmentos(4);

}


/* ==================================================
   ACTUALIZAR TEXTO DE FORTALEZA
================================================== */

function actualizarTextoFortaleza() {

    if (
        passwordActual !== ""
    ) {

        actualizarFortaleza();

    } else {

        if (
            traducciones.waiting
        ) {

            strengthText.textContent =
                traducciones.waiting;

        }

    }

}


/* ==================================================
   ACTIVAR SEGMENTOS
================================================== */

function activarSegmentos(cantidad) {

    let segmentos = [

        strength1,
        strength2,
        strength3,
        strength4

    ];


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        setTimeout(
            function () {

                segmentos[i].classList.add(
                    "active"
                );

            },
            i * 70
        );

    }

}


/* ==================================================
   RESET FORTALEZA
================================================== */

function resetStrength() {

    let segmentos = [

        strength1,
        strength2,
        strength3,
        strength4

    ];


    for (
        let i = 0;
        i < segmentos.length;
        i++
    ) {

        segmentos[i].classList.remove(
            "active"
        );

    }


    strength.classList.remove(
        "weak",
        "medium",
        "strong",
        "very-strong"
    );


    if (
        traducciones.waiting
    ) {

        strengthText.textContent =
            traducciones.waiting;

    }

}


/* ==================================================
   INICIAR APLICACIÓN
================================================== */

async function iniciarPasswordForge() {

    /*
        Detectamos el idioma antes de
        cargar la traducción.
    */

    let idioma =
        detectarIdioma();


    /*
        Cargamos su JSON.
    */

    await cargarIdioma(
        idioma
    );


    /*
        Dejamos el selector sincronizado.
    */

    language.value =
        idioma;


    actualizarEstadoCopy();

}


/* ==================================================
   START
================================================== */

iniciarPasswordForge();