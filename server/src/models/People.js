import mongoose from 'mongoose';
import { unlink } from 'fs';
import Conversation from './Conversation.js';
import { upFolder, userImgFolder } from '../constants/util.constant.js';

const peopleSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
      minLength: 2,
      maxLength: 25,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
      minLength: 2,
      maxLength: 25,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// eslint-disable-next-line func-names
peopleSchema.post('findOneAndRemove', async (doc) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ 'creator.people': doc._id }, { 'participant.people': doc._id }],
    });

    // remove the profile pic
    if (doc.image) {
      unlink(`${upFolder}${userImgFolder}${doc.image}`, (err) => {
        console.log(err);
      });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const conversation of conversations) {
      // eslint-disable-next-line no-await-in-loop
      await Conversation.findByIdAndRemove(conversation._id);
    }
  } catch (err) {
    console.log(err);
  }
});

const People = mongoose.model('People', peopleSchema);

export default People;
