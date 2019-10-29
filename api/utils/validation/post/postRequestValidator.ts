const { check, validationResult } = require('express-validator');
import { NextFunction, Request, Response } from 'express';
import * as PostConstants from './constants';

export const postRequestValidator = [
   check('title')
      .isLength({
         min: PostConstants.Title.MinLength,
      })
      .withMessage(PostConstants.Title.InvalidLengthError)
      .isLength({
         max: PostConstants.Title.MaxLength,
      })
      .withMessage(PostConstants.Title.InvalidLengthError)
   ,
   check('body')
      .isLength({
         min: PostConstants.Body.MinLength,
      })
      .withMessage(PostConstants.Body.InvalidLengthError)
      .isLength({
         max: PostConstants.Body.MaxLength,
      })
      .withMessage(PostConstants.Body.InvalidLengthError),
];

export const checkErrors = (req: Request, res: Response, next: NextFunction) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
   }
   next();
};
