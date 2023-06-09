// $(".config").hide();
$(document).ready(function () {

    $(".opciones").css({ "display": "none" });
    const width = $(".config").width() - 48;
    $(".opciones").css({ "width": width });

    $(".rueda").click(() => {
        $(".opciones").animate({ width: "toggle" }, 1000)
    });

    $(".tablero,h1").click(() => {
        console.log("main", $(".opciones").width())
        if ($(".opciones").css("display") != "none") {
            $(".rueda").click();
        }
    })

});