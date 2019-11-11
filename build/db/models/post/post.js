"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
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
        contentType: Boolean,
        deafult: false,
    },
    postedBy: {
        ref: 'User',
        type: mongoose.Schema.ObjectId,
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
