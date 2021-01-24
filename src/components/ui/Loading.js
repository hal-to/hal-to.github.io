import React from "react";
import icon1 from "../../img/icon1.png"
import icon2 from "../../img/icon2.png"
import icon3 from "../../img/icon3.png"


const Loading = () => {
  return (
    <div id="loading" className="loading">
      <div className="loading__contents">
        <img className="loading__icon loading__icon--1" src={icon1}/>
        <img className="loading__icon loading__icon--2" src={icon2}/>
        <img className="loading__icon loading__icon--3" src={icon3}/>
      </div>
    </div>
  );
};

export default Loading;
