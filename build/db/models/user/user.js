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
const uuidV1 = require('uuid/v1');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
    avatarColor: {
        type: String,
    },
    joined: {
        default: Date.now(),
        type: Date,
    },
    email: {
        required: true,
        trim: true,
        type: String,
    },
    isUpdated: Date,
    name: {
        required: true,
        trim: true,
        type: String,
    },
    passwordHash: {
        required: true,
        trim: true,
        type: String,
    },
    photo: {
        contentType: String,
        data: Buffer,
    },
    hasPhoto: {
        contentType: Boolean,
        deafult: false,
    },
    updated: {
        type: Date,
    },
    userDescription: {
        type: String,
    },
    salt: String,
    following: [{
            type: ObjectId,
            ref: 'User',
        }],
    followers: [{
            type: ObjectId,
            ref: 'User',
        }],
});
userSchema.virtual('password')
    .set(function (password) {
    this.tempPassword = password;
    this.salt = uuidV1();
    this.passwordHash = this.encryptPassword(password);
})
    .get(function () {
    return this.tempPassword;
});
userSchema.methods = {
    encryptPassword(password) {
        if (!password) {
            return '';
        }
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }
        catch (err) {
            return -1;
        }
    },
    authenticate(text) {
        return this.encryptPassword(text) === this.passwordHash;
    },
};
const userModel = mongoose.model('User', userSchema);
exports.default = userModel;
