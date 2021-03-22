"use strict";

app.component("adminBewerbungen", {
    templateUrl: "components/admin-bewerbungen.html",
    controller: "AdminBewerbungenController",
    bindings: {}
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "admin-bewerbungen",
        params: { user: null },
        component: "adminBewerbungen"
    });

    // $urlRouterProvider.otherwise("/admin-bewerbungen");
});


app.controller("AdminBewerbungenController", function ($log,$filter, $stateParams, $http) {

    this.$onInit = () => {
        this.user = $stateParams.user;
        this.name = this.user.displayName;
        console.log("USER: ", this.user);

        $http
            .get(this.user._links.bewerbung.href)
            .then(bewerbungen => {
                this.bewerbungen = bewerbungen.data._embedded.bewerbungs;
                console.log("BEWERBUNGEN: ", this.bewerbungen);
            });
    };


    this.getbewerbung = () =>{

        var rows = [];
        rows.push( ['Firma', 'Stelle', 'Status', 'Erstellt am', 'Zuletzt bearbeitet am']);

        for (let i = 0; i < this.bewerbungen.length ; i++) {
            this.created = $filter('date')(this.bewerbungen[i].bewerbung_erstellungsdatum, "yyyy-MM-dd hh:mm:ss");
            this.edited = $filter('date')(this.bewerbungen[i].lastedit, "yyyy-MM-dd hh:mm:ss");
            rows.push([this.bewerbungen[i].bewerbung_firmenName, this.bewerbungen[i].bewerbung_position, this.bewerbungen[i].bewerbung_status, this.created , this.edited]);
        }




        var doc = {
            content: [
                {text: 'Hier sind die Bewerbungen des Schülers ' + this.name , style: 'header'},
                '(Es werden nur die wichtigsten Spalten angezeigt)',
                {
                    style: 'tableExample',
                    table: {
                        widths: [100, 100, 80,100, 100],
                        body: rows,

                    }
                }
            ]
        };


        pdfMake.createPdf(doc).download('BewerbungenListe_'+this.name);


    };

});
