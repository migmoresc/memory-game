// $(".config").hide();
let animales_facil = ["caballo", "cerdo", "gato", "gorrion", "paloma", "perro", "tortuga"];
let animales_normal = ["buho-1", "buho-2", "buho-3", "buho-4", "buho-5", "buho-6", "buho-7"];
let famosos_facil = ["mila", "sarah"];
let famosos_normal = ["amy", "isla", "mila", "sarah"];
let plantas_facil = ["adelfa", "albahaca", "aloe", "diente", "helecho", "leon", "margarita"];
let vehiculos_facil = ["avion", "barco", "coche", "moto", "tren"];
let posiciones, turno, imagen_id_anterior, victoria, click;

let bloque_carta = function (num, ancho, alto) {
    return `
    <div class="carta" style='width:${ancho};height:${alto}'>
        <div class="flip-card-inner">
            <div class="flip-card-front"></div>
            <div class="flip-card-back">
                <img
                src="assets/img/animales/caballo.jpg"
                alt=""
                class="img-carta"
                id="c-${num}"
                />
            </div>
        </div>
    </div>
`
}

$(document).ready(function () {

    $(".rueda").click(function () {
        if ($(".opciones").css("width") == "0px") {
            $(".config").toggleClass("ancho50");
            $(".opciones").toggleClass("anchoOpciones").animate({ width: "toggle" }, 1000);
        } else {
            $(".opciones").animate({ width: "toggle" }, 1000, function () {
                $(".config").toggleClass("ancho50");
                $(".opciones").toggleClass("anchoOpciones");
            })
        }
    })

    $(".tablero,h1").click(() => {
        if ($(".opciones").css("display") != "none") {
            $(".rueda").click();
        }
    })

    $("#normal").click(function () {
        let tematica = $("input[name=tematica]:checked").val();
        if (tematica == "plantas" || tematica == "vehiculos") {
            alert("Solo está disponible esta dificultad con los animales y famosos.");
            $("#facil").click();
        }
    });

    $("#plantas").click(function () {
        $("#facil").click();
    });

    $("#vehiculos").click(function () {
        $("#facil").click();
    });

    $("#iniciar").click(function () {
        let tematica = $("input[name=tematica]:checked").val();
        let dificultad = $("input[name=dificultad]:checked").val()

        $(".tablero").html("");
        let cartas = "";
        posiciones = [];

        if (dificultad == "facil") {
            for (let x = 1; x < 17; x++) {
                cartas += bloque_carta(x, "156px", "156px");
                posiciones.push(x);
            }
            $(".tablero").css({ "grid-template-columns": "repeat(4,1fr)" });
        } else {
            for (let x = 1; x < 37; x++) {
                cartas += bloque_carta(x, "100px", "100px");
                posiciones.push(x);
            }
            $(".tablero").css({ "grid-template-columns": "repeat(6,1fr)" });
        }

        $(".tablero").html(cartas);

        //esta variable va a ir decreciendo cuando se acierten las parejas
        victoria = posiciones.length;

        colocarImagenes(dificultad, tematica);

        $(".rueda").click();

        ponerEventoClickEnCartas();

        //esta variable controla que no se pueda pulsar una carta hasta que no se hayan dado la vuelta si se ha fallado
        click = true;

        turno = 0;
        imagen_id_anterior = 0;
        $(".victoria").css("display", "none");
    });
});

function colocarImagenes(dificultad, tematica) {

    let imagenes;
    eval(`imagenes = ${tematica}_${dificultad};`);

    let imagen, pos1, pos2, index;
    do {
        imagen = imagenes[Math.floor(Math.random() * imagenes.length)];

        pos1 = posiciones[Math.floor(Math.random() * posiciones.length)];

        index = posiciones.indexOf(pos1);
        posiciones.splice(index, 1);
        pos2 = posiciones[Math.floor(Math.random() * posiciones.length)];

        index = posiciones.indexOf(pos2);
        posiciones.splice(index, 1);

        $(`#c-${pos1}`).attr("src", `assets/img/${tematica}/${imagen}.jpg`);
        $(`#c-${pos2}`).attr("src", `assets/img/${tematica}/${imagen}.jpg`);
    } while (posiciones.length != 0)
}

function ponerEventoClickEnCartas() {
    $(".carta").click(function () {
        if (click == true) {
            $(this).children().first().css("transform", "rotateY(180deg)");

            turno += 1;
            if ((turno % 2) == 1) {
                imagen_id_anterior = $(this).children().first().children().last().children().filter("img").attr("id");
            } else {
                click = false;
                let imagen_anterior = $(`#${imagen_id_anterior}`).attr("src");
                let imagen_actual = $(this).children().first().children().last().children().filter("img").attr("src");

                if (imagen_anterior != imagen_actual) {
                    setTimeout(() => {
                        $(this).children().first().css("transform", "rotateY(0deg)");
                        $(`#${imagen_id_anterior}`).parent().parent().css("transform", "rotateY(0deg)");
                    }, 750);
                } else {
                    victoria -= 2;
                }
                setTimeout(() => { click = true; }, 750);
                if (victoria == 0) {
                    $(".victoria").css("display", "block");
                    $(".h1victoria").html(`Has ganado en ${turno / 2} turnos`);
                }
            }
        }
    })
}