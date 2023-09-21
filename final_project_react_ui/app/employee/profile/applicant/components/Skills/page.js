import React from 'react'
import style from "@/app/student/resume/style.module.css"
import { useState } from 'react'
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import {asyncaddskill,asyncfindskill , asyncupdateskill ,asyncskilldlete } from "@/store/Actions/studentresumeActions"
import { useDispatch , useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai"
import { useEffect } from 'react';
import { asyncgetresume } from "@/store/Actions/studentActions"
import { toast } from 'react-toastify';



const page = () => {
  const dispatch = useDispatch();
  const { student,resume, isAuthenticated,message} = useSelector((state) => state.studentReducers); 
  const [skillsData, setskillsData] = useState([]);
  const [sstatus, setsstatus] = useState('')

      useEffect(()=>{
        if (student && student.resume) {
          setskillsData(student.resume.skills);
        }
            // setskillsData(student.resume.skills)
            // console.log(student.resume.skills,"its student skills");
            // console.log(skillData,"its student  state skills");
      },[student])

      

      useEffect(()=>{
          setsstatus(message);
      },[message])

 

  return (
    <>
    

      <div className={style.skl}>
            <div className={style.skills}>
              <div className={style.s_left}>
                <h4>SKILLS</h4>
              </div>
              <div className={style.s_right}>
                <div className={style.srows}>
                {skillsData.map((el,i)=>{
                    return(
                      <div key={i} className={style.srow_container}>
                          <div className={style.srow}>
                            <h5>{el.skill}</h5>
                            <h6>{el.srated}</h6>
                          </div>
                          
                       </div>
                    )
                })}
                   
                </div>
                
              </div>
            </div>
       </div>
    </>
  )
}

export default page