import { Crud } from './types';

export const getOne: Crud.Action = (model) => async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const document = await model
      .findOne({ _id: id, createdBy: userId })
      .lean()
      .exec();
    if (!document) {
      return res.status(404).end();
    }

    res.status(200).json({ data: document });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode).end();
  }
};

export const getMany: Crud.Action = (model) => async (req, res) => {
  try {
    const userId = req.user._id;

    const document = await model.find({ createdBy: userId }).lean().exec();
    res.status(200).json({ data: document });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode).end();
  }
};

export const createOne: Crud.Action = (model) => async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id;
    const document = await model.create({ name, createdBy: userId });
    res.status(201).json({ data: document });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode);
    res.end();
  }
};

export const updateOne: Crud.Action = (model) => async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const update = req.body;

    const document = await model.findOneAndUpdate(
      { _id: id, createdBy: userId },
      update,
      { new: true }
    );
    if (!document) {
      return res.status(400).end();
    }
    res.status(200).json({ data: document });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode).end();
  }
};

export const deleteOne: Crud.Action = (model) => async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const document = await model
      .findByIdAndDelete({
        _id: id,
        createdBy: userId,
      })
      .exec();
    if (!document) {
      return res.status(400).end();
    }

    res.status(200).json({ data: document });
  } catch (err) {
    res.status(err.statusCode).end();
  }
};

export const crudControllers: Crud.Controller = (model) => ({
  getOne: getOne(model),
  getMany: getMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
});
