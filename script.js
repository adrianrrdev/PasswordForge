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

let themeButton =
    document.getElementById("themeButton");

let themeIcon =
    document.getElementById("themeIcon");

let themeColor =
    document.getElementById("themeColor");

let generateButton =
    document.getElementById("generateButton");

let appStatus =
    document.getElementById("appStatus");

let securityMessage =
    document.getElementById("securityMessage");

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

let historyList =
    document.getElementById("historyList");

let historyEmpty =
    document.getElementById("historyEmpty");


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


/*
    Characters that can be confused visually.

    Example:
    0 O
    1 l I
*/

let caracteresAmbiguos =
    "0O1lI";


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

let traducciones = {};

let historial = [];

let temaActual = "light";


/*
    Prevents older password animations from
    overwriting a newer generated password.
*/

let passwordRenderId = 0;


/* ==================================================
   LANGUAGE DETECTION
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

        let valor =
            String(
                idiomasNavegador[i]
            )
            .toLowerCase()
            .replace(
                "_",
                "-"
            );


        let idioma =
            valor.split("-")[0];


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
   LOAD TRANSLATION
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
                "Translation file not found"
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
            "Translation error:",
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
            elementos[i]
            .getAttribute(
                "data-i18n"
            );


        if (
            Object.prototype.hasOwnProperty.call(
                traducciones,
                clave
            )
        ) {

            elementos[i].textContent =
                traducciones[
                    clave
                ];

        }

    }


    actualizarAtributos();

    actualizarTextoFortaleza();

    actualizarHistorial();


    if (
        passwordActual === ""
    ) {

        securityMessage.textContent =
            traducciones.securityEmpty ||
            "";

    }

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
        temaGuardado === "dark" ||
        temaGuardado === "light"
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

        themeIcon.textContent =
            "☀";

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
            "#121212"
        );

    } else {

        themeIcon.textContent =
            "☾";

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

function caracterAleatorio(texto) {

    if (
        texto.length === 0
    ) {

        return "";

    }


    /*
        Rejection sampling reduces modulo bias
        when selecting a random character.
    */

    let limite =
        Math.floor(
            4294967296 /
            texto.length
        ) *
        texto.length;


    let arrayAleatorio =
        new Uint32Array(1);


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
   PASSWORD OPTIONS
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
            ).checked,

        ambiguos:
            document.getElementById(
                "ambiguos"
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


    if (
        !opciones.ambiguos
    ) {

        for (
            let i = 0;
            i < caracteresAmbiguos.length;
            i++
        ) {

            disponibles =
                disponibles.replaceAll(
                    caracteresAmbiguos[i],
                    ""
                );

        }

    }


    return disponibles;

}


/* ==================================================
   REMOVE AMBIGUOUS CHARACTER
================================================== */

function eliminarAmbiguos(texto) {

    let resultado =
        texto;


    for (
        let i = 0;
        i < caracteresAmbiguos.length;
        i++
    ) {

        resultado =
            resultado.replaceAll(
                caracteresAmbiguos[i],
                ""
            );

    }


    return resultado;

}


/* ==================================================
   GENERATE
================================================== */

function generarPassword() {

    let longitudPassword =
        Number(
            longitud.value
        );


    /* =========================
       VALIDATION
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


    let opciones =
        obtenerOpciones();


    let disponibles =
        construirCaracteresDisponibles(
            opciones
        );


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


    /*
        Ensure there is at least one
        character from every selected category.
    */

    let caracteresObligatorios = "";


    if (
        opciones.mayusculas
    ) {

        let fuente =
            opciones.ambiguos
                ? caracteres.mayusculas
                : eliminarAmbiguos(
                    caracteres.mayusculas
                );


        caracteresObligatorios +=
            caracterAleatorio(
                fuente
            );

    }


    if (
        opciones.minusculas
    ) {

        let fuente =
            opciones.ambiguos
                ? caracteres.minusculas
                : eliminarAmbiguos(
                    caracteres.minusculas
                );


        caracteresObligatorios +=
            caracterAleatorio(
                fuente
            );

    }


    if (
        opciones.numeros
    ) {

        let fuente =
            opciones.ambiguos
                ? caracteres.numeros
                : eliminarAmbiguos(
                    caracteres.numeros
                );


        caracteresObligatorios +=
            caracterAleatorio(
                fuente
            );

    }


    if (
        opciones.simbolos
    ) {

        let fuente =
            opciones.ambiguos
                ? caracteres.simbolos
                : eliminarAmbiguos(
                    caracteres.simbolos
                );


        caracteresObligatorios +=
            caracterAleatorio(
                fuente
            );

    }


    /*
        If the selected categories exceed
        the requested length, stop instead
        of producing an invalid password.
    */

    if (
        caracteresObligatorios.length >
        longitudPassword
    ) {

        resetPasswordState();

        passwordDisplay.textContent =
            traducciones.lengthError;

        resetStrength();

        actualizarEstadoCopy();

        return;

    }


    let nuevaPassword =
        caracteresObligatorios;


    while (
        nuevaPassword.length <
        longitudPassword
    ) {

        nuevaPassword +=
            caracterAleatorio(
                disponibles
            );

    }


    nuevaPassword =
        mezclarPassword(
            nuevaPassword
        );


    passwordActual =
        nuevaPassword;


    passwordVisible =
        false;


    guardarEnHistorial(
        passwordActual
    );


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


    actualizarPassword();

    actualizarEstadoCopy();

    actualizarFortaleza();

    actualizarAtributos();

    guardarPreferencias();

}


