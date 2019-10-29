import express, { Request, Response } from 'express';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import Post from '../../db/models/post';
import { checkErrors, postRequestValidator } from '../../utils/validation/post/postRequestValidator';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
   try {
      const posts = await Post.find();
      res.status(200).json({ posts });
   } catch (err) {
      return res.status(500).json({
         error: htttpErrors.errror500,
      });
   }
});

router.post('/', postRequestValidator, checkErrors, async (req: Request, res: Response) => {

   const post = await new Post(req.body);
   try {
      const result = await post.save();
      res.status(200).json({
         post: result,
      });
   } catch (err) {
      return res.status(500).json({
         error: htttpErrors.errror500,
      });
   }
});

export { router };
