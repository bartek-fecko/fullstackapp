const { check, validationResult } = require('express-validator');
import { NextFunction, Request, Response } from 'express';
import User from '../../../db/models/user/user';
import { UserAuthErros } from '../../../routes/users/constants';
import * as UserConstants from './constants';

export const userRequestValidator = [
   check('name')
      .isLength({
         min: UserConstants.Name.MinLength,
      })
      .withMessage(UserConstants.Name.InvalidLengthError)
      .isLength({
         max: UserConstants.Name.MaxLength,
      })
      .withMessage(UserConstants.Name.InvalidLengthError),

   check('email')
      .isEmail()
      .withMessage(UserConstants.Email.InvalidEmail),

   check('password')
      .isLength({
         min: UserConstants.Password.MinLength,
      })
      .withMessage(UserConstants.Password.InvalidPassword)
      .isLength({
         max: UserConstants.Password.MaxLength,
      })
      .withMessage(UserConstants.Name.InvalidLengthError),
];

export const checkErrors = (req: Request, res: Response, next: NextFunction) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   next();
};

export const isUserInDatabase = async (req: Request, res: Response, next: NextFunction) => {
   const isUser = await User.find({ email: req.body.email });

   if (isUser && isUser.length) {
      return res.status(403).json({
         error: UserAuthErros.EmailExisits,
      });
   }
   next();
};
