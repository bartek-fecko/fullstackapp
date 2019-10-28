import express, { Request, Response } from 'express';
import Post from '../../models/post';
import { checkErrors, postValidator } from '../../utils/requestValidator';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
   const posts = Post
      .find()
      .then(() => res.status(200).json({ posts }))
      .catch((err) => console.log(`HANDLING:${err}`));
});

router.post('/', postValidator, checkErrors, (req: Request, res: Response) => {

   const post = new Post(req.body);
   post
      .save()
      .then((result) => {
         res.status(200).json({
            post: result,
         });
      })
      .catch((err) => console.log(`HANDLING:${err}`));
});

export { router };
