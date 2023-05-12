import createError from 'http-errors';
import Message from '../../models/Message.js';
import Conversation from '../../models/Conversation.js';

export const storeMessage = async (req, res) => {
  try {
    let message = new Message({
      text: req.body.text,
      sender: req.user._id,
      conversation: req.body.conversationId,
    });

    message = await message.save();

    res.status(200).json({
      msg: 'The message was stored successfully!',
      message,
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

export const getConversationMessages = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw createError(404, 'The conversation was not found!');
    }

    if (
      req.user._id.equals(conversation.creator.people) ||
      req.user._id.equals(conversation.participant.people)
    ) {
      const messages = await Message.find({ conversation: req.params.id }).select('-__v');

      res.status(200).json({ message: 'Success!', messages });
    } else {
      throw createError(403, 'You are not authorized to access this conversation!');
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
