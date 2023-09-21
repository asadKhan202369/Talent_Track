"use client";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";

import React from 'react'
import { asyncaddjob,asyncfindjob,asyncupdatejob ,asyncdeletejob} from "@/store/Actions/studentresumeActions"
import style from "@/app/student/resume/style.module.css"
import { useDispatch,useSelector } from "react-redux";
import { asyncgetresume } from "@/store/Actions/studentActions"

const page = () => {
  const { student,resume, isAuthenticated} = useSelector((state) => state.studentReducers); 
  const { findjob} = useSelector((state) => state.studentReducers); 
    const dispatch = useDispatch();
    const [showJob, setShowJob] = useState(false);
    const [jobs, setjobs] = useState([]);
    const [updateData, setUpdateData] = useState('');

    const [functionCalled, setFunctionCalled] = useState(false);

    useEffect(()=>{
      if (student && student.resume) {
        setjobs(student.resume.jobs);
      }
    },[student])

    
    useEffect(() => {
      if (functionCalled) {
        dispatch(asyncgetresume());
        dispatch(asyncgetresume());
        setFunctionCalled(false);
      }
    }, [functionCalled]);
    



    const toggleJob = () => {
      setShowJob(!showJob);
    };

      
  return (
    <>
    
      <div className={style.main}>

            <div className={style.rsm}>
            <div className={style.edu}>
              <div className={style.l_edu}>
                <h4>JOBS</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>
                 {jobs.map((el, i) => {
                    
                    return (
                        
                        <div key={i} className={style.row_container}>
                                <div className={style.row}>
                                    <h5>{el.profile}</h5>
                                    <h6>{el.organization}</h6>
                                    <h6>{el.startdate}-{el.enddate}</h6>
                                </div>
                                
                            </div>
                    );
                })}
                    
                </div>
              </div>
            </div>
            </div>
      </div>
    </>
  )
}

export default page