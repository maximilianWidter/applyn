"use strict";

app.component("adminList", {
    templateUrl: "components/admin-list.html",
    controller: "AdminListController",
    bindings: {}
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state({
        name: "admin-list",
        url: "/admin-list",
        component: "adminList"
    });

});

app.controller("AdminListController", function ($log, $http, $state, $timeout,$window) {

    $log.debug("AdminListController()");

    this.isDataAvailable = false;

    this.$onInit = () => {
        console.log("Bin drinnne im innit");

        $http.get('http://localhost:8080/api/users').
            then(response => {
                console.log(response);
                this.users = response.data._embedded.users;
                console.log(this.users);
            });
    };

    this.details = (user) => {
        $state.go("admin-bewerbungen", { user: user });
    };

});
