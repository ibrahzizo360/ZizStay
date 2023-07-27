import jwt from 'jsonwebtoken';
import { createError } from './errorMiddleware.js';


export const authenticateUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return next(createError(401, 'Authorization header missing or invalid!'));
  }

  const token = authorizationHeader.split(' ')[1];
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(createError(403, 'Token is not valid!'));
  }
};


export const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(createError(403, 'You are not authorized as an admin!'));
  }
  next();
};


export const verifyUser = (req, res, next) => {
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return next(createError(403, 'You are not authorized to access this resource!'));
  }
  next();
};
