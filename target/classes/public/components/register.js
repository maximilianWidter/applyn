"use strict";

app.component("register", {
    templateUrl: "components/register.html",
    controller: "RegisterController",
    bindings: {

    }
});

app.config(function ($stateProvider) {
    $stateProvider.state({
        name: "register",
        url: "/register",
        component: "register"
    });
});

app.controller("RegisterController", function ($log, User, RestService) {

    $log.debug("RegisterController()");

    this.adduser = () =>{
        var user = new User();

        $log.debug("RegisterController.speichern()", user);

        user.displayName = this.fullname;
        user.username = this.fullname;
        user.password = this.password;

        RestService
            .speichern(user)
            .then(user => {
                $log.debug("RegisterController.speichern() OK", user);
                console.log("passwort = " + this.password);
                this.fullname = '';
                this.password = '';
                this.password2 = '';

            });

        console.log("das ist in der datenbank"+ user.password);
    };


});





