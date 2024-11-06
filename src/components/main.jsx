import React from "react";
const Main = ({ data }) => {
  return (
    <div className="imgContainer">
      <img src={data?.hdurl} alt={data.titel || "bg-img"} className="bgImage" />
    </div>
  );
};

export default Main;
