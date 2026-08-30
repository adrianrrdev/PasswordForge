/* ==================================================
   ELEMENTS
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

let themeButton =
    document.getElementById("themeButton");

let themeColor =
    document.getElementById("themeColor");

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

let securityMessage =
    document.getElementById("securityMessage");

let historyList =
    document.getElementById("historyList");

let historyEmpty =
    document.getElementById("historyEmpty");

let appStatus =
    document.getElementById("appStatus");


/* ==================================================
   CHARACTER SETS
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
   SUPPORTED LANGUAGES
================================================== */

let idiomasSoportados = [

    "en",
    "es",
    "fr",
    "de",
    "it"

];


/* ==================================================
   STATE
================================================== */

let passwordActual = "";

let passwordVisible = false;

let idiomaActual = "en";

let temaActual = "light";

let traducciones = {};

let historial = [];

let passwordRenderId = 0;


/* ==================================================
   LANGUAGE
================================================== */

function detectarIdioma() {

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


    let idiomasNavegador =
        navigator.languages;


    if (
        !Array.isArray(
            idiomasNavegador
        ) ||
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
            String(
                idiomasNavegador[i]
            )
            .toLowerCase()
            .replace(
                "_",
                "-"
            )
            .split("-")[0];


        if (
            idiomasSoportados.includes(
                idioma
            )
        ) {

            return idioma;

        }

    }


    return "en";

}


/* ==================================================
   LOAD LANGUAGE JSON
================================================== */

async function cargarIdioma(
    idioma
) {

    try {

        let respuesta =
            await fetch(
                "./translations/"
                + idioma
                + ".json"
            );


        if (
            !respuesta.ok
        ) {

            throw new Error(
                "Translation file not found."
            );

        }


        traducciones =
            await respuesta.json();


        idiomaActual =
            idioma;


        language.value =
            idioma;


        document.documentElement.lang =
            idioma;


        aplicarTraducciones();


    } catch (error) {

        console.error(
            "Language loading error:",
            error
        );


        if (
            idioma !== "en"
        ) {

            await cargarIdioma(
                "en"
            );

            return;

        }


        mostrarEstado(
            "Could not load translations."
        );

    }

}


/* ==================================================
   APPLY TRANSLATIONS
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
            traducciones[clave]
        ) {

            elementos[i].textContent =
                traducciones[clave];

        }

    }


    actualizarAtributos();

    actualizarTextoFortaleza();

    actualizarHistorial();

}


/* ==================================================
   CHANGE LANGUAGE
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


    localStorage.setItem(
        "passwordForgeLanguage",
        nuevoIdioma
    );


    await cargarIdioma(
        nuevoIdioma
    );

}


/* ==================================================
   THEME
================================================== */

function detectarTema() {

    let temaGuardado =
        localStorage.getItem(
            "passwordForgeTheme"
        );


    if (
        temaGuardado === "light" ||
        temaGuardado === "dark"
    ) {

        return temaGuardado;

    }


    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {

        return "dark";

    }


    return "light";

}


function aplicarTema() {

    document.documentElement
        .setAttribute(
            "data-theme",
            temaActual
        );


    if (
        temaActual === "dark"
    ) {

        themeButton.setAttribute(
            "aria-label",
            traducciones.lightTheme ||
            "Switch to light theme"
        );

        themeButton.setAttribute(
            "title",
            traducciones.lightTheme ||
            "Switch to light theme"
        );


        themeColor.setAttribute(
            "content",
            "#111111"
        );

    } else {

        themeButton.setAttribute(
            "aria-label",
            traducciones.darkTheme ||
            "Switch to dark theme"
        );

        themeButton.setAttribute(
            "title",
            traducciones.darkTheme ||
            "Switch to dark theme"
        );


        themeColor.setAttribute(
            "content",
            "#f6f5f2"
        );

    }

}


function cambiarTema() {

    if (
        temaActual === "light"
    ) {

        temaActual =
            "dark";

    } else {

        temaActual =
            "light";

    }


    localStorage.setItem(
        "passwordForgeTheme",
        temaActual
    );


    aplicarTema();

}


/* ==================================================
   ACCESSIBILITY
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


    aplicarTema();

}


/* ==================================================
   RANDOM CHARACTER
================================================== */

function caracterAleatorio(
    texto
) {

    if (
        texto.length === 0
    ) {

        return "";

    }


    let arrayAleatorio =
        new Uint32Array(1);


    let limite =
        Math.floor(
            4294967296 /
            texto.length
        ) *
        texto.length;


    let numero;


    do {

        crypto.getRandomValues(
            arrayAleatorio
        );


        numero =
            arrayAleatorio[0];

    } while (
        numero >= limite
    );


    return texto[
        numero %
        texto.length
    ];

}


