import { NextFunction, Response } from 'express';
import expressJwt from 'express-jwt';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import User from '../../db/models/user/user';
import { IUser } from './../../db/models/user/constants';
import * as C from './constants';

export const userById = ((
   req: C.UserByIdRequest, res: Response, next: NextFunction, id: string,
) => {
   User.findById(id)
   .populate('following', '_id ')
   .populate('followers', '_id ')
   .exec((err: Error, user: IUser) => {
      if (err) {
         return res.status(500).json({
            error: htttpErrors.error500,
         });
      }
      if (!user) {
         return res.status(400).json({
            error: C.UserAuthErros.UserDoesNotExists,
         });
      }
      req.profile = user._doc;
      next();
   });
});

export const isUserSignIn = expressJwt({
   secret: process.env.JWT_SECRET,
   useProperty: 'auth',
});
