import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxLength: 250,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: 'People',
      required: true,
    },
    conversation: {
      type: mongoose.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
