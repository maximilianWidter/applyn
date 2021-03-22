"use strict";

app.factory("Document", function () {

    function Document(template, modifier) {

        // Properties und ihre Defaultwerte
        let properties = {};

        Object.assign(this, properties, template, modifier);

        Object.keys(properties).forEach(k => Object.defineProperty(this, k, {writable: false}));

        // Liefert eine neue Instanz dieses Objekts mit den angegebenen Änderungen
        this.variante = modifier => new Document(this, modifier);
    }

    // Relativer Pfad im REST-API, unter dem diese Entities zu finden sind
    Document.path = "bewerbungsDokuments";

    return Document;
});
