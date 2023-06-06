import createError from 'http-errors';
import Conversation from '../../models/Conversation.js';
import Message from '../../models/Message.js';
import {
  aggregateConversations,
  updateSeenStatus,
} from '../../utils/helper-functions/conversation.helper.js';
import { sendConversationWithSocket } from '../../socket/socket.controller.js';
import { deleteMessageAttachments } from '../../utils/helper-functions/message.helper.js';

export const createConversation = async (req, res) => {
  try {
    let conversation = await Conversation.findOne({
      $or: [
        { 'creator.people': req.user._id, 'participant.people': req.body.participantPeopleId },
        { 'participant.people': req.user._id, 'creator.people': req.body.participantPeopleId },
      ],
    });

    if (conversation && !req.user._id.equals(conversation.deletedBy)) {
      throw createError(409, 'The conversation already exist!');
    } else if (conversation) {
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

      conversation = await aggregateConversations(matchStage, req.user._id);

      return res.status(200).json({
        message: 'Successfully created a new conversation!',
        conversation: conversation[0],
      });
    }

    conversation = new Conversation({
      'creator.people': req.user._id,
      'participant.people': req.body.participantPeopleId,
    });

    conversation = await conversation.save();

    const matchStage = { _id: conversation._id };

    conversation = await aggregateConversations(matchStage, req.user._id);

    // conversation for sending through socket to other user
    const conversation1 = await aggregateConversations(matchStage, conversation[0].people._id);
    sendConversationWithSocket(conversation1[0], conversation[0].people._id);

    return res.status(200).json({
      message: 'Successfully created a new conversation!',
      conversation: conversation[0],
    });
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

export const getUserConversations = async (req, res) => {
  try {
    const matchStage = {
      $or: [{ 'creator.people': req.user._id }, { 'participant.people': req.user._id }],
    };

    let conversations = await aggregateConversations(matchStage, req.user._id);

    conversations = conversations.filter(
      (conversation) => !req.user._id.equals(conversation.deletedBy)
    );

    res.status(200).json({ message: 'Success!', conversations });
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

export const updateSeen = async (req, res) => {
  try {
    let conversation = await updateSeenStatus(req.params.id, req.user._id);

    const matchStage = { _id: conversation._id };

    conversation = await aggregateConversations(matchStage, req.user._id);

    // conversation for sending through socket to other user
    const conversation1 = await aggregateConversations(matchStage, conversation[0].people._id);
    sendConversationWithSocket(conversation1[0], conversation[0].people._id);

    return res.status(200).json({
      message: 'Success!',
      conversation: conversation[0],
    });
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

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw createError('Your requested conversation was not found!');
    }

    if (
      req.user._id.equals(conversation.creator.people) ||
      req.user._id.equals(conversation.participant.people)
    ) {
      if (conversation.deletedBy) {
        if (req.user._id.equals(conversation.deletedBy)) {
          throw createError(404, 'Your requested conversation was not found!');
        }
        await Conversation.findByIdAndRemove(conversation._id);
      } else {
        await Conversation.updateOne(
          {
            _id: conversation._id,
          },
          {
            $set: {
              deletedBy: req.user._id,
            },
          }
        );

        const messages = await Message.find({
          sender: req.user._id,
          conversation: conversation._id,
        });

        deleteMessageAttachments(messages);

        await Message.updateMany(
          {
            sender: req.user._id,
            conversation: conversation._id,
          },
          {
            $set: {
              text: '',
              deleted: true,
              attachments: [],
            },
          }
        );
      }

      return res.status(200).json({ message: 'The conversation is deleted successfully' });
    }
    throw createError(403, 'You are not authorized to access this conversation.');
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
