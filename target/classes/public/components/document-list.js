"use strict";

app.component("documentList", {
    templateUrl: "components/document-list.html",
    controller: "DocumentListController",
    bindings: {

    }
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "document-list",
        url: "/document-list",
        component: "documentList"
    });

    // $urlRouterProvider.otherwise("/document-upload");
});

app.controller("DocumentListController", function ($log, Document, RestService, AuthService, User, $http) {

    $log.debug("DocumentListController()");


    this.fetch = () => {
        AuthService.istAngemeldet().then(response =>
        {
            this.user = response;
            console.log(this.user);
        })
            .then(b => {
                $http.get(this.user._links.bewerbungsDokumente.href)
                    .then(response => {
                        console.log(response);
                        this.documents = response.data.bewerbungsDokuments;
                    });
                console.log(this.user);
            });

    };

this.$onInit = () => {
    this.fetch();
};

    this.open = (base64URL,title) => {

        var win = window.open();

        win.document.write('<html> <head> <title> ' + title + ' </title></head> <body> <iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe> </body></html>');
        win.document.close();

    }

});
