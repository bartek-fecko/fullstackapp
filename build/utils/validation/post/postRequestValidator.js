"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { check, validationResult } = require('express-validator');
const PostConstants = __importStar(require("./constants"));
exports.postRequestValidator = [
    check('title')
        .isLength({
        min: PostConstants.Title.MinLength,
    })
        .withMessage(PostConstants.Title.InvalidLengthError)
        .isLength({
        max: PostConstants.Title.MaxLength,
    })
        .withMessage(PostConstants.Title.InvalidLengthError),
    check('body')
        .isLength({
        min: PostConstants.Body.MinLength,
    })
        .withMessage(PostConstants.Body.InvalidLengthError)
        .isLength({
        max: PostConstants.Body.MaxLength,
    })
        .withMessage(PostConstants.Body.InvalidLengthError),
];
exports.checkErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
