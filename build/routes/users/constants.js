"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserAuthErros;
(function (UserAuthErros) {
    UserAuthErros["EmailExisits"] = "Email already exists.";
    UserAuthErros["EmailDoesNotExists"] = "Email does not exists.";
    UserAuthErros["DoesntMatch"] = "Password doesn't match email.";
    UserAuthErros["UserDoesNotExists"] = "User doesn't exists.";
    UserAuthErros["UserNoAuthorized"] = "You can't perform this action";
})(UserAuthErros = exports.UserAuthErros || (exports.UserAuthErros = {}));
var UserAuthConfirms;
(function (UserAuthConfirms) {
    UserAuthConfirms["registerSucceed"] = "Reqistered succesfull.";
    UserAuthConfirms["userLogout"] = "You 've been logged out.";
})(UserAuthConfirms = exports.UserAuthConfirms || (exports.UserAuthConfirms = {}));
exports.TokenID = 'token';
