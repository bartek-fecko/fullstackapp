"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const C = __importStar(require("./constants"));
function notAuthorizedErrorRoute(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            error: C.ErrorMessages.notAuthorized,
        });
    }
}
exports.notAuthorizedErrorRoute = notAuthorizedErrorRoute;
