import React from 'react'
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from 'react';
import style from "@/app/student/resume/style.module.css"
import { asyncaddintern,asyncfindintern,asyncupdateintern,asyncdeleteintern } from "@/store/Actions/studentresumeActions"
import { useDispatch , useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai"
import { useEffect } from 'react';
import { asyncgetresume } from "@/store/Actions/studentActions"



const page = () => {

  const { student,resume, isAuthenticated} = useSelector((state) => state.studentReducers); 
   const dispatch = useDispatch();
 
   
   const [functionCalled, setFunctionCalled] = useState(false);
   const [internship, setinternship] = useState([]);
   useEffect(()=>{
     if (student && student.resume) {
      setinternship(student.resume.internship);
     }
   },[student])

   
   useEffect(() => {
     if (functionCalled) {
       dispatch(asyncgetresume());
       dispatch(asyncgetresume());
       setFunctionCalled(false);
     }
   }, [functionCalled]);



  return (
    <>
         <div className={style.rsm}>
            <div className={style.edu}>
              <div className={style.l_edu}>
                <h4>INTERNSHIPS</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>
                  {internship.map((el, i) => {
                    
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
    </>
  )
}

export default page