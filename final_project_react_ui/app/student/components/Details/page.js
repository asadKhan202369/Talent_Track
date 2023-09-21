import React from "react";
import style from "@/app/student/resume/style.module.css";
import { useState } from "react";
import { useEffect } from "react";


const page = (props) => {
  const [student, setstudent] = useState("");

  useEffect(() => {
    setstudent(props.student);
  }, [props.student]);

  return (
    <>
      <div className={style.resume_card}>
        <div className={style.contact}>
          <div className={style.c_left}>
            <div className={style.name}>
              <h2>{student.name}</h2>
            </div>
            <h5>Email : {student.email}</h5>
            <h5>City : {student.city}</h5>
            <h5>Contact : +91 {student.contact}</h5>
            <h5>Gender : {student.gender}</h5>
          </div>
          <div className={style.c_right}>
            <div className={style.ruimg}>
              <img src={props.student.avatar.url} alt="" />
            </div>
            {/* <div className={style.down}>
              <FiDownload className={style.dn} />
              <small>Download</small>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
