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
   ACTUALIZAR ESTADO DEL BOTÓN COPY
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


    /* =========================
       LONGITUD
    ========================== */

    let longitudPassword =
        Number(longitud.value);


    if (
        longitudPassword < 4 ||
        longitudPassword > 64
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
            "Select at least one option";

        eyeButton.classList.remove(
            "is-visible"
        );

        eyeButton.setAttribute(
            "aria-pressed",
            "false"
        );

        actualizarEstadoCopy();

        return;

    }


    /* =========================
       NUEVA CONTRASEÑA
    ========================== */

    let nuevaPassword = "";


    /* =========================
       GARANTIZAR CATEGORÍAS
    ========================== */

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
       COMPLETAR
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


    /*
        Cada nueva contraseña
        empieza OCULTA.
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


/* ==================================================
   BOTÓN DE OJOS
================================================== */

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
   ESTADO INICIAL
================================================== */

actualizarEstadoCopy();