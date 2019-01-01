"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(response) {
        this.login = response.login;
        this.fullName = response.name;
        this.repoCount = response.public_repos;
        this.email = response.email;
    }
    return User;
}());
exports.User = User;
