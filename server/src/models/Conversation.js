import mongoose from 'mongoose';
import Message from './Message.js';

const conversationSchema = new mongoose.Schema(
  {
    creatorPeopleId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'People',
    },
    participantPeopleId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'People',
    },
    deletedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'People',
    },
  },
  { timestamps: true }
);

conversationSchema.post('findOneAndRemove', async (conversation) => {
  try {
    // Delete all messages associated with the Conversation being deleted
    await Message.deleteMany({
      conversationId: conversation._id,
    });
  } catch (err) {
    console.error(err);
  }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
