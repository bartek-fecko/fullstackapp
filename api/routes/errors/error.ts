import { Errback, NextFunction, Request, Response } from 'express';
import * as C from './constants';

export function notAuthorizedErrorRoute(err: Errback, req: Request, res: Response, next: NextFunction) {
   if (err.name === 'UnauthorizedError') {
      res.status(401).send({
         error: C.ErrorMessages.notAuthorized,
      });
   }
}
