"use strict";
exports.__esModule = true;
var request = require("request");
var User_component_1 = require("./User.component");
var Repos_component_1 = require("./Repos.component");
var SeliseSchoolServices = /** @class */ (function () {
    function SeliseSchoolServices() {
    }
    SeliseSchoolServices.prototype.getUserInfo = function (userName, callBack) {
        var options = {
            headers: {
                'User-Agent': 'request'
            }
        };
        request.get('https://api.github.com/users/' + userName, options, function (error, response, body) {
            var userInfo = new User_component_1.User(JSON.parse(body));
            callBack(userInfo);
        });
    };
    SeliseSchoolServices.prototype.getRepoInfo = function (userName, callBack) {
        var options = {
            headers: {
                'User-Agent': 'request'
            },
            json: true
        };
        request.get('https://api.github.com/users/' + userName + '/repos', options, function (error, response, body) {
            var repoInfo = body.map(function (repo) { return new Repos_component_1.Repos(repo); });
            callBack(repoInfo);
        });
    };
    return SeliseSchoolServices;
}());
exports.SeliseSchoolServices = SeliseSchoolServices;
