import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const authorizationMiddleware = (panel) => async (req, res, next) => {
  const { authorization } = req.headers;
  const JWT_SECRET = panel === 'admin' ? process.env.JWT_SECRET_ADMIN : process.env.JWT_SECRET_USER;

  try {
    const token = authorization.replace('Bearer ', '');
    req.user = await jwt.verify(token, JWT_SECRET);
    req.user._id = new mongoose.Types.ObjectId(req.user._id);
    next();
  } catch (e) {
    res.status(401).json({
      errors: {
        common: {
          msg: 'Unauthenticated!',
        },
      },
    });
  }
};

export default authorizationMiddleware;
