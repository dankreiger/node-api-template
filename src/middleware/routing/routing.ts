import { NextFunction, Request, Response } from 'express';
import { Routing } from './types';

export default (dictionary: Routing.Dict) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Object.entries(dictionary).forEach(([route, handler]) => {
    req.app.use(route, handler);
  });

  return next();
};
