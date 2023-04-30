import createError from 'http-errors';
import Conversation from '../../models/Conversation.js';

export const createConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      $or: [
        { creatorPeopleId: req.user._id, participantPeopleId: req.body.participantPeopleId },
        { participantPeopleId: req.user._id, creatorPeopleId: req.body.participantPeopleId },
      ],
    });

    if (conversation && conversation.deletedBy !== req.user._id) {
      throw createError('The conversation already exist!');
    } else if (conversation && conversation.deletedBy === req.user._id) {
      await Conversation.updateOne(
        {
          _id: conversation._id,
        },
        {
          $set: {
            deletedBy: null,
          },
        }
      )
        .populate({ path: 'creatorPeopleId', select: '_id firstname lastname image' })
        .populate({ path: 'participantPeopleId', select: '_id firstname lastname image' })
        .select('-deletedBy -__v');

      return res.status(200).json({
        message: 'Successfully created a new conversation!',
        conversation,
      });
    }

    const con = new Conversation({
      creatorPeopleId: req.user._id,
      participantPeopleId: req.body.participantPeopleId,
    });

    const newConversation = await con
      .save()
      .populate({ path: 'creatorPeopleId', select: '_id firstname lastname image' })
      .populate({ path: 'participantPeopleId', select: '_id firstname lastname image' })
      .select('-deletedBy -__v');

    return res.status(200).json({
      message: 'Successfully created a new conversation!',
      conversation: newConversation,
    });
  } catch (e) {
    return res.status(400).json({
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
    let conversations = await Conversation.find({
      $or: [{ creatorPeopleId: req.user._id }, { participantPeopleId: req.user._id }],
    })
      .populate({ path: 'creatorPeopleId', select: '_id firstname lastname image' })
      .populate({ path: 'participantPeopleId', select: '_id firstname lastname image' })
      .select('-deletedBy -__v');

    conversations = conversations.filter((conversation) => conversation.deletedBy !== req.user._id);

    res.status(200).json({ message: 'Success!', conversations });
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

export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      throw createError('Your requested conversation was not found!');
    }

    if (
      req.user._id.toString() === conversation.creatorPeopleId.toString() ||
      req.user._id.toString() === conversation.participantPeopleId.toString()
    ) {
      if (conversation.deletedBy) {
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
      }

      return res.status(200).json({ message: 'The conversation is deleted successfully' });
    }
    throw createError('Unauthenticated!');
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      errors: {
        common: {
          msg: e.message,
        },
      },
    });
  }
};
