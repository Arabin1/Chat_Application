import React from "react";
import defaultPP from "../../../assets/default/defaultProfile.jpg";
import { useSelector } from "react-redux";

const Conversation = ({ conversation, online, selected }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  let data;

  if (conversation.creatorPeopleId._id === user._id) {
    data = conversation.participantPeopleId;
  } else {
    data = conversation.creatorPeopleId;
  }

  return (
    <div
      className={
        selected ? "selected-conversation-container" : "conversation-container"
      }
    >
      <div className={"conversation"}>
        {online && <div className={"online-dot"} />}
        <img
          className={"profile-image"}
          src={
            data.image
              ? process.env.REACT_APP_PUBLIC_API_FOLDER + `/user/${data.image}`
              : defaultPP
          }
          alt={data.firstname}
        />
        <div>
          <h3>
            {data.firstname} {data.lastname}
          </h3>
          <span>
            lorem ipsum dolor something include here for the rest of the day
            thank you
          </span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
