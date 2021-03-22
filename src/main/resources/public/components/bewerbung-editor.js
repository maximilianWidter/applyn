"use strict";

app.component("bewerbungEditor", {
    templateUrl: "components/bewerbung-editor.html",
    controller: "BewerbungEditorController",
    bindings: {}
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "bewerbung-editor",
        params: { bewerbung: null , edit: null},
        component: "bewerbungEditor"
    });
});

app.controller("BewerbungEditorController", function ($scope, $state, $stateParams, $log, Bewerbung, RestService, User, $element, AuthService, $http, Document) {

    $log.debug("BewerbungEditorController()");
/**
    $scope.b_stati = ('Angenommen Ausstehend Abgelehnt').split(' ').map(function(b_status) {
        return {abbrev: b_status};
    });**/
    $scope.b_stati = [
        "Angenommen",
        "Ausstehend",
        "Abgelehnt"
    ];

    this.dateien = [];

    this.$onInit = () => {

        AuthService.istAngemeldet().then(response =>
        {
            this.user = response;
            console.log("helloo i am here ");
            console.log(this.user._links.bewerbungsDokumente.href);
        })
            .then(d => {
                console.log(this.bewerbung);
                $http.get(this.user._links.bewerbungsDokumente.href)
                    .then(dokumente => {
                        console.log(dokumente);
                        console.log("bin in then");
                        this.dokumentename = dokumente.data.bewerbungsDokuments;
                    });

                $http.get(this.bewerbung._links.dokumente.href)
                    .then(dokumente => {
                        console.log("die dokumente" + dokumente);
                        console.log("bin in then");
                        this.bewerbungsdokumente = dokumente.data.bewerbungsDokuments;
                    });
                console.log(this.user);

            });

    };

        console.log($stateParams.bewerbung);

        this.bewerbung = $stateParams.bewerbung;
        this.edit = $stateParams.edit;



    if (this.edit) {
        var firma = this.bewerbung.bewerbung_firmenName;
        var erstDatum = this.bewerbung.bewerbung_erstellungsdatum;
        var von = this.bewerbung.bewerbung_vondatum;
        var bis = this.bewerbung.bewerbung_bisdatum;
        var status = this.bewerbung.bewerbung_status;
        var pos = this.bewerbung.bewerbung_position;
        var firmmail = this.bewerbung.bewerbung_firmenEmail;
        var kotankt = this.bewerbung.bewerbung_kontaktperson;
        var notizen = this.bewerbung.bewerbung_notizen;
        this.erstellungsdatum = this.bewerbung.bewerbung_erstellungsdatum;
        this.lastedit = this.bewerbung.lastedit;


        var docDefinition = {
            content: [
                {text: 'Hier sind die Bewerbungen des Schülers ' + 'dummy', style: 'subheader'},
                '(Es werden nur die wichtigsten Spalten angezeigt)',
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            ['Firma', 'Stelle', 'Status', 'Erstellt am', 'Zuletzt bearbeitet am'],
                            [firma, pos, status, erstDatum, this.lastedit]
                        ]
                    }
                }
            ]
        };

        this.export = () => {
            pdfMake.createPdf(docDefinition).download('BewerbungenListe');
        };

        console.log(this.test);
    }


    this.removeDokument  = (index) =>{
        this.bewerbungsdokumente.splice(index,1);
        this.dokumentelinks = this.bewerbungsdokumente.map(d => d._links.self.href);
        /*$http.patch(this.bewerbung._links.self.href,{
                "dokumente" : this.dokumentelinks,
            }).then(response => {
                console.log(response);
        });*/
    } ;

    var fileInput = $element.find("#fileupload");


    fileInput.on("change", () => {

        let files = fileInput[0].files;
        console.log( "Die Files sind ," , fileInput[0].files);
        console.log(files[0]);
        this.filename = files[0].name;


        if (files instanceof FileList) {
            var promises = [];

            // Für jede Datei ein Promise auf die Beendigung des Lesens erzeugen
            for (let i = 0; i < files.length; i++) {
                promises.push(
                    new Promise(function(resolve, reject) {
                        console.log("bla blaa ");
                        let reader = new FileReader();
                        reader.onload = () => { files[i].content = reader.result; resolve(); };
                        reader.onerror = () => { files[i].error = reader.error; reject(); };
                        reader.readAsDataURL(files[i]);
                    })
                );
            }

            // ng-model erst aktualisieren, wenn alle Dateien gelesen wurden
            Promise.all(promises)
                .finally(() => {
                    console.log("hier in files:", files);
                    let viewValue = [];
                    let viewName = [];

                    for(let i = 0; i < files.length; i++)  {
                        let f = files[i];
                        console.log(f);
                        viewValue.push(f.content || f.error);
                        viewName.push(f.name || 'No name found!');
                    }


                    this.data = viewValue;
                    for(let i = 0; i < viewValue.length; i++ ) {

                        let document = new Document();
                        $log.debug("DocumentUploadController.speichern()", document);
                        document.bewerbungsDokument_name = viewName[i];
                        document.bewerbungsDokument_datei = viewValue[i];
                        RestService
                            .speichern(document)
                            .then(response => {
                                console.log(response._links.self.href);
                                this.dateien.push(response._links.self.href);

                                this.filename = '';
                                this.data = '';
                            });
                    }
                    console.log("Das sind die Data sachen : " + this.data);
                });

        } else {
            this.data = undefined;
        }
    });




    this.speichern = () => {
        $log.debug("BewerbungEditorController.speichern()", this.bewerbung);


        let bewerbung = new Bewerbung();
        $log.debug("BewerbungEditor.speichern()", bewerbung);

        bewerbung.bewerbung_firmenName = this.bewerbung.bewerbung_firmenName;
        bewerbung.bewerbung_erstellungsdatum = this.bewerbung.bewerbung_erstellungsdatum;
        bewerbung.bewerbung_vondatum = this.bewerbung.bewerbung_vondatum;
        bewerbung.bewerbung_bisdatum = this.bewerbung.bewerbung_bisdatum;
        bewerbung.bewerbung_status = this.bewerbung.bewerbung_status;
        bewerbung.bewerbung_position = this.bewerbung.bewerbung_position;
        bewerbung.bewerbung_firmenEmail = this.bewerbung.bewerbung_firmenEmail;
        bewerbung.bewerbung_kontaktperson = this.bewerbung.bewerbung_kontaktperson;
        bewerbung.bewerbung_notizen = this.bewerbung.bewerbung_notizen;


        console.log("Fehler 412 : "+ this.dateien);


        if (!this.edit){
            console.log(this.edit);

            RestService
                .speichern(bewerbung)
                .then(bewerbung => {
                    this.dateien.push(this.bewerbung.datei);
                    console.log(this.dateien);
                    $log.debug("BewerbungEditorController.speichern() OK", bewerbung);
                    console.log("Beim bearbeiten passiert das:"+ this.dateien);
                    $http.patch(bewerbung._links.self.href,{
                        "dokumente" : this.dateien,
                    }).then(response => {
                        console.log(response);
                    });

                    $state.go("bewerbung-liste");
                });
        } else {
            console.log("Objekt izzz daaa bruda");
            RestService
                .speichern(this.bewerbung)
                .then(bewerbung => {
                    console.log("Status: "+this.bewerbung.bewerbung_status);

                    this.erstellungsdatum = this.bewerbung.bewerbung_erstellungsdatum;
                    this.lastedit = this.bewerbung.lastedit;
                    this.dateien = this.dateien.concat(this.bewerbung.datei || []);
                    this.dateien= this.dateien.concat(this.bewerbungsdokumente.map(d => d._links.self.href) || []);
                    $log.debug("BewerbungEditorController.speichern() OK", bewerbung);
                        console.log("Beim bearbeiten passiert das:"+ this.dateien);
                    $http.patch(bewerbung._links.self.href, {
                        "dokumente": this.dateien,
                    }).then(response => {
                        console.log(response);
                    });

                    $state.go("bewerbung-liste");
                });
        }
    };


    this.loeschen = () => {
        $log.debug("BewerbungEditorController.löschen()", this.bewerbung);


        let bewerbung = new Bewerbung();


        $log.debug("BewerbungEditor.loeschen()", bewerbung);

            RestService
                .loeschen(this.bewerbung)
                .then(bewerbung => {
                    console.log("Bewerbung Gelöscht!");

                    $state.go("bewerbung-liste");
                });
    };
});

