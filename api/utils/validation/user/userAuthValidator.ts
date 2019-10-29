const { check, validationResult } = require('express-validator');
import { NextFunction, Request, Response } from 'express';
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
