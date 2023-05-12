import { unlink } from 'fs';
import createError from 'http-errors';
import People from '../../models/People.js';
import { upFolder, userImgFolder } from '../../constants/util.constant.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await People.find({ role: 'user' }).select('-password -__v');

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

export const updateProfile = async (req, res) => {
  try {
    let user = await People.findById(req.user._id).select('-__v -password');

    if (user) {
      if (req.file) {
        if (user.image) {
          unlink(`${upFolder}${userImgFolder}${user.image}`, (err) => {
            console.log(err);
          });
        }

        user.image = req.file.filename;
      }

      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.email = req.body.email;
      user.role = req.user.role;

      user = await user.save();

      return res.status(200).json({
        message: 'Your profile was updated successfully!',
        user,
      });
    }
    throw createError(404, 'The user was not found.');
  } catch (e) {
    return res.status(e.status ? e.status : 500).json({
      errors: {
        common: {
          msg: e.message,
        },
      },
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    let user = await People.findById(req.user._id);

    if (user) {
      user.password = req.body.password;

      user = await user.save();

      const { password, __v, ...other } = user._doc;

      return res.status(200).json({
        message: 'Your password was updated successfully!',
        user: other,
      });
    }
    throw createError(404, 'The user was not found.');
  } catch (e) {
    return res.status(e.status ? e.status : 500).json({
      errors: {
        common: {
          msg: e.message,
        },
      },
    });
  }
};

export const removeProfilePic = async (req, res) => {
  try {
    let user = await People.findById(req.user._id).select('-__v -password');

    if (user) {
      if (user.image) {
        unlink(`${upFolder}${userImgFolder}${user.image}`, async (err) => {
          if (!err) {
            user.image = null;
            user = await user.save();
            res.status(200).json({
              message: 'Your profile picture was successfully removed.',
              user,
            });
          } else {
            throw createError(500, 'An unknown error occurred!');
          }
        });
      } else {
        throw createError(404, 'No profile picture was found for the requested user.');
      }
    } else {
      throw createError(404, 'The requested user was not found.');
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
