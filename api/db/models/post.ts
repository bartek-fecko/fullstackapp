import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
   body: {
      required: true,
      type: String,
   },
   title: {
      required: true,
      type: String,
   },
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
