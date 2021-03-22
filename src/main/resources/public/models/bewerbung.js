"use strict";

app.factory("Bewerbung", function () {

    function Bewerbung(template, modifier) {

        // Properties und ihre Defaultwerte
        let properties = {};

        Object.assign(this, properties, template, modifier);

        Object.keys(properties).forEach(k => Object.defineProperty(this, k, {writable: false}));

        // Liefert eine neue Instanz dieses Objekts mit den angegebenen Änderungen
        this.variante = modifier => new Bewerbung(this, modifier);
    }

    // Relativer Pfad im REST-API, unter dem diese Entities zu finden sind
    Bewerbung.path = "bewerbungs";

    return Bewerbung;
});
