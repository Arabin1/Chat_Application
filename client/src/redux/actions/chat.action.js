import * as CHAT_API from "../api/chat.request";
import { CHAT } from "../constants";
import { openSnackbar, openSnackBarForAxiosError } from "./snackbar.action";

export const getUserConversations = () => async (dispatch) => {
  dispatch({ type: CHAT.CONVERSATION_START });

  try {
    const { data } = await CHAT_API.getUserConversations();
    dispatch({ type: CHAT.CONVERSATION_SUCCESS, data: data.conversations });
  } catch (e) {
    dispatch({ type: CHAT.FAIL_TO_LOAD });
    dispatch(handleError(e));
  }
};

export const createConversation = (payload) => async (dispatch) => {
  try {
    const { data } = await CHAT_API.createConversation(payload);
    dispatch({ type: CHAT.CREATE_CONVERSATION, data: data.conversation });

    // handle the snackbar for success
    dispatch(openSnackbar(data.message, "success"));

    // Set this conversation as selected
    dispatch({ type: CHAT.SET_SELECTED_CONVERSATION, data: data.conversation });
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const conversationReceived = (conversation) => (dispatch) => {
  dispatch({ type: CHAT.CONVERSATION_RECEIVED, data: conversation });
};

export const getConversationMessages = (id) => async (dispatch) => {
  dispatch({ type: CHAT.MESSAGE_START });

  try {
    const { data } = await CHAT_API.getConversationMessages(id);
    dispatch({ type: CHAT.MESSAGE_SUCCESS, data: data.messages });
  } catch (e) {
    dispatch({ type: CHAT.FAIL_TO_LOAD });
    dispatch(handleError(e));
  }
};

export const sendMessage = (payload) => async (dispatch) => {
  try {
    const { data } = await CHAT_API.sendMessage(payload);
    dispatch({ type: CHAT.SEND_MESSAGE_SUCCESS, data: data.message });
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const messageReceived = (payload) => (dispatch) => {
  dispatch({ type: CHAT.MESSAGE_RECEIVED, data: payload });
};

export const setSelectedConversation =
  (conversation, userId) => async (dispatch) => {
    try {
      let actionData;
      // if current user is the message sender then there is no need to update seen
      if (
        userId !== conversation.message?.sender &&
        (new Date(conversation.lastMessageDate) >
          new Date(conversation.seenAt) ||
          !conversation.seenAt)
      ) {
        const { data } = await CHAT_API.updateSeenOfConversation(
          conversation._id
        );
        actionData = data.conversation;
      } else {
        actionData = conversation;
      }

      dispatch({ type: CHAT.SET_SELECTED_CONVERSATION, data: actionData });
    } catch (e) {
      console.log(e);
      dispatch(handleError(e));
    }
  };

export const updateSeenOfConversation = (id) => async (dispatch) => {
  try {
    const { data } = await CHAT_API.updateSeenOfConversation(id);
    dispatch({ type: CHAT.CONVERSATION_RECEIVED, data: data.conversation });
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const setOnlineUsers = (users) => (dispatch) => {
  dispatch({ type: CHAT.SET_ONLINE_USERS, data: users });
};

export const setAddUserDialog = (value) => (dispatch) => {
  dispatch({ type: CHAT.SET_ADD_USER_DIALOG, data: value });
};

export const deleteConversation = (id) => async (dispatch) => {
  try {
    const { data } = await CHAT_API.deleteConversation(id);
    dispatch({ type: CHAT.DELETE_CONVERSATION, data: id });

    // handle the snackbar for success
    dispatch(openSnackbar(data.message, "success"));
  } catch (e) {
    dispatch(handleError(e));
  }
};

export const setDeleteUserDialog = (value) => (dispatch) => {
  dispatch({ type: CHAT.SET_DELETE_USER_DIALOG, data: value });
};

// handling error
const handleError = (e) => (dispatch) => {
  if (e.response) {
    if (e.response.status >= 500) {
      dispatch(
        openSnackBarForAxiosError(
          "Something went wrong! Please try again later.",
          "error"
        )
      );
    }
  } else if (e.request) {
    dispatch(openSnackBarForAxiosError("No Internet connection!"));
  } else {
    dispatch(openSnackBarForAxiosError("Something went wrong!", "error"));
  }
};
