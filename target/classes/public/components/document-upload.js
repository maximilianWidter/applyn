"use strict";

app.component("documentUpload", {
    templateUrl: "components/document-upload.html",
    controller: "DocumentUploadController",
    bindings: {

    }
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "document-upload",
        url: "/document-upload",
        component: "documentUpload"
    });

   // $urlRouterProvider.otherwise("/document-upload");
});

app.controller("DocumentUploadController", function ($log,$state, Document, $element, RestService) {

    $log.debug("DocumentUploadController()");


    var fileInput = $element.find("input");


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
                            .then(document => {
                                $log.debug("DocumentUploadController.speichern() OK", document);
                                this.bewerbung_dokumente += document;
                                this.filename = '';
                                this.data = '';
                            });
                    }
                    //$state.go("document-list");
                    console.log("Das sind die Data sachen : " + this.data);
                });

        } else {
            this.data = undefined;
        }
        });
});
