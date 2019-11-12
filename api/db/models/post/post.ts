// tslint:disable: object-literal-sort-keys
import * as mongoose from 'mongoose';
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

export default postModel;
