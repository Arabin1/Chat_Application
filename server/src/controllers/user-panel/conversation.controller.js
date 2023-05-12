import createError from 'http-errors';
import Conversation from '../../models/Conversation.js';
import Message from '../../models/Message.js';

const aggregateConversations = async (conversationId, userId, isCons = false) => {
  let matchStage;
  if (isCons) {
    matchStage = {
      $or: [{ 'creator.people': userId }, { 'participant.people': userId }],
    };
  } else {
    matchStage = { _id: conversationId };
  }

  return Conversation.aggregate([
    {
      $match: matchStage,
    },
    {
      $lookup: {
        from: 'peoples',
        localField: 'creator.people',
        foreignField: '_id',
        as: 'creatorPeople',
      },
    },
    {
      $lookup: {
        from: 'peoples',
        localField: 'participant.people',
        foreignField: '_id',
        as: 'participantPeople',
      },
    },
    {
      $project: {
        creatorPeople: {
          $cond: [
            { $eq: ['$creator.people', userId] },
            '$$REMOVE',
            {
              $mergeObjects: [
                { $arrayElemAt: ['$creatorPeople', 0] },
                { seenAt: '$creator.seenAt' },
              ],
            },
          ],
        },
        participantPeople: {
          $cond: [
            { $eq: ['$participant.people', userId] },
            '$$REMOVE',
            {
              $mergeObjects: [
                { $arrayElemAt: ['$participantPeople', 0] },
                { seenAt: '$participant.seenAt' },
              ],
            },
          ],
        },
        createdAt: 1,
        updatedAt: 1,
        deletedBy: 1,
      },
    },
    {
      $project: {
        people: {
          $cond: [
            { $ifNull: ['$creatorPeople', false] },
            {
              _id: '$creatorPeople._id',
              firstname: '$creatorPeople.firstname',
              lastname: '$creatorPeople.lastname',
              image: '$creatorPeople.image',
              seenAt: '$creatorPeople.seenAt',
            },
            {
              _id: '$participantPeople._id',
              firstname: '$participantPeople.firstname',
              lastname: '$participantPeople.lastname',
              image: '$participantPeople.image',
              seenAt: '$participantPeople.seenAt',
            },
          ],
        },
        createdAt: 1,
        updatedAt: 1,
        deletedBy: 1,
      },
    },
  ]);
};

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
          },
        },
        {
          new: true,
        }
      );

      conversation = await aggregateConversations(conversation._id, req.user._id);

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

    conversation = await aggregateConversations(conversation._id, req.user._id);

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
    let conversations = await aggregateConversations(false, req.user._id, true);

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
    let conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw createError(404, 'Your requested conversation was not found!');
    }

    if (req.user._id.equals(conversation.creator.people)) {
      conversation = await Conversation.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'creator.seenAt': Date.now(),
          },
        },
        {
          new: true,
        }
      );
    } else if (req.user._id.equals(conversation.participant.people)) {
      conversation = await Conversation.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'participant.seenAt': Date.now(),
          },
        },
        {
          new: true,
        }
      );
    } else {
      throw createError(403, 'You are not authorized to access this conversation.');
    }

    return res.status(200).json({
      message: 'Success!',
      conversation,
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

        await Message.updateMany(
          {
            conversation: conversation._id,
          },
          {
            $set: {
              text: '',
              deleted: true,
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
