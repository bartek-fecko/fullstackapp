import express, { NextFunction, Request, Response } from 'express';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import { IUser } from '../../db/models/user/constants';
import User from '../../db/models/user/user';
import { checkErrors, isUserInDatabase, userRequestValidator } from '../../utils/validation/user/userAuthValidator';
import * as C from './constants';
import randomColor from './randomColor';
import { isUserSignIn, userById } from './userAuthHelpers';
require('dotenv').config();

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
   try {
      const users = await User.find().select('name email updated avatarColor hasPhoto');
      res.status(200).json(users);
   } catch (err) {
      res.status(400).json({
         error: err,
      });
   }
});

router.post('/checkueserindatabase', isUserInDatabase, (req: Request, res: Response) => {
   res.status(200).send(C.UserAuthErros.EmailDoesNotExists);
});

router.post(
   '/signup',
   isUserInDatabase,
   // userRequestValidator,
   // checkErrors,
   async (req: Request, res: Response) => {
      const user = await new User({
         ...req.body,
         avatarColor: randomColor(),
         hasPhoto: false,
      });
      await user.save();
      res.status(200).json({
         message: C.UserAuthConfirms.registerSucceed,
      });
   });

router.post('/signin', async (req: C.IsUserAuthorizedRequest, res: Response) => {
   const { email, password } = req.body;
   try {
      const user: IUser = await User.findOne({ email }) as unknown as IUser;

      if (!user) {
         return res.status(401).json({
            error: C.UserAuthErros.EmailDoesNotExists,
         });
      }

      const { _id, name, passwordHash } = user;

      if (passwordHash && !user.authenticate(password)) {
         return res.status(401).json({
            error: C.UserAuthErros.DoesntMatch,
         });
      }
      const token = jwt.sign({
         _id: user._id,
      }, process.env.JWT_SECRET as any);

      res.cookie(C.TokenID, token, {
         expires: new Date(Number(new Date()) + 24 * 60 * 60 * 1000),
      });

      return res.json({ token, user: { _id, email, name } });

   } catch (err) {
      return res.status(500).json({
         error: htttpErrors.error500,
      });
   }

});

router.get('/logout', async (req: Request, res: Response) => {
   res.clearCookie(C.TokenID);
   return res.json({ message: C.UserAuthConfirms.userLogout });
});

router.get('/:userId', isUserSignIn, (req: C.UserByIdRequest, res: Response) => {
   if (req.profile) {
      const { photo, passwordHash, salt, ...restData } = req.profile;
      return res.status(200).json({ ...restData });
   }
   return res.status(500).json({
      error: htttpErrors.error500,
   });
});

router.delete(
   '/:userId',
   isUserSignIn,
   async (req: C.UserByIdRequest, res: Response) => {
      const user = req.profile;
      const userId = user && user._id;
      try {
         if (user) {
            await User.findByIdAndDelete(userId);
            res.status(200).json({ _id: userId });
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
   (req: C.UserByIdRequest, res: Response, next: NextFunction) => {
      const form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.maxFileSize = 50 * 1024 * 1024;
      form.parse(req, async (err: any, fields: Fields, files: Files) => {
         if (err) {
            return res.status(400).json({
               error: err,
            });
         }
         const user = req.profile;
         try {
            let newUserData = {} as IUser;
            if (!req.profile) {
               throw new Error();
            }

            if (user && files.photo) {
               newUserData.hasPhoto = true;
               newUserData.photo = {
                  contentType: files.photo.type,
                  data: fs.readFileSync(files.photo.path),
               };
            }

            newUserData = {
               ...newUserData,
               ...fields,
               updated: Date.now() as unknown as string,
            };

            const updatedUser: IUser = await User.findByIdAndUpdate(
               req.profile._id, newUserData, { new: true },
            );

            const { photo, passwordHash, salt, ...restData } = updatedUser._doc;
            res.status(200).json({ ...restData });
         } catch (err) {
            return res.status(400).json({
               error: err,
            });
         }
      });
   },
);

router.get(
   '/photo/:userId',
   async (req: C.UserByIdRequest, res: Response, next: NextFunction) => {
      const user = req.profile;

      try {
         if (user && user.photo.data) {
            res.set('Content-Type', user.photo.contentType);
            return res.send(user.photo.data);
         }
      } catch (err) {
         return res.status(400).json({
            error: err,
         });
      }
      next();
   },
);

router.param('userId', userById);

export { router };
