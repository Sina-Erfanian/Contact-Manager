import React from "react";
import SpinnerGif from "../assets/Spinner.gif";

function Spinner() {
  return (
    <>
      <img
        src={SpinnerGif}
        alt="spinner"
        className="d-block m-auto"
        style={{ width: "200px" }}
      />
    </>
  );
}

export default Spinner;
