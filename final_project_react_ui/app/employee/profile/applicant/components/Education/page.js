"use client";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import React from 'react'
import style from "@/app/student/resume/style.module.css"

const page = (props) => {
    const [educationr, setEducationr] = useState([]);  
    const [showcard, setshowcard] = useState(false)

    useEffect(() => {
        setEducationr(props.education);
    },[props.education]);


    const closecard = ()=>{
       setshowcard(!showcard)
    }

    
  return (
    <>

            <div className={style.rsm}>
            <div className={style.edu}>
              <div className={style.l_edu}>
                <h4>EDUCATION</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>
                 {educationr.map((el, i) => {
                    
                    return (
                        
                        <div key={i} className={style.row_container}>
                                <div className={style.row}>
                                    <h5>{el.Stream}</h5>
                                    <h6>{el.collagename}</h6>
                                    <h6>{el.startYear}-{el.endYear}</h6>
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