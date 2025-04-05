import React from "react";
import Button from "@mui/material/Button";

const Fist = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: "10px",
        padding: "14px 55px",
        color: "gray",
        backgroundColor: "white",
        border: "none",
        "&:hover": {
          backgroundColor: "lightgray",
        },
      }}
    >
      {text}
    </Button>
  );
};

const Secend = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        padding: "14px 55px",
        borderRadius: "10px",
        color: "white",
        backgroundColor: "rgb(31, 110, 212)",
        border: "none",
        "&:hover": {
          backgroundColor: "darkblue",
        },
      }}
    >
      {text}
    </Button>
  );
};

const Third = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        padding: "14px 55px",
        borderRadius: "10px",
        color: "white",
        backgroundColor: "rgb(201, 201, 201)",
        border: "none",
        "&:hover": {
          backgroundColor: "darkgray",
        },
      }}
    >
      {text}
    </Button>
  );
};

const MyButton = ({ text, variant, onClick }) => {
  switch (variant) {
    case "first":
      return <Fist text={text} onClick={onClick} />;
    case "secend":
      return <Secend text={text} onClick={onClick} />;
    case "third":
      return <Third text={text} onClick={onClick} />;
    default:
      return <Fist text={text} onClick={onClick} />;
  }
};

export default MyButton;
