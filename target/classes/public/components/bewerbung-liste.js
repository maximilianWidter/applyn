"use strict";

app.component("bewerbungListe", {
    templateUrl: "components/bewerbung-liste.html",
    controller: "BewerbungListeController",
    bindings: {

    }
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "bewerbung-liste",
        url: "/bewerbung-liste",
        component: "bewerbungListe"
    });

});


app.controller("BewerbungListeController", function ($log,$filter, $stateParams, Bewerbung, RestService, AuthService, User, $http, $state) {

    $log.debug("BewerbungListeController()");

    /**
     * Lädt die Seite mit der angegebenen Nummer (oder die erste Seite).
     **/


    this.$onInit = () => {

        AuthService.istAngemeldet().then(response =>
        {
            this.user = response;
            console.log("helloo i am here ");
            if (this.user.admin === true) {
                //window.location.href="http://localhost:8080/#!/admin-list";
                //window.location.replace("http://localhost:8080/#!/admin-list");

                $state.go("admin-list");
                //return Promise.reject('haha');
            }
        })
            .then(b => {
                $http.get(this.user._links.bewerbung.href)
                    .then(bewerbungen => {
                        this.bewerbungen = bewerbungen.data.bewerbungs;

                        console.log("HIER:"+ this.bewerbungen);

                        this.b = this.bewerbungen;
                        this.name = this.user.displayName;


                    })
                    .catch(response => {
                        $log.error("Die Bewerbungen konnten nicht ausgelesen werden!");
                    });
            });
        console.log("Um dieses da:"+ this.bewerbungen);

    };

   this.gibtbewerbung = () =>{


        var rows = [];
        rows.push( ['Firma', 'Stelle', 'Status', 'Erstellt am', 'Zuletzt bearbeitet am']);

        for (let i = 0; i < this.b.length ; i++) {
            this.created = $filter('date')(this.b[i].bewerbung_erstellungsdatum, "yyyy-MM-dd hh:mm:ss");
            this.edited = $filter('date')(this.b[i].lastedit, "yyyy-MM-dd hh:mm:ss");
            rows.push([this.b[i].bewerbung_firmenName, this.b[i].bewerbung_position, this.b[i].bewerbung_status, this.created , this.edited]);
        }




        var dd = {
            content: [
                {text: 'Hier sind die Bewerbungen des Schülers ' + this.name , style: 'subheader'},
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


           pdfMake.createPdf(dd).download('BewerbungenListe_'+this.name);


    };


});
