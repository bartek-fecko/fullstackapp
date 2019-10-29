import { expressJwt } from 'express-jwt';
import express, { Request, Response ,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import { IUser } from '../../db/models/user/constants';
import User from '../../db/models/user/user';
import { userRequestValidator, checkErrors } from '../../utils/validation/user/userAuthValidator';
import * as C from './constants';
require('dotenv').config();

const router = express.Router();

router.post('/signup', userRequestValidator, checkErrors, async (req: Request, res: Response) => {
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

router.post('/signin', async (req: C.IsUserAuthorizedRequest, res: Response) => {
   const { email, password } = req.body;
   try {
      const user: IUser = await User.findOne({ email });
      const { _id, name, passwordHash } = user;

      if (!user) {
         return res.status(401).json({
            error: C.UserAuthErros.EmailDoesNotExists,
         });
      }

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

export { router };