/* ==================================================
   SHUFFLE
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

        passwordDisplay.textContent =
            traducciones.generateFirst;

        mostrarEstado(
            traducciones.generateFirst
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
            traducciones.copied ||
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
            traducciones.copyError ||
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

            score: 0,

            label:
                "waiting",

            tips: []

        };

    }


    let score = 0;

    let tipos = 0;

    let tips = [];


    /* =========================
       LENGTH
    ========================== */

    if (
        password.length >= 8
    ) {

        score++;

    } else {

        tips.push(
            traducciones.tipLength ||
            "Use at least 8 characters."
        );

    }


    if (
        password.length >= 12
    ) {

        score++;

    } else if (
        password.length >= 8
    ) {

        tips.push(
            traducciones.tipLonger ||
            "Consider using 12 or more characters."
        );

    }


    if (
        password.length >= 16
    ) {

        score++;

    }


    /* =========================
       CHARACTER TYPES
    ========================== */

    if (
        /[A-Z]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipUppercase ||
            "Add uppercase letters."
        );

    }


    if (
        /[a-z]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipLowercase ||
            "Add lowercase letters."
        );

    }


    if (
        /[0-9]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipNumbers ||
            "Add numbers."
        );

    }


    if (
        /[^A-Za-z0-9]/.test(
            password
        )
    ) {

        tipos++;

    } else {

        tips.push(
            traducciones.tipSymbols ||
            "Add symbols."
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


    /* =========================
       REPETITION
    ========================== */

    if (
        /(.)\1{2,}/.test(
            password
        )
    ) {

        score--;

        tips.push(
            traducciones.tipRepetition ||
            "Avoid repeated characters."
        );

    }


    /* =========================
       SEQUENCES
    ========================== */

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
        "fghi",
        "qwer",
        "asdf",
        "zxcv"

    ];


    let passwordMinuscula =
        password.toLowerCase();


    for (
        let i = 0;
        i < secuencias.length;
        i++
    ) {

        if (
            passwordMinuscula.includes(
                secuencias[i]
            )
        ) {

            score--;

            tips.push(
                traducciones.tipSequence ||
                "Avoid obvious sequences."
            );

            break;

        }

    }


    /*
        Clamp to 0–4.
    */

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
            tips.slice(
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
            traducciones.securityGood ||
            "Good character variety and length.";

    } else {

        securityMessage.textContent =
            resultado.tips.join(
                " "
            );

    }

}


/* ==================================================
   STRENGTH TEXT UPDATE
================================================== */

function actualizarTextoFortaleza() {

    if (
        passwordActual !== ""
    ) {

        actualizarFortaleza();

    } else {

        resetStrength();

        securityMessage.textContent =
            traducciones.securityEmpty ||
            "";

    }

}


/* ==================================================
   STRENGTH SEGMENTS
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
   RESET PASSWORD STATE
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
   COPY BUTTON STATE
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
   SESSION HISTORY
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


    /*
        Keep only the latest five
        generated passwords.
    */

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
            "••••••••••••";


        password.title =
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

    historial = [];


    actualizarHistorial();


    mostrarEstado(
        traducciones.historyCleared ||
        "Session history cleared"
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
                opciones.simbolos,

            ambiguos:
                opciones.ambiguos

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
                ),

            ambiguos:
                document.getElementById(
                    "ambiguos"
                )

        };


        let claves = Object.keys(
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


/*
    Alias kept for readability in
    a few interaction messages.
*/

function mostrarEstadoCorto(
    mensaje
) {

    mostrarEstado(
        mensaje
    );

}


/* ==================================================
   SETTINGS LISTENERS
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
        ),

        document.getElementById(
            "ambiguos"
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
   SELF TESTS
================================================== */

/*
    Run manually from DevTools:

    runPasswordForgeTests()

    These are lightweight internal checks,
    not a replacement for a real test suite.
*/

function runPasswordForgeTests() {

    let resultados = [];


    function comprobar(
        nombre,
        condicion
    ) {

        resultados.push({

            test:
                nombre,

            passed:
                Boolean(condicion)

        });

    }


    let password =
        generarPasswordDePrueba(
            20
        );


    comprobar(

        "Password has expected length",

        password.length === 20

    );


    comprobar(

        "Random character belongs to charset",

        caracteres.mayusculas.includes(
            caracterAleatorio(
                caracteres.mayusculas
            )
        )

    );


    let mezclada =
        mezclarPassword(
            "ABCDEFG"
        );


    comprobar(

        "Shuffle preserves length",

        mezclada.length === 7

    );


    comprobar(

        "Strength function returns a valid score",

        calcularFortaleza(
            "Aa12!abcdefgh"
        ).score >= 0 &&
        calcularFortaleza(
            "Aa12!abcdefgh"
        ).score <= 4

    );


    console.table(
        resultados
    );


    return resultados;

}


/* ==================================================
   TEST PASSWORD
================================================== */

function generarPasswordDePrueba(
    longitudPrueba
) {

    let resultado = "";


    for (
        let i = 0;
        i < longitudPrueba;
        i++
    ) {

        resultado +=
            caracterAleatorio(
                caracteres.mayusculas
                +
                caracteres.minusculas
                +
                caracteres.numeros
                +
                caracteres.simbolos
            );

    }


    return resultado;

}


/* ==================================================
   EXPOSE DEVELOPMENT TESTS
================================================== */

window.runPasswordForgeTests =
    runPasswordForgeTests;


/* ==================================================
   INITIALIZE
================================================== */

async function iniciarPasswordForge() {

    cargarPreferencias();


    temaActual =
        detectarTema();


    aplicarTema();


    idiomaActual =
        detectarIdioma();


    await cargarIdioma(
        idiomaActual
    );


    actualizarEstadoCopy();

    actualizarHistorial();

    prepararEventosConfiguracion();

}


/* ==================================================
   START
================================================== */

iniciarPasswordForge();