import * as mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
   salt: String,
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
