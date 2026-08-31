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

let securityMessage =
    document.getElementById("securityMessage");

let strengthSegments = [

    document.getElementById("strength1"),

    document.getElementById("strength2"),

    document.getElementById("strength3"),

    document.getElementById("strength4")

];

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
   LOAD LANGUAGE
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

    document.documentElement.setAttribute(
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
        numero % texto.length
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


    /* VALIDATION */

    if (
        !Number.isInteger(
            longitudPassword
        ) ||
        longitudPassword < 4 ||
        longitudPassword > 64
    ) {

        resetPasswordState();


        passwordDisplay.textContent =
            traducciones.lengthError ||
            "Length must be 4–64";


        resetStrength();

        actualizarEstadoCopy();

        return;

    }


    let opciones =
        obtenerOpciones();


    let disponibles =
        construirCaracteresDisponibles(
            opciones
        );


    /* NO SELECTED OPTIONS */

    if (
        disponibles === ""
    ) {

        resetPasswordState();


        passwordDisplay.textContent =
            traducciones.selectOption ||
            "Select at least one option";


        resetStrength();

        actualizarEstadoCopy();

        return;

    }


    /* REQUIRED CHARACTERS */

    let nuevaPassword =
        "";


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


    /* FILL */

    while (
        nuevaPassword.length <
        longitudPassword
    ) {

        nuevaPassword +=
            caracterAleatorio(
                disponibles
            );

    }


    /* SHUFFLE */

    nuevaPassword =
        mezclarPassword(
            nuevaPassword
        );


    /* SAVE */

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

    guardarPreferencias();

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
   SHOW / HIDE PASSWORD
================================================== */

function mostrarOcultarPassword() {

    if (
        passwordActual === ""
    ) {

        let mensaje =
            traducciones.generateFirst ||
            "Generate a password first";


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
   COPY MAIN PASSWORD
================================================== */

async function copiarPassword() {

    if (
        passwordActual === ""
    ) {

        let mensaje =
            traducciones.generateFirst ||
            "Generate a password first";


        passwordDisplay.textContent =
            mensaje;


        mostrarEstado(
            mensaje
        );


        return;

    }


    try {

        await navigator.clipboard.writeText(
            passwordActual
        );


        /*
            The copy button stays as a copy icon.
            No check icon is shown.
        */

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
            900
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
   PASSWORD STRENGTH
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


    let etiquetas = [

        traducciones.veryWeak ||
            "Very weak",

        traducciones.weak ||
            "Weak",

        traducciones.medium ||
            "Medium",

        traducciones.strong ||
            "Strong",

        traducciones.veryStrong ||
            "Very strong"

    ];


    let indice =
        Math.min(
            resultado.score,
            4
        );


    strengthText.textContent =
        etiquetas[indice];


    if (
        resultado.score <= 1
    ) {

        strength.classList.add(
            "weak"
        );

    } else if (
        resultado.score === 2
    ) {

        strength.classList.add(
            "medium"
        );

    } else if (
        resultado.score === 3
    ) {

        strength.classList.add(
            "strong"
        );

    } else {

        strength.classList.add(
            "very-strong"
        );

    }


    activarSegmentos(
        Math.max(
            resultado.score,
            1
        )
    );


    if (
        resultado.tips.length === 0
    ) {

        securityMessage.textContent =
            traducciones.securityGood ||
            "Good length and character variety.";

    } else {

        securityMessage.textContent =
            resultado.tips.join(
                " "
            );

    }

}


/* ==================================================
   UPDATE STRENGTH TEXT
================================================== */

function actualizarTextoFortaleza() {

    if (
        passwordActual === ""
    ) {

        resetStrength();


        securityMessage.textContent =
            traducciones.securityEmpty ||
            "";

    } else {

        actualizarFortaleza();

    }

}


/* ==================================================
   RESET STRENGTH
================================================== */

function resetStrength() {

    for (
        let i = 0;
        i < strengthSegments.length;
        i++
    ) {

        strengthSegments[i]
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
   ACTIVATE STRENGTH SEGMENTS
================================================== */

function activarSegmentos(
    cantidad
) {

    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        setTimeout(
            function () {

                strengthSegments[i]
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


    /*
        Avoid storing the same password
        multiple times consecutively.
    */

    if (
        historial[0] === password
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


/* ==================================================
   UPDATE HISTORY
================================================== */

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

        crearElementoHistorial(
            historial[i]
        );

    }

}


/* ==================================================
   CREATE HISTORY ITEM
================================================== */

function crearElementoHistorial(
    password
) {

    let item =
        document.createElement(
            "div"
        );


    item.className =
        "history-item";


    let passwordText =
        document.createElement(
            "span"
        );


    passwordText.className =
        "history-password";

    passwordText.textContent =
        "•".repeat(
            Math.min(
                password.length,
                24
            )
        );


    passwordText.dataset.password =
        password;


    let eye =
        document.createElement(
            "button"
        );


    eye.type =
        "button";


    eye.className =
        "history-eye";


    eye.setAttribute(
        "aria-label",
        traducciones.showPassword ||
        "Show password"
    );


    eye.setAttribute(
        "title",
        traducciones.showPassword ||
        "Show password"
    );


    eye.innerHTML = `

        <svg viewBox="0 0 24 24" aria-hidden="true">

            <path
                d="
                    M2 12
                    C4.5 7.5 8 5 12 5
                    C16 5 19.5 7.5 22 12
                    C19.5 16.5 16 19 12 19
                    C8 19 4.5 16.5 2 12
                    Z
                "
            ></path>

            <circle
                cx="12"
                cy="12"
                r="3"
            ></circle>

        </svg>

    `;


    eye.onclick =
        function () {

            let visible =
                passwordText.dataset.visible ===
                "true";


            visible =
                !visible;


            passwordText.dataset.visible =
                visible.toString();


            if (
                visible
            ) {

                passwordText.textContent =
                    passwordText.dataset.password;


                eye.setAttribute(
                    "aria-label",
                    traducciones.hidePassword ||
                    "Hide password"
                );


                eye.setAttribute(
                    "title",
                    traducciones.hidePassword ||
                    "Hide password"
                );

            } else {

                passwordText.textContent =
                    "•".repeat(
                        Math.min(
                            password.length,
                            24
                        )
                    );


                eye.setAttribute(
                    "aria-label",
                    traducciones.showPassword ||
                    "Show password"
                );


                eye.setAttribute(
                    "title",
                    traducciones.showPassword ||
                    "Show password"
                );

            }

        };


    let copy =
        document.createElement(
            "button"
        );


    copy.type =
        "button";


    copy.className =
        "history-copy";


    copy.setAttribute(
        "aria-label",
        traducciones.copyPassword ||
        "Copy password"
    );


    copy.setAttribute(
        "title",
        traducciones.copyPassword ||
        "Copy password"
    );


    copy.innerHTML = `

        <svg viewBox="0 0 24 24" aria-hidden="true">

            <rect
                x="8"
                y="8"
                width="10"
                height="10"
                rx="2"
            ></rect>

            <path
                d="
                    M6 16H5
                    A2 2 0 0 1 3 14
                    V5
                    A2 2 0 0 1 5 3
                    H14
                    A2 2 0 0 1 16 5
                    V6
                "
            ></path>

        </svg>

    `;


    copy.onclick =
        function () {

            copiarHistorial(
                password,
                copy
            );

        };


    item.appendChild(
        passwordText
    );


    item.appendChild(
        eye
    );


    item.appendChild(
        copy
    );


    historyList.appendChild(
        item
    );

}


/* ==================================================
   COPY HISTORY PASSWORD
================================================== */

async function copiarHistorial(
    password,
    button
) {

    try {

        await navigator.clipboard.writeText(
            password
        );


        button.classList.add(
            "copied"
        );


        mostrarEstado(
            traducciones.copied ||
            "Password copied"
        );


        setTimeout(
            function () {

                button.classList.remove(
                    "copied"
                );

            },
            900
        );


    } catch (error) {

        console.error(
            "History clipboard error:",
            error
        );


        mostrarEstado(
            traducciones.copyError ||
            "Could not copy password"
        );

    }

}


/* ==================================================
   CLEAR HISTORY
================================================== */

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
   PREFERENCES
================================================== */

function guardarPreferencias() {

    let opciones =
        obtenerOpciones();


    let preferencias = {

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

    };


    localStorage.setItem(

        "passwordForgePreferences",

        JSON.stringify(
            preferencias
        )

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
   SETTINGS EVENTS
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
   INITIALIZATION
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


iniciarPasswordForge();