import { Crud } from './types';

export const deleteOne: Crud.Action = (model) => async (req, res) => {};

export const getOne: Crud.Action = (model) => async (req, res) => {};

export const getMany: Crud.Action = (model) => async (req, res) => {
  res.send('ok');
};

export const createOne: Crud.Action = (model) => async (req, res) => {};

export const updateOne: Crud.Action = (model) => async (req, res) => {};

export const crudControllers: Crud.Controller = (model) => ({
  deleteOne: deleteOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model),
});
