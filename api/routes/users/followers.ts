import express, { NextFunction, Request, Response } from 'express';
import User from '../../db/models/user/user';
import { isUserSignIn } from './userAuthHelpers';
require('dotenv').config();

const router = express.Router();

const setFollowing = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.body.userId;
      const followId = req.body.followId;
      await User.findByIdAndUpdate(
         userId,
         {
            $push: {
               following: followId,
            },
         },
      );
      next();
   } catch (err) {
      res.status(400).json({
         error: err,
      });
   }
};

const setFollower = async (req: Request, res: Response) => {
   try {
      const followId = req.body.followId;
      const userId = req.body.userId;
      const result = await User.findByIdAndUpdate(
         followId,
         {
            $push: {
               followers: userId,
            },
         },
         { new: true },
      )
         .populate('following', '_id name')
         .populate('followers', '_id name')

      const followerResult = { ...result._doc };
      const { photo, salt, passwordHash, ...rest } = followerResult;

      return res.status({ ...rest });

   } catch (err) {
      res.status(400).json({
         error: err,
      });
   }
};

const deleteFollowing = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.body.userId;
      const unFollowId = req.body.unFollowId;
      await User.findByIdAndUpdate(
         userId,
         {
            $pull: {
               following: unFollowId,
            },
         },
      );
      next();
   } catch (err) {
      res.status(400).json({
         error: err,
      });
   }
};

const deleteFollower = async (req: Request, res: Response) => {
   try {
      const unFollowId = req.body.unFollowId;
      const userId = req.body.userId;
      const result = await User.findByIdAndUpdate(
         unFollowId,
         {
            $pull: {
               followers: userId,
            },
         },
         { new: true },
      )
         .populate('following', '_id name')
         .populate('followers', '_id name')
         .exec();

      const followerResult = { ...result._doc };
      const { photo, salt, passwordHash, ...rest } = followerResult;

      return res.status(200).json({ ...rest });

   } catch (err) {
      res.status(400).json({
         error: err,
      });
   }
};

router.put(
   '/user/follow',
   isUserSignIn,
   setFollowing,
   setFollower,
);

router.put(
   '/user/unfollow',
   isUserSignIn,
   deleteFollowing,
   deleteFollower,
);

export { router };
