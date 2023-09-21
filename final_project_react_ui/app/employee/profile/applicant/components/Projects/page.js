import React from 'react'
import style from "@/app/student/resume/style.module.css"
import { useState } from 'react'
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { asyncaddProject,asyncfindProject,asyncupdateproject,asyncdeleteproject,asyncdeleteskill } from "@/store/Actions/studentresumeActions"
import { useDispatch , useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai"
import { useEffect } from 'react';
import { asyncgetresume } from "@/store/Actions/studentActions"

const page = () => {
  const { student,resume, isAuthenticated} = useSelector((state) => state.studentReducers); 
  const { findproject} = useSelector((state) => state.studentReducers); 
  const dispatch = useDispatch();
  const [showProjects, setShowProjects] = useState(false);
  const [Projects, setProjects] = useState([]);
  const [updateProjectData, setUpdateProjectData] = useState('');
  const [functionCalled, setFunctionCalled] = useState(false);


  useEffect(()=>{
    if (student && student.resume) {
      setProjects(student.resume.projects);
    }
  },[student])



  return (
    <>
     

      <div className={style.rsm}>
            <div className={style.edu}>
              <div className={style.l_edu}>
                <h4>ACADEMICS/ PERSONAL PROJECTS</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>
                {Projects.map((el, i) => {
              
              return (
                <div key={i} className={style.row_container}>
                      <div className={style.row}>
                        <h5>{el.title}</h5>
                        <h6>{el.plink}</h6>
                        <h6  style={{whiteSpace:"initial"}}>{el.description}</h6>
                        <h6>{el.startmonth} - {el.endmonth}</h6>
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