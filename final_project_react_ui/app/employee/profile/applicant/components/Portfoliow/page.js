import React from 'react'
import style from "@/app/student/resume/style.module.css"
import { useState } from 'react';
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus,AiOutlineClose } from "react-icons/ai";
import { useEffect } from 'react';
import { asyncaddportfolio ,asyncfindlink,asyncupdatelink,asyncdeletelink } from "@/store/Actions/studentresumeActions"
import { asyncgetresume } from "@/store/Actions/studentActions"
import { useDispatch,useSelector } from 'react-redux';

const page = () => {

  const { student,resume, isAuthenticated,message} = useSelector((state) => state.studentReducers); 
  const { findlinks} = useSelector((state) => state.studentReducers); 
  console.log(findlinks,"its link");

  const dispatch = useDispatch();
  const [links, setlinks] = useState([]);

  useEffect(()=>{
    if (student && student.resume) {
       setlinks(student.resume.portfolio);
       console.log(student.resume.portfolio,"its a portfolio");
    }
  },[student])


  return (
    <>
       
        <div className={style.rsm}>
            <div className={style.edu}>
              <div className={style.l_edu}>
                <h4>PORTFOLIO/ WORK SAMPLES</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>

                {links  .map((el, i) => {
                    
                    return (
                        
                        <div key={i} className={style.row_container}>
                                <div className={style.row}>
                                    <h5>{el.blog}</h5>
                                    <h6>{el.Behance}</h6>
                                    <h6>{el.GitHub}</h6>
                                    <h6>{el.PS}</h6>
                                    <h6>{el.MW}</h6>
                                    
                                </div>
                                
                            </div>
                    );
                })}
                
                 
                </div>
              </div>
            </div>
          </div>
    
    </>
  )
}

export default page