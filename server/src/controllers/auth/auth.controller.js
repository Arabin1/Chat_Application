import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import People from '../../models/People.js';

export const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, Number(process.env.SALT));

    const people = new People({
      ...req.body,
      password: hashedPassword,
      role: 'user',
    });

    const user = await people.save();

    // prepare the user object to prepare token
    const userObject = {
      _id: user._id,
      role: 'user',
    };

    // generate token
    const token = jwt.sign(userObject, process.env.JWT_SECRET_USER, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    const { password, ...other } = user._doc;
    res.status(200).json({
      user: other,
      message: 'Registration successful!',
      access_token: token,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errors: {
        common: {
          msg: 'Unknown error occurred!',
        },
      },
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await People.findOne({ email: req.body.email });

    if (user) {
      const isValidPassword = await bcrypt.compare(req.body.password, user.password);
      if (isValidPassword) {
        const userObject = {
          _id: user._id,
          role: user.role,
        };

        const TOKEN_SECRET =
          user.role === 'admin' ? process.env.JWT_SECRET_ADMIN : process.env.JWT_SECRET_USER;

        // generate token
        const token = jwt.sign(userObject, TOKEN_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        const { password, ...other } = user._doc;

        res.status(200).json({
          user: other,
          message: 'Login successful!',
          access_token: token,
        });
      } else {
        throw createError('Invalid email or password.');
      }
    } else {
      throw createError('Invalid email or password.');
    }
  } catch (e) {
    res.status(400).json({
      errors: {
        common: {
          msg: e.message,
        },
      },
    });
  }
};
