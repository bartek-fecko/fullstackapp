import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import User from '../../db/models/user';
import { userRequestValidator, checkErrors } from '../../utils/validation/user/userAuthValidator';
import * as C from './constants';
require('dotenv').config();

const router = express.Router();

export interface UserAuthRequest extends Request {
   body: {
      _id?: string;
      name?: string;
      email?: string;
      password?: string;
   };
   authenticate?: (authenticate: string) => boolean;
}

router.post('/signup', userRequestValidator, checkErrors, async (req: UserAuthRequest, res: Response) => {
   const isUserInDatabase = await User.find({ email: req.body.email });

   if (isUserInDatabase && isUserInDatabase.length) {
      return res.status(403).json({
         error: C.UserAuthErros.EmailExisits,
      });
   }
   const user = await new User(req.body);
   await user.save();
   res.status(200).json({
      message: C.UserAuthConfirms.registerSucceed,
   });
});

router.get('/signin', async (req: UserAuthRequest, res: Response) => {
   const { _id, name, email, password } = req.body;
   try {
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(401).json({
            error: C.UserAuthErros.EmailDoesNotExists,
         });
      }

      if (password && !user.authenticae(password)) {
         return res.status(401).json({
            error: ''
         });
      }

   } catch (err) {
      return res.status(500).json({
         error: htttpErrors.errror500,
      });
   }

});

export { router };
