import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import { IUser } from '../../db/models/user/constants';
import User from '../../db/models/user/user';
import { checkErrors, isUserInDatabase, userRequestValidator } from '../../utils/validation/user/userAuthValidator';
import * as C from './constants';
import { isUserSignIn, userById } from './userAuthHelpers';
require('dotenv').config();

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
   try {
      const users = await User.find();
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
   userRequestValidator,
   checkErrors,
   async (req: Request, res: Response) => {
      const user = await new User(req.body);
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
      }, process.env.JWT_SECRET);

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

router.get('/:userId', isUserSignIn, (req: C.UserByIdRequest, res: Response) => res.json(req.profile));

router.delete(
   '/:userId',
   isUserSignIn,
   async (req: C.UserByIdRequest, res: Response) => {
      const user = req.profile;
      const userId = user && user._id;
      try {
         if (user) {
            await user.remove();
            res.status(200).json({ _id: userId });
         }
      } catch (err) {
         return res.status(400).json({
            error: err,
         });
      }
   });

router.put(
   '/:userId',
   isUserSignIn,
   async (req: C.UserByIdRequest, res: Response) => {
      try {
         if (!req.profile) {
            throw new Error();
         }
         const userUpdated = await User.findByIdAndUpdate(req.profile._id, {
            ...req.body, updated: Date.now(),
         });
         res.status(200).json({ userUpdated });
      } catch (err) {
         return res.status(400).json({
            error: err,
         });
      }
   },
);

router.param('userId', userById);

export { router };
