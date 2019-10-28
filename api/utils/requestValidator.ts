const { check, validationResult } = require('express-validator');
import { NextFunction, Request, Response } from 'express';
import * as PostConstants from '../constants/post';

export const postValidator = [
   check('title')
      .isLength({
         min: PostConstants.title.minLength,
      })
      .withMessage(PostConstants.title.invalidLengthError)
      .isLength({
         max: PostConstants.title.maxLength,
      })
      .withMessage(PostConstants.title.invalidLengthError)
   ,
   check('body')
      .isLength({
         min: PostConstants.body.minLength,
      })
      .withMessage(PostConstants.body.invalidLengthError)
      .isLength({
         max: PostConstants.body.maxLength,
      })
      .withMessage(PostConstants.body.invalidLengthError),
];

export const checkErrors = (req: Request, res: Response, next: NextFunction) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   next();
};
