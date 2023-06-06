import { CHAT } from "../constants";

const chatReducer = (
  state = {
    conversations: [],
    loadingCon: false,
    error: false,
    messages: [],
    loadingMsg: false,
    selectedConversation: {},
    onlineUsers: [],
    dialogOpen: false,
    deleteDialogOpen: false,
  },
  action
) => {
  switch (action.type) {
    case CHAT.CONVERSATION_START:
      return { ...state, loadingCon: true, error: false };
    case CHAT.CONVERSATION_SUCCESS:
      return {
        ...state,
        loadingCon: false,
        error: false,
        conversations: action.data,
      };
    case CHAT.FAIL_TO_LOAD:
      return { ...state, loadingCon: false, error: true };
    case CHAT.MESSAGE_START:
      return { ...state, messages: [], loadingMsg: true, error: false };
    case CHAT.MESSAGE_SUCCESS:
      return {
        ...state,
        loadingMsg: false,
        error: false,
        messages: action.data,
      };
    case CHAT.CREATE_CONVERSATION:
      return {
        ...state,
        conversations: [...state.conversations, action.data].sort(
          (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
        ),
        dialogOpen: false,
      };
    case CHAT.CONVERSATION_RECEIVED: {
      const conversation = state.conversations.find(
        (con) => con._id === action.data._id
      );

      if (conversation) {
        return {
          ...state,
          conversations: state.conversations
            .map((con) => (conversation._id === con._id ? action.data : con))
            .sort(
              (a, b) =>
                new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
            ),
          selectedConversation:
            state.selectedConversation._id === action.data._id
              ? action.data
              : state.selectedConversation,
        };
      }
      return {
        ...state,
        conversations: [action.data, ...state.conversations].sort(
          (a, b) => new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
        ),
      };
    }
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
    case CHAT.MESSAGE_RECEIVED:
      return {
        ...state,
        messages:
          state.selectedConversation._id === action.data.conversation
            ? [action.data, ...state.messages]
            : state.messages,
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
          action.data._id === conversation._id ? action.data : conversation
        ),
      };
    case CHAT.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.data,
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
