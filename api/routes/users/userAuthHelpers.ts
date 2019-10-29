import { NextFunction, Response } from 'express';
import expressJwt from 'express-jwt';
import { htttpErrors } from '../../config/constants/htttpStatuses';
import User from '../../db/models/user/user';
import { IUser } from './../../db/models/user/constants';
import * as C from './constants';

export const userById = ((req: C.UserByIdRequest, res: Response, next: NextFunction, id) => {
   User.findById(id).exec((err: Error, user: IUser) => {
      if (err || !user) {
         return res.status(400).json({
            error: C.UserAuthErros.UserDoesNotExists,
         });
      }
      req.profile = user;
      next();
   });
});

export const isUserSignIn = expressJwt({
   secret: process.env.JWT_SECRET,
   useProperty: 'auth',
});

// export const isUserAuthorized = ((req: C.IsUserAuthorizedRequest, res: Response, next: NextFunction) => {
//    if (
//       !(req.profile && req.auth && req.profile._id === req.auth._id)
//    ) {
//       return res.status(403).json({
//          error: htttpErrors.error403,
//       });
//    }
//    next();
// });
