"use strict";

app.component("document", {
    templateUrl: "components/document.html",
    controller: "DocumentController",
    bindings: {
        document : "<"
    }
});


app.controller("DocumentController", function ($log) {

    $log.debug("DocumentController()");

});
