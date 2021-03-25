"use strict";

app.component("bewerbungTipps", {
    templateUrl: "components/bewerbung-tipps.html",
    controller: "BewerbungTippsController",
    bindings: {}
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "bewerbung-tipps",
        params: { bewerbung: null , edit: null},
        component: "bewerbungTipps"
    });
});

app.controller("BewerbungTippsController", function ($log) {

    $log.debug("BewerbungTippsController()");

});
