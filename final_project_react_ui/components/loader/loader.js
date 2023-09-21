import React from "react";
import style from "./style.module.css";

const loader = () => {
  return (
    <>
      <div className={style.l_container}>
        <div className={style.spinner_square}>
          <div className={`${style.square_1} ${style.square}`}></div>
          <div className={`${style.square_2} ${style.square}`}></div>
          <div className={`${style.square_3} ${style.square}`}></div>
        </div>
      </div>
    </>
  );
};

export default loader;
