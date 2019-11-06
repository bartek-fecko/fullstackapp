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
const express_1 = __importDefault(require("express"));
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
        const users = yield user_1.default.find();
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
    const user = yield new user_1.default(Object.assign(Object.assign({}, req.body), { avatarColor: randomColor_1.default() }));
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
router.get('/:userId', userAuthHelpers_1.isUserSignIn, (req, res) => res.json(req.profile));
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
router.put('/:userId', userAuthHelpers_1.isUserSignIn, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.profile) {
            throw new Error();
        }
        const updatedUser = yield user_1.default.findByIdAndUpdate(req.profile._id, Object.assign(Object.assign({}, req.body), { updated: Date.now() }), { new: true });
        res.status(200).json({ updatedUser });
    }
    catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
}));
router.param('userId', userAuthHelpers_1.userById);
