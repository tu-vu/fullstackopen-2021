import React from "react";

const Button = ({ name, count, setCounter }) => {
  const handleClick = () => {
    setCounter(count + 1);
  };

  return <button onClick={handleClick}>{name}</button>;
};

export default Button;
