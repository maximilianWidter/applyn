"use strict";

app.factory("User", function () {

    function User(template, modifier) {

        // Properties und ihre Defaultwerte
        let properties = {};

        Object.assign(this, properties, template, modifier);

        Object.keys(properties).forEach(k => Object.defineProperty(this, k, {writable: false}));

        // Liefert eine neue Instanz dieses Objekts mit den angegebenen Änderungen
        this.variante = modifier => new User(this, modifier);

        // Liefert Vor- und Familiennamen als einzigen String

    }

    // Relativer Pfad im REST-API, unter dem diese Entities zu finden sind
    User.path = "users";

    return User;
});
