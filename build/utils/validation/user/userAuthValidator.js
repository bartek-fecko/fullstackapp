"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { check, validationResult } = require('express-validator');
const user_1 = __importDefault(require("../../../db/models/user/user"));
const constants_1 = require("../../../routes/users/constants");
const UserConstants = __importStar(require("./constants"));
exports.userRequestValidator = [
    check('name')
        .isLength({
        min: UserConstants.Name.MinLength,
    })
        .withMessage(UserConstants.Name.InvalidLengthError)
        .isLength({
        max: UserConstants.Name.MaxLength,
    })
        .withMessage(UserConstants.Name.InvalidLengthError),
    check('email')
        .isEmail()
        .withMessage(UserConstants.Email.InvalidEmail),
    check('password')
        .isLength({
        min: UserConstants.Password.MinLength,
    })
        .withMessage(UserConstants.Password.InvalidPassword)
        .isLength({
        max: UserConstants.Password.MaxLength,
    })
        .withMessage(UserConstants.Name.InvalidLengthError),
];
exports.checkErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.isUserInDatabase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const isUser = yield user_1.default.find({ email: req.body.email });
    if (isUser && isUser.length) {
        return res.status(403).json({
            error: constants_1.UserAuthErros.EmailExisits,
        });
    }
    next();
});
