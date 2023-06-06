import createError from 'http-errors';
import Message from '../../models/Message.js';
import Conversation from '../../models/Conversation.js';
import {
  sendConversationWithSocket,
  sendMessageWithSocket,
} from '../../socket/socket.controller.js';
import { aggregateConversations } from '../../utils/helper-functions/conversation.helper.js';

export const storeMessage = async (req, res) => {
  try {
    let message;

    if (req.files && req.files.length) {
      const images = [];
      for (let i = 0; i < req.files.length; i++) {
        images.push(req.files[i].filename);
      }
      message = new Message({
        text: req.body.text,
        sender: req.user._id,
        conversation: req.body.conversationId,
        attachments: images,
      });
    } else {
      message = new Message({
        text: req.body.text,
        sender: req.user._id,
        conversation: req.body.conversationId,
      });
    }
    message = await message.save();

    const { __v, ...other } = message._doc;

    // update the conversation so that we can sort it
    let conversation = await Conversation.findByIdAndUpdate(req.body.conversationId, {
      $set: { lastMessageDate: new Date() },
    });

    // check if conversation is deleted by one user
    if (conversation.deletedBy) {
      // we already checked it in middleware,now we are sure that the deletedBy is the other user
      const otherUser = conversation.deletedBy;
      conversation = await Conversation.findByIdAndUpdate(
        conversation._id,
        {
          $set: {
            deletedBy: null,
            lastMessageDate: new Date(),
          },
        },
        {
          new: true,
        }
      );

      const matchStage = { _id: conversation._id };

      // conversation for sending through socket to other user
      conversation = await aggregateConversations(matchStage, otherUser);
      sendConversationWithSocket(conversation[0], otherUser);
    } else {
      const receiver = req.user._id.equals(conversation.creator.people)
        ? conversation.participant.people
        : conversation.creator.people;

      sendMessageWithSocket(other, receiver);
    }

    res.status(200).json({
      msg: 'The message was stored successfully!',
      message: other,
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
      const messages = await Message.find({ conversation: req.params.id })
        .sort({ createdAt: -1 })
        .select('-__v');

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
