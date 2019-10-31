import express, { Request, Response } from 'express';
import fileHandler from 'formidable';
import fs from 'fs';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import Post from '../../db/models/post/post';
import { checkErrors, postRequestValidator } from '../../utils/validation/post/postRequestValidator';
import { protectRoutes } from '../../utils/validation/protectedRoutes';
import { isUserSignIn } from '../users/userAuthHelpers';
import { userById } from './../users/userAuthHelpers';
import * as C from './constants';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
   try {
      const posts = await Post.find().populate('postedBy', '_id name');
      res.status(200).json({ posts });
   } catch (err) {
      return res.status(500).json({
         error: htttpErrors.error500,
      });
   }
});

router.post(
   '/create/:userId',
   // isUserSignIn,
   // postRequestValidator,
   checkErrors,
   async (req: C.PostRequest, res: Response) => {
      const form = new fileHandler.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (err: Error, fields, files) => {
         if (err) {
            return res.status(400).json({
               error: C.PostErrors.fileNotUploaded,
            });
         }
         const post = new Post(fields);
         post.postedBy = req.profile;
         if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type;
         }
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

   });

router.get(
   '/userPosts/:userId',
   // isUserSignIn,
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
   });

router.param('userId', userById);

export { router };
