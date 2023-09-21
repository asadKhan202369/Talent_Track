import React from 'react'
import style from "@/app/student/resume/style.module.css"
import { useState } from 'react'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai"

const page = (props) => {
  console.log(props,"its props");
  const [student, setstudent] = useState('')
    

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
                
              </div>
            </div>
          </div>
    
    </>
  )
}

export default page