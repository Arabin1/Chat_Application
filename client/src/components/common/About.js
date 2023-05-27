import React from "react";
import me from "../../assets/demo/me.jpg";

const About = () => {
  return (
    <div className={"about-me"}>
      <img src={me} alt={"Arabin"} />
      <p>
        Welcome to our real-time chat application developed by Md. Asaduzzaman
        (Arabin). Built using the MERN stack, this app offers real time chat.
        For more information and to explore additional projects,
        <a
          href={"https://arabin.vercel.app"}
          target={"_blank"}
          rel="noreferrer"
        >
          visit my portfolio
        </a>
        . Thank you for choosing our chat app, and enjoy your chat experience!
      </p>
    </div>
  );
};

export default About;
