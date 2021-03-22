"use strict";

app.component("loggedIn", {
    templateUrl: "components/logged-in.html",
    controller: "LoggedInController",
    bindings: {
        user: "<"
    }
});


app.controller("LoggedInController", function ($state, $log, AuthService) {

    $log.debug("LoggedInController()");

    this.$onInit = () => {
        AuthService.istAngemeldet().then(response =>
        {
            this.user = response;
            console.log(this.user);
        })
        };

    this.logout = () => {
        AuthService
            .logout()
            .then(() => {
                $state.go("login");
            });
    };

});
