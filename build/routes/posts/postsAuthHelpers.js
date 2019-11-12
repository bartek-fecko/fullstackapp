"use strict";
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
const htttpStatuses_1 = require("../../config/constants/htttpStatuses");
const post_1 = __importDefault(require("../../db/models/post/post"));
const C = __importStar(require("./constants"));
exports.postById = (req, res, next, id) => {
    post_1.default.findById(id)
        .populate('postedBy', '_id name')
        .exec((err, post) => {
        if (err || !post) {
            return res.status(400).json({
                error: C.PostErrors.postNotFound,
            });
        }
        req.post = post._doc;
        next();
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
