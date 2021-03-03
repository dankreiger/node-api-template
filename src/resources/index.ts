import itemRouter from './item/item.router';
import listRouter from './list/list.router';
import * as Resources from './types';
import userRouter from './user/user.router';

export const RESOURCES: Resources.Dict = {
  ROUTERS: {
    '/resources/item': itemRouter,
    '/resources/list': listRouter,
    '/resources/user': userRouter,
  },
};
