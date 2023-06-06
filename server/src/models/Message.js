import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
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
    text: {
      type: String,
      maxLength: 250,
    },
    attachments: [
      {
        type: String,
      },
    ],
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
