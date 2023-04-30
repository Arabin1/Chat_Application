import mongoose from 'mongoose';
import Conversation from './Conversation.js';

const peopleSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
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
      $or: [{ creatorPeopleId: doc._id }, { participantPeopleId: doc._id }],
    });

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
