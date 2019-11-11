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
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const htttpStatuses_1 = require("../../config/constants/htttpStatuses");
const post_1 = __importDefault(require("../../db/models/post/post"));
const userAuthHelpers_1 = require("../users/userAuthHelpers");
const userAuthHelpers_2 = require("./../users/userAuthHelpers");
const postsAuthHelpers_1 = require("./postsAuthHelpers");
const router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_1.default.find().populate('postedBy', '_id name');
        res.status(200).json({ posts });
    }
    catch (err) {
        return res.status(500).json({
            error: htttpStatuses_1.htttpErrors.error500,
        });
    }
}));
router.post('/create/:userId', userAuthHelpers_1.isUserSignIn, 
// postRequestValidator,
// checkErrors,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const form = new formidable_1.default.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        try {
            const post = new post_1.default(fields);
            post.postedBy = req.profile;
            if (post && files.photo) {
                post.photo.data = fs_1.default.readFileSync(files.photo.path);
                post.photo.contentType = files.photo.type;
            }
            const result = yield post.save();
            const _a = result._doc, { photo } = _a, restData = __rest(_a, ["photo"]);
            res.status(200).json({
                post: restData,
            });
        }
        catch (err) {
            return res.status(500).json({
                error: htttpStatuses_1.htttpErrors.error500,
            });
        }
    }));
}));
router.get('/userPosts/:userId', userAuthHelpers_1.isUserSignIn, (req, res) => {
    if (req.profile) {
        post_1.default.find({
            postedBy: req.profile._id,
        })
            .populate('postedBy', '_id name')
            .sort('_created')
            .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                });
            }
            res.json(posts);
        });
    }
});
router.delete('/:userId', userAuthHelpers_1.isUserSignIn, postsAuthHelpers_1.isUserAuthorizedForPost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.post;
    try {
        if (post && req.profile) {
            yield post.remove();
            res.status(200).json({ _id: req.profile.userId });
        }
    }
    catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
}));
router.put('/:userId', userAuthHelpers_1.isUserSignIn, postsAuthHelpers_1.isUserAuthorizedForPost, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.profile) {
            throw new Error();
        }
        const postUpdated = yield post_1.default.findByIdAndUpdate(req.profile._id, Object.assign(Object.assign({}, req.body), { updated: Date.now() }));
        res.status(200).json({ postUpdated });
    }
    catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
}));
router.get('/photo/:postId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.profile;
    try {
        if (post && post.photo.data) {
            res.set('Content-Type', post.photo.contentType);
            return res.send(post.photo.data);
        }
    }
    catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
    next();
}));
router.param('postId', postsAuthHelpers_1.postById);
router.param('userId', userAuthHelpers_2.userById);
