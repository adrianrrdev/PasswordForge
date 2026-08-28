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

let language =
    document.getElementById("language");


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
   ESTADO
================================================== */

let passwordActual = "";

let passwordVisible = false;

let idiomaActual = "en";


/* ==================================================
   TRADUCCIONES
================================================== */

let traducciones = {

    en: {

        eyebrow:
            "PROJECT Z · TOOL #001",

        title:
            "Password Forge",

        subtitle:
            "Create strong and secure passwords in seconds.",

        passwordLabel:
            "Password",

        strengthLabel:
            "Password strength",

        lengthLabel:
            "Length",

        characterSetLabel:
            "Character Set",

        uppercase:
            "Uppercase",

        lowercase:
            "Lowercase",

        numbers:
            "Numbers",

        symbols:
            "Symbols",

        generate:
            "Generate password",

        footer:
            "Built with HTML & CSS · ProyectoZ",

        waiting:
            "Waiting",

        veryWeak:
            "Very weak",

        weak:
            "Weak",

        medium:
            "Medium",

        strong:
            "Strong",

        veryStrong:
            "Very strong",

        generateFirst:
            "Generate a password first",

        lengthError:
            "Length must be 4–64",

        selectOption:
            "Select at least one option",

        showPassword:
            "Show password",

        hidePassword:
            "Hide password",

        copyPassword:
            "Copy password"

    },


    es: {

        eyebrow:
            "PROJECT Z · HERRAMIENTA #001",

        title:
            "Password Forge",

        subtitle:
            "Crea contraseñas seguras y resistentes en segundos.",

        passwordLabel:
            "Contraseña",

        strengthLabel:
            "Seguridad de la contraseña",

        lengthLabel:
            "Longitud",

        characterSetLabel:
            "Conjunto de caracteres",

        uppercase:
            "Mayúsculas",

        lowercase:
            "Minúsculas",

        numbers:
            "Números",

        symbols:
            "Símbolos",

        generate:
            "Generar contraseña",

        footer:
            "Hecho con HTML y CSS · ProyectoZ",

        waiting:
            "Esperando",

        veryWeak:
            "Muy débil",

        weak:
            "Débil",

        medium:
            "Media",

        strong:
            "Fuerte",

        veryStrong:
            "Muy fuerte",

        generateFirst:
            "Genera una contraseña primero",

        lengthError:
            "La longitud debe ser de 4 a 64",

        selectOption:
            "Selecciona al menos una opción",

        showPassword:
            "Mostrar contraseña",

        hidePassword:
            "Ocultar contraseña",

        copyPassword:
            "Copiar contraseña"

    }

};


/* ==================================================
   DETECTAR IDIOMA
================================================== */

function detectarIdioma() {

    let idiomaGuardado =
        localStorage.getItem(
            "passwordForgeLanguage"
        );


    if (
        idiomaGuardado === "es" ||
        idiomaGuardado === "en"
    ) {

        return idiomaGuardado;

    }


    let idiomasNavegador =
        navigator.languages || [
            navigator.language
        ];


    for (
        let i = 0;
        i < idiomasNavegador.length;
        i++
    ) {

        let idioma =
            idiomasNavegador[i]
            .toLowerCase()
            .split("-")[0];


        if (
            idioma === "es" ||
            idioma === "en"
        ) {

            return idioma;

        }

    }


    return "en";

}


/* ==================================================
   CAMBIAR IDIOMA
================================================== */

function cambiarIdioma() {

    idiomaActual =
        language.value;


    localStorage.setItem(
        "passwordForgeLanguage",
        idiomaActual
    );


    aplicarIdioma();

}


/* ==================================================
   APLICAR IDIOMA
================================================== */

function aplicarIdioma() {

    let textos =
        traducciones[
            idiomaActual
        ];


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
            textos[clave]
        ) {

            elementos[i].textContent =
                textos[clave];

        }

    }


    document.documentElement.lang =
        idiomaActual;


    actualizarTextosDinamicos();


    actualizarAtributos();

}


/* ==================================================
   TEXTOS DINÁMICOS
================================================== */

function actualizarTextosDinamicos() {

    let textos =
        traducciones[
            idiomaActual
        ];


    if (
        passwordActual === ""
    ) {

        strengthText.textContent =
            textos.waiting;

        return;

    }


    actualizarFortaleza();

}


/* ==================================================
   ATRIBUTOS
================================================== */

function actualizarAtributos() {

    let textos =
        traducciones[
            idiomaActual
        ];


    if (
        passwordVisible
    ) {

        eyeButton.setAttribute(
            "aria-label",
            textos.hidePassword
        );

        eyeButton.setAttribute(
            "title",
            textos.hidePassword
        );

    } else {

        eyeButton.setAttribute(
            "aria-label",
            textos.showPassword
        );

        eyeButton.setAttribute(
            "title",
            textos.showPassword
        );

    }


    copyButton.setAttribute(
        "aria-label",
        textos.copyPassword
    );

    copyButton.setAttribute(
        "title",
        textos.copyPassword
    );


    longitud.setAttribute(
        "aria-label",
        textos.lengthLabel
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
        Number(longitud.value);


    /* VALIDACIÓN */

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
            traducciones[
                idiomaActual
            ].lengthError;


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


    /* OPCIONES */

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


    /* CARACTERES DISPONIBLES */

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


    /* NINGUNA OPCIÓN */

    if (
        disponibles === ""
    ) {

        passwordActual = "";

        passwordVisible = false;


        passwordDisplay.textContent =
            traducciones[
                idiomaActual
            ].selectOption;


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


    /* PASSWORD */

    let nuevaPassword = "";


    /* GARANTIZAR CATEGORÍAS */

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


    /* COMPLETAR */

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


    /* MEZCLAR */

    nuevaPassword =
        mezclarPassword(
            nuevaPassword
        );


    /* GUARDAR */

    passwordActual =
        nuevaPassword;


    /*
        Cada nueva contraseña
        comienza oculta.
    */

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
            traducciones[
                idiomaActual
            ].generateFirst;

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
   COPIAR PASSWORD
================================================== */

function copiarPassword() {

    if (
        passwordActual === ""
    ) {

        passwordDisplay.textContent =
            traducciones[
                idiomaActual
            ].generateFirst;

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


    /* TIPOS */

    let tipos = 0;


    if (
        /[A-Z]/.test(password)
    ) {

        tipos++;

    }


    if (
        /[a-z]/.test(password)
    ) {

        tipos++;

    }


    if (
        /[0-9]/.test(password)
    ) {

        tipos++;

    }


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


    if (
        score > 4
    ) {

        score = 4;

    }


    return score;

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


    let textos =
        traducciones[
            idiomaActual
        ];


    if (
        score === 0
    ) {

        strengthText.textContent =
            textos.veryWeak;

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
            textos.weak;

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
            textos.medium;

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
            textos.strong;

        strength.classList.add(
            "strong"
        );

        activarSegmentos(3);

        return;

    }


    strengthText.textContent =
        textos.veryStrong;


    strength.classList.add(
        "very-strong"
    );


    activarSegmentos(4);

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


    strengthText.textContent =
        traducciones[
            idiomaActual
        ].waiting;

}


/* ==================================================
   INICIAR IDIOMA
================================================== */

idiomaActual =
    detectarIdioma();


language.value =
    idiomaActual;


aplicarIdioma();


actualizarEstadoCopy();