import express, { NextFunction, Request, Response } from 'express';
import fileHandler from 'formidable';
import fs from 'fs';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import Post from '../../db/models/post/post';
import { IUser } from '../../db/models/user/constants';
import { checkErrors, postRequestValidator } from '../../utils/validation/post/postRequestValidator';
import { protectRoutes } from '../../utils/validation/protectedRoutes';
import { isUserSignIn } from '../users/userAuthHelpers';
import { userById } from '../users/userAuthHelpers';
import * as C from './constants';
import { isUserAuthorizedForPost, postById } from './postsAuthHelpers';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
   try {
      const posts = await Post.find()
         .populate('postedBy', '_id name')
         .select('_id title body created hasPhoto');
      res.status(200).json(posts);
   } catch (err) {
      return res.status(500).json({
         error: htttpErrors.error500,
      });
   }
});

router.get('/:postId', isUserSignIn, (req: C.PostByIdRequest, res: Response) => {
   if (req.post) {
      const { photo, ...restData } = req.post;
      return res.status(200).json({ ...restData });
   }
   return res.status(500).json({
      error: htttpErrors.error500,
   });
});

router.post(
   '/create/:userId',
   isUserSignIn,
   // postRequestValidator,
   // checkErrors,
   async (req: C.PostRequest, res: Response) => {
      const form = new fileHandler.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (err: Error, fields, files) => {
         if (err) {
            return res.status(400).json({
               error: err,
            });
         }
         try {
            const post = new Post(fields);
            const { photo: userPhoto, passwordHash, salt, ...restUser } = req.profile as IUser;
            post.postedBy = restUser;
            if (post && files.photo) {
               post.photo.data = fs.readFileSync(files.photo.path);
               post.photo.contentType = files.photo.type;
               post.hasPhoto = true;
            }

            const result = await post.save();
            const { photo: postPhoto, ...restData } = result._doc;
            res.status(200).json({
               post: restData,
            });
         } catch (err) {
            return res.status(500).json({
               error: htttpErrors.error500,
            });
         }
      });
   },
);

router.get(
   '/userPosts/:userId',
   isUserSignIn,
   (req: C.PostRequest, res: Response) => {
      if (req.profile) {
         Post.find({
            postedBy: req.profile._id,
         })
            .populate('postedBy', '_id name')
            .sort('_created')
            .exec((err: Error, posts) => {
               if (err) {
                  return res.status(400).json({
                     error: err,
                  });
               }
               res.json(posts);
            });
      }
   },
);

router.delete(
   '/:userId',
   isUserSignIn,
   isUserAuthorizedForPost,
   async (req: C.IsPostAuthorizedRequest, res: Response) => {
      const post = req.post;
      try {
         if (post && req.profile) {
            await post.remove();
            res.status(200).json({ _id: req.profile.userId });
         }
      } catch (err) {
         return res.status(400).json({
            error: err,
         });
      }
   },
);

router.put(
   '/:userId',
   isUserSignIn,
   isUserAuthorizedForPost,
   async (req: C.IsPostAuthorizedRequest, res: Response) => {
      try {
         if (!req.profile) {
            throw new Error();
         }
         const postUpdated = await Post.findByIdAndUpdate(req.profile._id, {
            ...req.body, updated: Date.now(),
         });
         res.status(200).json({ postUpdated });
      } catch (err) {
         return res.status(400).json({
            error: err,
         });
      }
   },
);

router.get(
   '/photo/:postId',
   async (req: C.IsPostAuthorizedRequest, res: Response, next: NextFunction) => {
      const post = req.post;

      try {
         if (post && post.photo.data) {
            res.set('Content-Type', post.photo.contentType);
            return res.send(post.photo.data);
         }
      } catch (err) {
         return res.status(400).json({
            error: err,
         });
      }
      next();
   },
);

router.param('postId', postById);

router.param('userId', userById);

export { router };
