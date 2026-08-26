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


    /* =========================
       VALIDAR LONGITUD
    ========================== */

    if (
        longitudPassword < 4 ||
        longitudPassword > 64 ||
        Number.isNaN(longitudPassword)
    ) {

        passwordActual = "";

        passwordVisible = false;

        passwordDisplay.textContent =
            "Length must be 4–64";

        eyeButton.classList.remove(
            "is-visible"
        );

        eyeButton.setAttribute(
            "aria-pressed",
            "false"
        );

        actualizarEstadoCopy();

        resetStrength();

        return;

    }


    /* =========================
       OPCIONES
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


    if (opciones.mayusculas) {

        disponibles +=
            caracteres.mayusculas;

    }


    if (opciones.minusculas) {

        disponibles +=
            caracteres.minusculas;

    }


    if (opciones.numeros) {

        disponibles +=
            caracteres.numeros;

    }


    if (opciones.simbolos) {

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
            "Select at least one option";

        eyeButton.classList.remove(
            "is-visible"
        );

        eyeButton.setAttribute(
            "aria-pressed",
            "false"
        );

        actualizarEstadoCopy();

        resetStrength();

        return;

    }


    /* =========================
       CREAR PASSWORD
    ========================== */

    let nuevaPassword = "";


    /* =========================
       GARANTIZAR CATEGORÍAS
    ========================== */

    if (opciones.mayusculas) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.mayusculas
            );

    }


    if (opciones.minusculas) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.minusculas
            );

    }


    if (opciones.numeros) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.numeros
            );

    }


    if (opciones.simbolos) {

        nuevaPassword +=
            caracterAleatorio(
                caracteres.simbolos
            );

    }


    /* =========================
       COMPLETAR LONGITUD
    ========================== */

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


    /*
        Cada contraseña nueva
        empieza oculta.
    */

    passwordVisible = false;

    eyeButton.classList.remove(
        "is-visible"
    );

    eyeButton.setAttribute(
        "aria-pressed",
        "false"
    );


    /* =========================
       ACTUALIZAR INTERFAZ
    ========================== */

    actualizarPassword();

    actualizarEstadoCopy();

    actualizarFortaleza();

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
   MOSTRAR / OCULTAR
================================================== */

function actualizarPassword() {

    if (
        passwordActual === ""
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

}


function mostrarOcultarPassword() {

    if (
        passwordActual === ""
    ) {

        passwordDisplay.textContent =
            "Generate a password first";

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

}


/* ==================================================
   COPIAR
================================================== */

function copiarPassword() {

    if (
        passwordActual === ""
    ) {

        passwordDisplay.textContent =
            "Generate a password first";

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

    let longitudPassword =
        password.length;


    /* LONGITUD */

    if (
        longitudPassword >= 8
    ) {

        score += 1;

    }


    if (
        longitudPassword >= 12
    ) {

        score += 1;

    }


    if (
        longitudPassword >= 16
    ) {

        score += 1;

    }


    /* TIPOS DE CARACTERES */

    let tieneMayusculas =
        /[A-Z]/.test(password);

    let tieneMinusculas =
        /[a-z]/.test(password);

    let tieneNumeros =
        /[0-9]/.test(password);

    let tieneSimbolos =
        /[^A-Za-z0-9]/.test(password);


    let variedad = 0;


    if (tieneMayusculas) {
        variedad++;
    }

    if (tieneMinusculas) {
        variedad++;
    }

    if (tieneNumeros) {
        variedad++;
    }

    if (tieneSimbolos) {
        variedad++;
    }


    if (
        variedad >= 2
    ) {

        score += 1;

    }


    if (
        variedad === 4
    ) {

        score += 1;

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


    if (
        score === 0
    ) {

        strengthText.textContent =
            "Very weak";

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
            "Weak";

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
            "Medium";

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
            "Strong";

        strength.classList.add(
            "strong"
        );

        activarSegmentos(3);

        return;

    }


    strengthText.textContent =
        "Very strong";

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

        segmentos[i].classList.add(
            "active"
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


    strengthText.textContent =
        "Waiting";

}


/* ==================================================
   ESTADO INICIAL
================================================== */

actualizarEstadoCopy();

resetStrength();