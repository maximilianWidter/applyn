"use strict";

app.component("login", {
    templateUrl: "components/login.html",
    controller: "LoginController",
    bindings: {

    }
});


app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "login",
        url: "/login",
        component: "login"
    });

    $urlRouterProvider.otherwise("/login");
});


app.controller("LoginController", function($state, $log, AuthService, User) {

    $log.debug("LoginController()");


    this.einloggen = () =>{
        console.log("eingeloggt");
        AuthService
            .login(this.fullname,this.password)
            .then(response => {
                $state.go('bewerbung-liste');
                console.log(response);
            });

    };

    AuthService
        .istAngemeldet()
        .then(() => {
            $log.debug("LoginController() angemeldet");

            $state.go("bewerbung-liste");
        })
        .catch(() => {
            $log.debug("LoginController() nicht angemeldet");
        });


});
