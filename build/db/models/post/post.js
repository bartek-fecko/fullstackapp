"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: object-literal-sort-keys
const mongoose = __importStar(require("mongoose"));
const { ObjectId } = mongoose.Schema;
const postSchema = new mongoose.Schema({
    body: {
        required: true,
        type: String,
    },
    created: {
        default: Date.now(),
        type: Date,
    },
    photo: {
        contentType: String,
        data: Buffer,
    },
    hasPhoto: {
        type: Boolean,
        deafult: false,
        required: true,
    },
    postedBy: {
        ref: 'User',
        type: ObjectId,
    },
    updated: {
        type: Date,
    },
    title: {
        required: true,
        type: String,
    },
});
const postModel = mongoose.model('Post', postSchema);
exports.default = postModel;
