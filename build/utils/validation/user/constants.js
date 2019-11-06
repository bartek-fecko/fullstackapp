"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Name;
(function (Name) {
    Name["EmptyError"] = "Please give a name.";
    Name["InvalidLengthError"] = "Name must be between 2 and 50 characters length.";
    Name[Name["MaxLength"] = 50] = "MaxLength";
    Name[Name["MinLength"] = 2] = "MinLength";
})(Name = exports.Name || (exports.Name = {}));
var Email;
(function (Email) {
    Email["InvalidEmail"] = "This email is invalid.";
})(Email = exports.Email || (exports.Email = {}));
var Password;
(function (Password) {
    Password["InvalidPassword"] = "Password must contain at least 4 characters!";
    Password[Password["MaxLength"] = 250] = "MaxLength";
    Password[Password["MinLength"] = 4] = "MinLength";
})(Password = exports.Password || (exports.Password = {}));
