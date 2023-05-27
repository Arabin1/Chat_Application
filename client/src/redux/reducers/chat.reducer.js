import { CHAT } from "../constants";

const chatReducer = (
  state = {
    conversations: [],
    loadingCon: false,
    errorCon: false,
    messages: [],
    loadingMsg: false,
    errorMsg: false,
    selectedConversation: {},
    dialogOpen: false,
    deleteDialogOpen: false,
  },
  action
) => {
  switch (action.type) {
    case CHAT.CONVERSATION_START:
      return { ...state, loadingCon: true, errorCon: false };
    case CHAT.CONVERSATION_SUCCESS:
      return {
        ...state,
        loadingCon: false,
        errorCon: false,
        conversations: action.data,
      };
    case CHAT.CONVERSATION_FAIL:
      return { ...state, loadingCon: false, errorCon: true };
    case CHAT.MESSAGE_START:
      return { ...state, loadingMsg: true, errorMsg: false };
    case CHAT.MESSAGE_SUCCESS:
      return {
        ...state,
        loadingMsg: false,
        errorMsg: false,
        messages: action.data,
      };
    case CHAT.MESSAGE_FAIL:
      return { ...state, loadingMsg: false, errorMsg: true };
    case CHAT.CREATE_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.data].sort(
          (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
        ),
        dialogOpen: false,
      };
    case CHAT.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        errorSendMsg: false,
        messages: [action.data, ...state.messages],
        conversations: state.conversations
          .map((conversation) =>
            action.data.conversation === conversation._id
              ? {
                  ...conversation,
                  message: action.data,
                  lastMessageDate: new Date(),
                }
              : conversation
          )
          .sort(
            (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
          ),
      };
    case CHAT.SET_SELECTED_CONVERSATION:
      return {
        ...state,
        selectedConversation: action.data,
        conversations: state.conversations.map((conversation) =>
          action.data._id === conversation._id
            ? {
                ...conversation,
                seenAt: action.data.seenAt,
              }
            : conversation
        ),
      };
    case CHAT.SET_ADD_USER_DIALOG:
      return {
        ...state,
        dialogOpen: action.data,
      };
    case CHAT.DELETE_CONVERSATION:
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversation) => conversation._id !== action.data
        ),
        deleteDialogOpen: false,
        selectedConversation: {},
      };
    case CHAT.SET_DELETE_USER_DIALOG:
      return {
        ...state,
        deleteDialogOpen: action.data,
      };
    default:
      return state;
  }
};

export default chatReducer;
