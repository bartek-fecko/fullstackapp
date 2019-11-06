"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Title;
(function (Title) {
    Title["EmptyError"] = "Please give me a title.";
    Title["InvalidLengthError"] = "Title must be between 4 and 100 characters length";
    Title[Title["MaxLength"] = 100] = "MaxLength";
    Title[Title["MinLength"] = 4] = "MinLength";
})(Title = exports.Title || (exports.Title = {}));
var Body;
(function (Body) {
    Body["EmptyError"] = "Please give me a body.";
    Body["InvalidLengthError"] = "Body must be between 10 and 2000 characters length";
    Body[Body["MaxLength"] = 2500] = "MaxLength";
    Body[Body["MinLength"] = 10] = "MinLength";
})(Body = exports.Body || (exports.Body = {}));
