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
const express_jwt_1 = __importDefault(require("express-jwt"));
const htttpStatuses_1 = require("../../config/constants/htttpStatuses");
const user_1 = __importDefault(require("../../db/models/user/user"));
const C = __importStar(require("./constants"));
exports.userById = ((req, res, next, id) => {
    user_1.default.findById(id).exec((err, user) => {
        if (err) {
            return res.status(500).json({
                error: htttpStatuses_1.htttpErrors.error500,
            });
        }
        if (!user) {
            return res.status(400).json({
                error: C.UserAuthErros.UserDoesNotExists,
            });
        }
        user.passwordHash = null;
        req.profile = user;
        next();
    });
});
exports.isUserSignIn = express_jwt_1.default({
    secret: process.env.JWT_SECRET,
    useProperty: 'auth',
});
// export const isUserAuthorized = ((req: C.IsUserAuthorizedRequest, res: Response, next: NextFunction) => {
//    if (
//       !(req.profile && req.auth && req.profile._id == req.auth._id)
//    ) {
//       return res.status(403).json({
//          error: htttpErrors.error403,
//       });
//    }
//    next();
// });
