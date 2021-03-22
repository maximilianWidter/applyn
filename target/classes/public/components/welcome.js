"use strict";

app.component("welcome", {
    template: "<h3>Willkommen, Sie sind angemeldet</h3>",
    controller: "WelcomeController"
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "welcome",
        url: "/welcome",
        component: "welcome"
    });
});

app.controller("WelcomeController", function($timeout, $state, $log) {

    $log.debug("WelcomeController()");

    $timeout(2000)
        .then(() => {
            $state.go("logged-in");
        });

});
