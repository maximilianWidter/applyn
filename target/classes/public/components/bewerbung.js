"use strict";

app.component("bewerbung", {
    templateUrl: "components/bewerbung.html",
    controller: "BewerbungController",
    bindings: {
        bewerbung: "<"
    }
});


app.controller("BewerbungController", function ($log,$http,$state, $stateParams) {

    this.$onInit = () => {
       console.log( (new Date()).getTimezoneOffset());
        $log.debug("BewerbungController()");
        console.log(this.bewerbung);
        $http.get(this.bewerbung._links.dokumente.href)
            .then(response => {
                console.log(response);
                this.documents = response.data.bewerbungsDokuments;
            });
        console.log(this.user);
    };


    this.details = () => {
        $state.go("bewerbung-editor", { bewerbung: this.bewerbung, edit: "true" });
    };

    this.open = (base64URL) => {

        var win = window.open();

        win.document.write('<html> <head> <title> ' + 'Dokument' + ' </title></head> <body> <iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe> </body></html>');
        win.document.close();

    }
});
