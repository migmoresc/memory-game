// $(".config").hide();
$(document).ready(function () {

    const width = $(".config").width() - 48;
    $(".opciones").css({ "display": "none" });
    $(".opciones").css({ "width": width });
    $(".config").css({ "width": "48px" });
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