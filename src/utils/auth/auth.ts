import config from '../../config';
import jwt from 'jsonwebtoken';
import * as Auth from './types';

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
  return;
};

export const signin: Auth.Middleware = async (req, res) => {
  return;
};

export const protect: Auth.MiddlewareWithNext = async (req, res, next) => {
  next();
};
