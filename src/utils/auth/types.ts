import { NextFunction } from 'express';

export type Middleware = (req: Request, res: Response) => Promise<void>;
export type MiddlewareWithNext = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export enum Type {
  deleteOne = 'deleteOne',
  updateOne = 'updateOne',
  getMany = 'getMany',
  getOne = 'getOne',
  createOne = 'createOne',
}
