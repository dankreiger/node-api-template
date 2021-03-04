import config from '../../config';
import jwt from 'jsonwebtoken';
import * as Auth from './types';
import { User } from '../../resources/user/user.model';

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup: Auth.Middleware = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send({ message: 'Email and password required' });
      return;
    }
    const user = await User.create({ email, password });
    const token = newToken(user);
    // await for unit test - todo: find better way
    await res.status(201).send({ token });
    return;
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: JSON.stringify(err) });
    return;
  }
};

export const signin: Auth.Middleware = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).send({ message: 'Email and password required' });
      return;
    }
    const user = await User.findOne({ email }).exec();
    if (!user) {
      res.status(401).send({ message: 'User does not exist' });
      return;
    }
    const match = await user.checkPassword(password);
    if (!match) {
      res.status(401).send({ message: 'Invalid password' });
      return;
    }
    const token = newToken(user);
    // await for unit test - todo: find better way
    await res.status(201).send({ token });
    return;
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: JSON.stringify(err) });
    return;
  }
};

export const protect: Auth.MiddlewareWithNext = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    res.status(401).send({ message: 'Not authorized' });
    return;
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id).select('-password').exec();
    if (!user) {
      res.status(401).send({ message: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({ message: 'Not authorized' });
    return;
  }
};
