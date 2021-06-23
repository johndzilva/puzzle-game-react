import React from "react";
import "./Card.css";

const Card = ({ logo, onCardClick, flipClass }) => {
  return (
    <div className={"card " + flipClass} onClick={onCardClick}>
      <img src={logo} alt="logo" className="back" />
      <div className="front" />
    </div>
  );
};

export default Card;
