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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formidable_1 = __importDefault(require("formidable"));
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const htttpStatuses_1 = require("../../config/constants/htttpStatuses");
const user_1 = __importDefault(require("../../db/models/user/user"));
const userAuthValidator_1 = require("../../utils/validation/user/userAuthValidator");
const C = __importStar(require("./constants"));
const randomColor_1 = __importDefault(require("./randomColor"));
const userAuthHelpers_1 = require("./userAuthHelpers");
require('dotenv').config();
const router = express_1.default.Router();
exports.router = router;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().select('name email updated avatarColor');
        res.status(200).json(users);
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}));
router.post('/checkueserindatabase', userAuthValidator_1.isUserInDatabase, (req, res) => {
    res.status(200).send(C.UserAuthErros.EmailDoesNotExists);
});
router.post('/signup', userAuthValidator_1.isUserInDatabase, 
// userRequestValidator,
// checkErrors,
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield new user_1.default(Object.assign(Object.assign({}, req.body), { avatarColor: randomColor_1.default(), hasPhoto: false }));
    yield user.save();
    res.status(200).json({
        message: C.UserAuthConfirms.registerSucceed,
    });
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                error: C.UserAuthErros.EmailDoesNotExists,
            });
        }
        const { _id, name, passwordHash } = user;
        if (passwordHash && !user.authenticate(password)) {
            return res.status(401).json({
                error: C.UserAuthErros.DoesntMatch,
            });
        }
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
        }, process.env.JWT_SECRET);
        res.cookie(C.TokenID, token, {
            expires: new Date(Number(new Date()) + 24 * 60 * 60 * 1000),
        });
        return res.json({ token, user: { _id, email, name } });
    }
    catch (err) {
        return res.status(500).json({
            error: htttpStatuses_1.htttpErrors.error500,
        });
    }
}));
router.get('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie(C.TokenID);
    return res.json({ message: C.UserAuthConfirms.userLogout });
}));
router.get('/:userId', userAuthHelpers_1.isUserSignIn, (req, res) => {
    if (req.profile) {
        const _a = req.profile, { photo, passwordHash, salt } = _a, restData = __rest(_a, ["photo", "passwordHash", "salt"]);
        return res.status(200).json(Object.assign({}, restData));
    }
    return res.status(500).json({
        error: htttpStatuses_1.htttpErrors.error500,
    });
});
router.delete('/:userId', userAuthHelpers_1.isUserSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.profile;
    const userId = user && user._id;
    try {
        if (user) {
            yield user.remove();
            res.status(200).json({ _id: userId });
        }
    }
    catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
}));
router.put('/:userId', userAuthHelpers_1.isUserSignIn, (req, res, next) => {
    const form = new formidable_1.default.IncomingForm();
    form.keepExtensions = true;
    form.maxFileSize = 50 * 1024 * 1024;
    form.parse(req, (err, fields, files) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({
                error: err,
            });
        }
        const user = req.profile;
        try {
            let newUserData = {};
            if (!req.profile) {
                throw new Error();
            }
            if (user && files.photo) {
                newUserData.hasPhoto = true;
                newUserData.photo = {
                    contentType: files.photo.type,
                    data: fs_1.default.readFileSync(files.photo.path),
                };
            }
            newUserData = Object.assign(Object.assign(Object.assign({}, newUserData), fields), { updated: Date.now() });
            const updatedUser = yield user_1.default.findByIdAndUpdate(req.profile._id, newUserData, { new: true });
            const _a = updatedUser._doc, { photo, passwordHash, salt } = _a, restData = __rest(_a, ["photo", "passwordHash", "salt"]);
            res.status(200).json(Object.assign({}, restData));
        }
        catch (err) {
            return res.status(400).json({
                error: err,
            });
        }
    }));
});
router.get('/photo/:userId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.profile;
    try {
        if (user && user.photo.data) {
            res.set('Content-Type', user.photo.contentType);
            return res.send(user.photo.data);
        }
    }
    catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
    next();
}));
router.param('userId', userAuthHelpers_1.userById);
