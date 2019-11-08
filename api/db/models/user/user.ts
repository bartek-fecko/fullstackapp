// tslint:disable: object-literal-sort-keys
import * as mongoose from 'mongoose';
const uuidV1 = require('uuid/v1');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
   avatarColor: {
      type: String,
   },
   created: {
      deafult: Date.now(),
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
});

userSchema.virtual('password')
   .set(function(password: string) {
      this.tempPassword = password;
      this.salt = uuidV1();
      this.passwordHash = this.encryptPassword(password);
   })
   .get(function() {
      return this.tempPassword;
   });

userSchema.methods = {
   encryptPassword(password: string) {
      if (!password) {
         return '';
      }
      try {
         return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
      } catch (err) {
         return -1;
      }
   },
   authenticate(text: string) {
      return this.encryptPassword(text) === this.passwordHash;
   },
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
