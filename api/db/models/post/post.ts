import * as mongoose from 'mongoose';

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
   postedBy: {
      ref: 'User',
      type: (mongoose.Schema as any).ObjectId,
   },
   title: {
      required: true,
      type: String,
   },
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
