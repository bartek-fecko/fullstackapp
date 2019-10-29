import express, { Errback, Request, Response } from 'express';
import * as C from './constants';

const router = express.Router();

router.get('/', async (err: Errback, req: Request, res: Response) => {
   if (err.name === 'UnauthorizedError') {
      res.status(401).send({
         erorr: C.ErrorMessages.notAuthorized,
      });
   }
});

export { router };
