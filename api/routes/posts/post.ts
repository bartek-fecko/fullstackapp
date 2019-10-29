import express, { Request, Response } from 'express';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import Post from '../../db/models/post/post';
import { checkErrors, postRequestValidator } from '../../utils/validation/post/postRequestValidator';
import { protectRoutes } from '../../utils/validation/protectedRoutes';
import { isUserSignIn } from '../users/userAuthHelpers';

const router = express.Router();

router.get('/', protectRoutes, async (req: Request, res: Response) => {
   try {
      const posts = await Post.find();
      res.status(200).json({ posts });
   } catch (err) {
      return res.status(500).json({
         error: htttpErrors.error500,
      });
   }
});

router.post(
   '/create',
   isUserSignIn,
   postRequestValidator,
   checkErrors,
   async (req: Request, res: Response) => {

      const post = await new Post(req.body);
      try {
         const result = await post.save();
         res.status(200).json({
            post: result,
         });
      } catch (err) {
         return res.status(500).json({
            error: htttpErrors.error500,
         });
      }
   });

// router.param('userId', userById);
export { router };
