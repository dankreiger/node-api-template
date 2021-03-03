import { Request, Response } from 'express';
import { Document, Model } from 'mongoose';

export namespace Crud {
  type Middleware = (req: Request, res: Response) => Promise<void>;
  export type Action = (model: Model<Document>) => Middleware;
  export enum Type {
    deleteOne = 'deleteOne',
    updateOne = 'updateOne',
    getMany = 'getMany',
    getOne = 'getOne',
    createOne = 'createOne',
  }

  export type Controller = (model: Model<Document>) => Record<Type, Middleware>;
}
