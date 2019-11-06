"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const htttpStatuses_1 = require("../../config/constants/htttpStatuses");
const post_1 = __importDefault(require("../../db/models/post/post"));
exports.postById = (req, res, next, id) => {
    post_1.default.find()
        .populate('postedBy', '_id name')
        .exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: err,
            });
        }
        req.post = post;
        res.status(200).json({ post });
    });
};
exports.isUserAuthorizedForPost = (req, res, next) => {
    // tslint:disable-next-line: triple-equals
    if (!(req.post && req.auth && req.post.postedBy._id == req.auth._id)) {
        return res.status(403).json({
            error: htttpStatuses_1.htttpErrors.error403,
        });
    }
    next();
};
