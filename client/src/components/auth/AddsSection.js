import React from "react";
import addsImg from "../../assets/demo/adds.png";

const AddsSection = () => {
  return (
    <div className={"adds-section"}>
      <div className={"adds-image-container"}>
        <img src={addsImg} alt={"Adds"} />
      </div>
      <div className={"text-container"}>
        <h3>Connects with your friends</h3>
        <span>Everything you want to say to your friend!</span>
      </div>
    </div>
  );
};

export default AddsSection;
