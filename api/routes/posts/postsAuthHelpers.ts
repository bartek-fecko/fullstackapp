import { NextFunction, Response } from 'express';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import Post from '../../db/models/post/post';
import * as C from './constants';

export const postById = (
   req: C.PostByIdRequest, res: Response, next: NextFunction, id: string,
) => {
   Post.findById(id)
      .populate('postedBy', '_id name')
      .exec((err: Error, post) => {
         if (err || !post) {
            return res.status(400).json({
               error: err,
            });
         }
         req.post = post._doc;
         res.status(200).json({ post });
      });
};

export const isUserAuthorizedForPost = (req: C.IsPostAuthorizedRequest, res: Response, next: NextFunction) => {
   // tslint:disable-next-line: triple-equals
   if (!(req.post && req.auth && req.post.postedBy._id == req.auth._id)) {
      return res.status(403).json({
         error: htttpErrors.error403,
      });
   }
   next();
};
