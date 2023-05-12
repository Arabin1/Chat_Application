import createError from 'http-errors';
import People from '../../models/People.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await People.find({}).select('email firstname lastname image _id role');

    res.status(200).json({
      message: 'Success!',
      users,
    });
  } catch (e) {
    res.status(500).json({
      errors: {
        common: {
          msg: e.message,
        },
      },
    });
  }
};

export const changeUserRole = async (req, res) => {
  try {
    const user = await People.findByIdAndUpdate(
      req.params.id,
      { $set: { role: req.body.role } },
      { new: true }
    );

    if (user) {
      res.status(200).json({
        message: 'Successfully changed user role!',
        user,
      });
    } else {
      throw createError(404, 'Your requested user was not found.');
    }
  } catch (e) {
    res.status(e.status ? e.status : 500).json({
      errors: {
        common: {
          msg: e.message,
        },
      },
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await People.findById(req.params.id);

    if (user) {
      res.status(200).json({
        message: 'Success!',
        user,
      });
    } else {
      throw createError('Your requested user is not in the list.');
    }
  } catch (e) {
    res.status(400).json({
      errors: {
        common: {
          msg: 'Your requested user was not found!',
        },
      },
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await People.findByIdAndRemove(req.params.id);

    if (user) {
      res.status(200).json({
        message: 'The user was successfully deleted.',
        user,
      });
    } else {
      throw createError('Your requested user is not in the list.');
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      errors: {
        common: {
          msg: 'Your requested user is not in the list.',
        },
      },
    });
  }
};