/* ==================================================
   OPTIONS
================================================== */

function obtenerOpciones() {

    return {

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

}


/* ==================================================
   AVAILABLE CHARACTERS
================================================== */

function construirCaracteresDisponibles(
    opciones
) {

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


    return disponibles;

}


/* ==================================================
   GENERATE PASSWORD
================================================== */

function generarPassword() {

    let longitudPassword =
        Number(
            longitud.value
        );


    /* =========================
       VALIDATE LENGTH
    ========================== */

    if (
        !Number.isInteger(
            longitudPassword
        ) ||
        longitudPassword < 4 ||
        longitudPassword > 64
    ) {

        resetPasswordState();


        passwordDisplay.textContent =
            traducciones.lengthError;


        resetStrength();

        actualizarEstadoCopy();

        actualizarAtributos();

        return;

    }


    /* =========================
       OPTIONS
    ========================== */

    let opciones =
        obtenerOpciones();


    let disponibles =
        construirCaracteresDisponibles(
            opciones
        );


    /* =========================
       NO OPTIONS
    ========================== */

    if (
        disponibles.length === 0
    ) {

        resetPasswordState();


        passwordDisplay.textContent =
            traducciones.selectOption;


        resetStrength();

        actualizarEstadoCopy();

        actualizarAtributos();

        return;

    }


    /* =========================
       REQUIRED CHARACTERS
    ========================== */

    let obligatorios =
        "";


    if (
        opciones.mayusculas
    ) {

        obligatorios +=
            caracterAleatorio(
                caracteres.mayusculas
            );

    }


    if (
        opciones.minusculas
    ) {

        obligatorios +=
            caracterAleatorio(
                caracteres.minusculas
            );

    }


    if (
        opciones.numeros
    ) {

        obligatorios +=
            caracterAleatorio(
                caracteres.numeros
            );

    }


    if (
        opciones.simbolos
    ) {

        obligatorios +=
            caracterAleatorio(
                caracteres.simbolos
            );

    }


    /* =========================
       CREATE
    ========================== */

    let nuevaPassword =
        obligatorios;


    while (
        nuevaPassword.length <
        longitudPassword
    ) {

        nuevaPassword +=
            caracterAleatorio(
                disponibles
            );

    }


    /* =========================
       SHUFFLE
    ========================== */

    nuevaPassword =
        mezclarPassword(
            nuevaPassword
        );


    /* =========================
       SAVE
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


    copyButton.classList.remove(
        "copied"
    );


    guardarEnHistorial(
        passwordActual
    );


    actualizarPassword();

    actualizarEstadoCopy();

    actualizarFortaleza();

    actualizarAtributos();

}


/* ==================================================
   SHUFFLE
================================================== */

function mezclarPassword(
    password
) {

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
   PASSWORD DISPLAY
================================================== */

function actualizarPassword() {

    if (
        passwordActual === ""
    ) {

        return;

    }


    let renderId =
        ++passwordRenderId;


    passwordDisplay.style.opacity =
        "0";


    passwordDisplay.style.transform =
        "translateY(2px)";


    setTimeout(
        function () {

            if (
                renderId !==
                passwordRenderId
            ) {

                return;

            }


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
   SHOW / HIDE
================================================== */

function mostrarOcultarPassword() {

    if (
        passwordActual === ""
    ) {

        let mensaje =
            traducciones.generateFirst;


        passwordDisplay.textContent =
            mensaje;


        mostrarEstado(
            mensaje
        );


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
   COPY
================================================== */

async function copiarPassword() {

    if (
        passwordActual === ""
    ) {

        let mensaje =
            traducciones.generateFirst;


        passwordDisplay.textContent =
            mensaje;


        mostrarEstado(
            mensaje
        );


        return;

    }


    try {

        await navigator.clipboard
            .writeText(
                passwordActual
            );


        copyButton.classList.add(
            "copied"
        );


        mostrarEstado(
            traducciones.copied
            ||
            "Password copied"
        );


        setTimeout(
            function () {

                copyButton.classList.remove(
                    "copied"
                );

            },
            1200
        );


    } catch (error) {

        console.error(
            "Clipboard error:",
            error
        );


        mostrarEstado(
            traducciones.copyError
            ||
            "Could not copy password"
        );

    }

}


/* ==================================================
   STRENGTH
================================================== */

function calcularFortaleza(
    password
) {

    if (
        password === ""
    ) {

        return {

            score:
                0,

            tips:
                []

        };

    }


    let score =
        0;


    let tipos =
        0;


    let tips =
        [];


    /* LENGTH */

    if (
        password.length >= 8
    ) {

        score++;

    } else {

        tips.push(
            traducciones.tipLength
        );

    }


    if (
        password.length >= 12
    ) {

        score++;

    } else {

        tips.push(
            traducciones.tipLonger
        );

    }


    if (
        password.length >= 16
    ) {

        score++;

    }


    /* UPPERCASE */

    if (
        /[A-Z]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipUppercase
        );

    }


    /* LOWERCASE */

    if (
        /[a-z]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipLowercase
        );

    }


    /* NUMBERS */

    if (
        /[0-9]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipNumbers
        );

    }


    /* SYMBOLS */

    if (
        /[^A-Za-z0-9]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipSymbols
        );

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


    /* REPEATED CHARACTERS */

    if (
        /(.)\1{2,}/.test(
            password
        )
    ) {

        score--;

        tips.push(
            traducciones.tipRepetition
        );

    }


    /* COMMON SEQUENCES */

    let secuencias = [

        "0123",
        "1234",
        "2345",
        "3456",
        "4567",
        "5678",
        "6789",

        "abcd",
        "bcde",
        "cdef",
        "defg",
        "efgh",

        "qwer",
        "asdf",
        "zxcv"

    ];


    let minuscula =
        password.toLowerCase();


    for (
        let i = 0;
        i < secuencias.length;
        i++
    ) {

        if (
            minuscula.includes(
                secuencias[i]
            )
        ) {

            score--;

            tips.push(
                traducciones.tipSequence
            );

            break;

        }

    }


    score =
        Math.max(
            0,
            Math.min(
                score,
                4
            )
        );


    return {

        score:
            score,

        tips:
            tips
            .filter(
                function (tip) {

                    return Boolean(
                        tip
                    );

                }
            )
            .slice(
                0,
                2
            )

    };

}


/* ==================================================
   UPDATE STRENGTH
================================================== */

function actualizarFortaleza() {

    let resultado =
        calcularFortaleza(
            passwordActual
        );


    resetStrength();


    if (
        resultado.score === 0
    ) {

        strengthText.textContent =
            traducciones.veryWeak;

        strength.classList.add(
            "weak"
        );

        activarSegmentos(1);

    } else if (
        resultado.score === 1
    ) {

        strengthText.textContent =
            traducciones.weak;

        strength.classList.add(
            "weak"
        );

        activarSegmentos(1);

    } else if (
        resultado.score === 2
    ) {

        strengthText.textContent =
            traducciones.medium;

        strength.classList.add(
            "medium"
        );

        activarSegmentos(2);

    } else if (
        resultado.score === 3
    ) {

        strengthText.textContent =
            traducciones.strong;

        strength.classList.add(
            "strong"
        );

        activarSegmentos(3);

    } else {

        strengthText.textContent =
            traducciones.veryStrong;

        strength.classList.add(
            "very-strong"
        );

        activarSegmentos(4);

    }


    if (
        resultado.tips.length === 0
    ) {

        securityMessage.textContent =
            traducciones.securityGood;

    } else {

        securityMessage.textContent =
            resultado.tips.join(
                " "
            );

    }

}


/* ==================================================
   STRENGTH TEXT
================================================== */

function actualizarTextoFortaleza() {

    if (
        passwordActual === ""
    ) {

        resetStrength();


        securityMessage.textContent =
            traducciones.securityEmpty;


    } else {

        actualizarFortaleza();

    }

}


/* ==================================================
   SEGMENTS
================================================== */

function activarSegmentos(
    cantidad
) {

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

                segmentos[i]
                    .classList
                    .add(
                        "active"
                    );

            },
            i * 70
        );

    }

}


/* ==================================================
   RESET STRENGTH
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

        segmentos[i]
            .classList
            .remove(
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
   RESET PASSWORD
================================================== */

function resetPasswordState() {

    passwordActual =
        "";

    passwordVisible =
        false;

    passwordRenderId++;


    eyeButton.classList.remove(
        "is-visible"
    );


    eyeButton.setAttribute(
        "aria-pressed",
        "false"
    );


    copyButton.classList.add(
        "disabled"
    );


    copyButton.classList.remove(
        "copied"
    );

}


/* ==================================================
   COPY STATE
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
   HISTORY
================================================== */

function guardarEnHistorial(
    password
) {

    if (
        password === ""
    ) {

        return;

    }


    historial.unshift(
        password
    );


    historial =
        historial.slice(
            0,
            5
        );


    actualizarHistorial();

}


function actualizarHistorial() {

    while (
        historyList.firstChild
    ) {

        historyList.removeChild(
            historyList.firstChild
        );

    }


    if (
        historial.length === 0
    ) {

        let mensaje =
            historyEmpty.cloneNode(
                true
            );


        mensaje.style.display =
            "block";


        historyList.appendChild(
            mensaje
        );


        return;

    }


    for (
        let i = 0;
        i < historial.length;
        i++
    ) {

        let item =
            document.createElement(
                "div"
            );


        item.className =
            "history-item";


        let password =
            document.createElement(
                "span"
            );


        password.className =
            "history-password";


        password.textContent =
            historial[i];


        let button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "history-copy";


        button.textContent =
            "↗";


        button.setAttribute(
            "aria-label",
            traducciones.copyPassword ||
            "Copy password"
        );


        button.setAttribute(
            "title",
            traducciones.copyPassword ||
            "Copy password"
        );


        button.onclick =
            function () {

                copiarHistorial(
                    historial[i]
                );

            };


        item.appendChild(
            password
        );


        item.appendChild(
            button
        );


        historyList.appendChild(
            item
        );

    }

}


async function copiarHistorial(
    password
) {

    try {

        await navigator.clipboard
            .writeText(
                password
            );


        mostrarEstado(
            traducciones.copied ||
            "Password copied"
        );


    } catch (error) {

        console.error(
            "History copy error:",
            error
        );


        mostrarEstado(
            traducciones.copyError ||
            "Could not copy password"
        );

    }

}


function limpiarHistorial() {

    historial =
        [];


    actualizarHistorial();


    mostrarEstado(
        traducciones.historyCleared ||
        "Session history cleared"
    );

}


/* ==================================================
   STATUS
================================================== */

function mostrarEstado(
    mensaje
) {

    appStatus.textContent =
        mensaje;


    clearTimeout(
        mostrarEstado.timeout
    );


    mostrarEstado.timeout =
        setTimeout(
            function () {

                appStatus.textContent =
                    "";

            },
            2500
        );

}


/* ==================================================
   SETTINGS PERSISTENCE
================================================== */

function guardarPreferencias() {

    let opciones =
        obtenerOpciones();


    localStorage.setItem(

        "passwordForgePreferences",

        JSON.stringify({

            longitud:
                longitud.value,

            mayusculas:
                opciones.mayusculas,

            minusculas:
                opciones.minusculas,

            numeros:
                opciones.numeros,

            simbolos:
                opciones.simbolos

        })

    );

}


function cargarPreferencias() {

    let guardado =
        localStorage.getItem(
            "passwordForgePreferences"
        );


    if (
        !guardado
    ) {

        return;

    }


    try {

        let preferencias =
            JSON.parse(
                guardado
            );


        if (
            preferencias.longitud
        ) {

            longitud.value =
                preferencias.longitud;

        }


        let controles = {

            mayusculas:
                document.getElementById(
                    "mayusculas"
                ),

            minusculas:
                document.getElementById(
                    "minusculas"
                ),

            numeros:
                document.getElementById(
                    "numeros"
                ),

            simbolos:
                document.getElementById(
                    "simbolos"
                )

        };


        let claves =
            Object.keys(
                controles
            );


        for (
            let i = 0;
            i < claves.length;
            i++
        ) {

            let clave =
                claves[i];


            if (
                typeof preferencias[
                    clave
                ] === "boolean"
            ) {

                controles[
                    clave
                ].checked =
                    preferencias[
                        clave
                    ];

            }

        }

    } catch (error) {

        console.error(
            "Preferences error:",
            error
        );

    }

}


/* ==================================================
   CONFIGURATION
================================================== */

function prepararEventosConfiguracion() {

    let controles = [

        longitud,

        document.getElementById(
            "mayusculas"
        ),

        document.getElementById(
            "minusculas"
        ),

        document.getElementById(
            "numeros"
        ),

        document.getElementById(
            "simbolos"
        )

    ];


    for (
        let i = 0;
        i < controles.length;
        i++
    ) {

        controles[i].addEventListener(
            "change",
            function () {

                guardarPreferencias();

            }
        );

    }

}


/* ==================================================
   INITIALIZE
================================================== */

async function iniciarPasswordForge() {

    cargarPreferencias();


    temaActual =
        detectarTema();


    /*
        Theme can be applied immediately
        without waiting for the translation.
    */

    aplicarTema();


    idiomaActual =
        detectarIdioma();


    await cargarIdioma(
        idiomaActual
    );


    actualizarEstadoCopy();

    actualizarHistorial();

}


/* ==================================================
   START
================================================== */

iniciarPasswordForge();