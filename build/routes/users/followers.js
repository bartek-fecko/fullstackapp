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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../../db/models/user/user"));
const userAuthHelpers_1 = require("./userAuthHelpers");
require('dotenv').config();
const router = express_1.default.Router();
exports.router = router;
const setFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const followId = req.body.followId;
        yield user_1.default.findByIdAndUpdate(userId, {
            $push: {
                following: followId,
            },
        });
        next();
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
});
const setFollower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const followId = req.body.followId;
        const userId = req.body.userId;
        const result = yield user_1.default.findByIdAndUpdate(followId, {
            $push: {
                followers: userId,
            },
        }, { new: true })
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec();
        const followerResult = Object.assign({}, result._doc);
        const { photo, salt, passwordHash } = followerResult, rest = __rest(followerResult, ["photo", "salt", "passwordHash"]);
        return res.status(Object.assign({}, rest));
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
});
const deleteFollowing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const unFollowId = req.body.unFollowId;
        yield user_1.default.findByIdAndUpdate(userId, {
            $pull: {
                following: unFollowId,
            },
        });
        next();
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
});
const deleteFollower = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unFollowId = req.body.unFollowId;
        const userId = req.body.userId;
        const result = yield user_1.default.findByIdAndUpdate(unFollowId, {
            $pull: {
                followers: userId,
            },
        }, { new: true })
            .populate('following', '_id name')
            .populate('followers', '_id name')
            .exec();
        const followerResult = Object.assign({}, result._doc);
        const { photo, salt, passwordHash } = followerResult, rest = __rest(followerResult, ["photo", "salt", "passwordHash"]);
        return res.status(200).json(Object.assign({}, rest));
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
});
router.put('/user/follow', userAuthHelpers_1.isUserSignIn, setFollowing, setFollower);
router.put('/user/unfollow', userAuthHelpers_1.isUserSignIn, deleteFollowing, deleteFollower);
