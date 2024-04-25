let utBillett;

function kjopBillett() {
    const enBillett = {
        antall: $("#antall").val(),
        film: $("#film").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    };
    
    let epostGyldig = $("#epost").html = enBillett.epost.split("@");
    let validering = false;
    
    if ((isNaN(enBillett.antall) || enBillett.antall <= 0) || enBillett.antall === null){
        $("#ikkeTall").html("Må skrive noe i antall");
        validering = true;
    } else {
        $("#ikkeTall").html(null);
    }
    
    if (enBillett.film === "feilFilm") {
        $("#feilFilm").html("Må velge en film");
        validering = true;
    } else {
        $("#feilFilm").html(null);
    }

    if (enBillett.fornavn === "") {
        $("#fornavnFeil").html("Må skrive noe i fornavn");
        validering = true;
    } else  if (!isNaN(enBillett.fornavn)) {
        $("#fornavnFeil").html("Vennligst skriv inn et gyldig fornavn");
        validering = true;
    } else {
        $("#fornavnFeil").html("");
    }

    if (enBillett.etternavn === "") {
        $("#etternavnFeil").html("Må skrive noe i etternavn");
        validering = true;
    } else  if (!isNaN(enBillett.etternavn)) {
        $("#etternavnFeil").html("Vennligst skriv inn et gyldig etternavn");
        validering = true;
    } else {
        $("#etternavnFeil").html("");
    }

    if (enBillett.telefonnr === "") {
        $("#telefonnr").html("Må skrive noe i telefonnummer");
        validering = true;
    } else  if (isNaN(enBillett.telefonnr)) {
        $("#telefonnrFeil").html("Vennligst skriv inn et gyldig telefonnummer");
        validering = true;
    } else if (enBillett.telefonnr.length != 8){
        $("#telefonnrFeil").html("Telefonnummer må inneholde 8 tall");
        validering = true;
    } else {
        $("#telefonnrFeil").html("");
    }

    if (enBillett.epost === "") {
        $("#epostFeil").html("Må skrive noe i epost");
        validering = true;
    } else  if (!isNaN(enBillett.epost)) {
        $("#epostFeil").html("Vennligst skriv inn en gyldig epost");
        validering = true;
    } else if (enBillett.epost.length < 6){
        $("#epostFeil").html("Epost er for kort");
        validering = true;
    } else if (epostGyldig.length != 2) {
        $("#epostFeil").html("Epost mangler @");
        validering = true;
    } else {
        $("#epostFeil").html("");
    }

    if (validering === false) {
        $("#antall").val("");
        $("#film").val($("#feilFilm").val());
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    } else {
        return;
    }

    if (enBillett.antall === "" && enBillett.film === "feilFilm" && enBillett.etternavn === "" && enBillett.telefonnr === "" && enBillett.epost === "") {
        return;
    } else {
        $.post("/lagBillett", enBillett, function () {
            hentAlle();
        });
    }
}

function skrivUt(alleBillettene) {
    utBillett =
        "<table class='table table=striped'><tr>"+
        "<th>Film</th>"+
        "<th>Antall</th>"+
        "<th>Fornavn</th>"+
        "<th>Etternavn</th>"+
        "<th>Telefonnummer</th>"+
        "<th>Epost</th>"+
        "</tr>";

    for (let enBillett of alleBillettene) {
        utBillett += "<tr>"+
            "<td>" + enBillett.film + "</td>" +
            "<td>" + enBillett.antall + "</td>" +
            "<td>" + enBillett.fornavn + "</td>" +
            "<td>" + enBillett.etternavn + "</td>" +
            "<td>" + enBillett.telefonnr + "</td>" +
            "<td>" + enBillett.epost + "</td>" +
            "</tr>";
    }
    utBillett += "</table>";
    $("#billetter").html(utBillett);
}

function hentAlle() {
   $.get("/hentAlle", function (data) {
       skrivUt(data);
   });
}

function slettAlleBilletter() {
    $.post("/slettAlle", function () {
        hentAlle();
    });
}