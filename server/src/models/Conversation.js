import mongoose from 'mongoose';
import Message from './Message.js';
import { deleteMessageAttachments } from '../utils/helper-functions/message.helper.js';

const conversationSchema = new mongoose.Schema(
  {
    creator: {
      people: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'People',
      },
      seenAt: Date,
    },
    participant: {
      people: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'People',
      },
      seenAt: Date,
    },
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'People',
    },
    lastMessageDate: {
      type: Date,
      default: new Date(),
    },
  },
  { timestamps: true }
);

conversationSchema.post('findOneAndRemove', async (conversation) => {
  try {
    // Delete all messages associated with the Conversation being deleted
    const messages = await Message.find({ conversation: conversation._id });

    deleteMessageAttachments(messages);

    await Message.deleteMany({
      conversation: conversation._id,
    });
  } catch (err) {
    console.error(err);
  }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
