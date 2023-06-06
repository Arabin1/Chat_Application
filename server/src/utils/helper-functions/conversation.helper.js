import createError from 'http-errors';
import Conversation from '../../models/Conversation.js';

export const aggregateConversations = async (matchStage, userId) =>
  Conversation.aggregate([
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
      $lookup: {
        from: 'messages',
        let: { conversationId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$conversation', '$$conversationId'] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },
          { $project: { __v: 0 } },
        ],
        as: 'latestMessage',
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
        creator: 1,
        participant: 1,
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        deletedBy: 1,
        lastMessageDate: 1,
        message: { $arrayElemAt: ['$latestMessage', 0] },
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
        seenAt: {
          $cond: [{ $ifNull: ['$creatorPeople', false] }, '$participant.seenAt', '$creator.seenAt'],
        },
        _id: 1,
        createdAt: 1,
        updatedAt: 1,
        deletedBy: 1,
        lastMessageDate: 1,
        message: 1,
      },
    },
    {
      $sort: { lastMessageDate: -1 },
    },
  ]);

export const updateSeenStatus = async (conversationId, userId) => {
  let conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw createError(404, 'Your requested conversation was not found!');
  }

  if (userId.equals(conversation.creator.people)) {
    conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $set: {
          'creator.seenAt': new Date(),
        },
      },
      {
        new: true,
      }
    );
  } else if (userId.equals(conversation.participant.people)) {
    conversation = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $set: {
          'participant.seenAt': new Date(),
        },
      },
      {
        new: true,
      }
    );
  } else {
    throw createError(403, 'You are not authorized to access this conversation.');
  }

  return conversation;
};
