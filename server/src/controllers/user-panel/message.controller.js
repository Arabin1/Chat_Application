import createError from 'http-errors';
import Message from '../../models/Message.js';
import Conversation from '../../models/Conversation.js';

export const storeMessage = async (req, res) => {
  try {
    let message = new Message({
      text: req.body.text,
      senderPeopleId: req.user._id,
      conversationId: req.body.conversationId,
    });

    message = message.save();

    res.status(200).json({
      message: 'The message was stored successfully!',
      info: message,
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
      throw createError('The conversation was not found!');
    }

    if (
      req.user._id.toString() === conversation.creatorPeopleId.toString() ||
      req.user._id.toString() === conversation.participantPeopleId.toString()
    ) {
      const messages = await Message.find({ conversationId: req.params.id });

      res.status(200).json({ message: 'Success!', messages });
    } else {
      throw createError('Unauthenticated!');
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

export const deleteMessage = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw createError('Your requested conversation was not found!');
    }

    if (
      req.user._id.toString() === conversation.creatorPeopleId.toString() ||
      req.user._id.toString() === conversation.participantPeopleId.toString()
    ) {
      await Conversation.updateOne(
        {
          _id: conversation._id,
        },
        {
          $set: {
            text: '0a674be',
            deleted: true,
          },
        }
      );
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
