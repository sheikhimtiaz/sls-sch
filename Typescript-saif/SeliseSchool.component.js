"use strict";
exports.__esModule = true;
var SeliseSchool_services_1 = require("./SeliseSchool.services");
var user = 'saif-lesnar';
var val = new SeliseSchool_services_1.SeliseSchoolServices();
val.getUserInfo(user, function (user) {
    console.log('Name: ' + user.fullName);
    console.log('Number of Repo: ' + user.repoCount);
    console.log('User Name: ' + user.login);
    console.log('User Email: ' + user.email);
});
val.getRepoInfo(user, function (repo) {
    var j = 0;
    for (var i in repo) {
        j++;
        console.log('Repo ' + j + ' ' + repo[i].name);
    }
});
