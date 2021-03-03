import { Router } from 'express';

type Path = '/resources/item' | '/resources/list' | '/resources/user';
export type RoutesDict = Record<Path, Router>;

export interface Dict {
  ROUTERS: RoutesDict;
}
