import * as CHAT_API from "../api/chat.request";
import { CHAT, UI } from "../constants";

export const getUserConversations = () => async (dispatch) => {
  dispatch({ type: CHAT.CONVERSATION_START });

  try {
    const { data } = await CHAT_API.getUserConversations();
    dispatch({ type: CHAT.CONVERSATION_SUCCESS, data: data.conversations });
  } catch (e) {
    dispatch({ type: CHAT.CONVERSATION_FAIL });
    console.log(e);
  }
};

export const createConversation = (payload) => async (dispatch) => {
  try {
    const { data } = await CHAT_API.createConversation(payload);
    dispatch({ type: CHAT.CREATE_CONVERSATION, data: data.conversation });

    // handle the snackbar for success
    dispatch({
      type: UI.SET_MESSAGE,
      data: data.message,
    });
    dispatch({ type: UI.SET_SEVERITY, data: "success" });
    dispatch({ type: UI.SET_OPEN, data: true });

    // Set this conversation as selected
    dispatch(setSelectedConversation(data.conversation));
  } catch (e) {
    console.log(e);
  }
};

export const getConversationMessages = (id) => async (dispatch) => {
  dispatch({ type: CHAT.MESSAGE_START });

  try {
    const { data } = await CHAT_API.getConversationMessages(id);
    dispatch({ type: CHAT.MESSAGE_SUCCESS, data: data.messages });
  } catch (e) {
    dispatch({ type: CHAT.MESSAGE_FAIL });
    console.log(e);
  }
};

export const sendMessage = (payload) => async (dispatch) => {
  try {
    const { data } = await CHAT_API.sendMessage(payload);
    dispatch({ type: CHAT.SEND_MESSAGE_SUCCESS, data: data.message });
  } catch (e) {
    console.log(e);
  }
};

export const setSelectedConversation = (conversation) => async (dispatch) => {
  try {
    let actionData;
    if (
      new Date(conversation.lastMessageDate) > new Date(conversation.seenAt) ||
      !conversation.seenAt
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
  }
};

export const setAddUserDialog = (value) => (dispatch) => {
  dispatch({ type: CHAT.SET_ADD_USER_DIALOG, data: value });
};

export const deleteConversation = (id) => async (dispatch) => {
  try {
    const { data } = await CHAT_API.deleteConversation(id);
    dispatch({ type: CHAT.DELETE_CONVERSATION, data: id });

    // handle the snackbar for success
    dispatch({
      type: UI.SET_MESSAGE,
      data: data.message,
    });
    dispatch({ type: UI.SET_SEVERITY, data: "success" });
    dispatch({ type: UI.SET_OPEN, data: true });
  } catch (e) {
    console.log(e);
  }
};

export const setDeleteUserDialog = (value) => (dispatch) => {
  dispatch({ type: CHAT.SET_DELETE_USER_DIALOG, data: value });
};
