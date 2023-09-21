import React from 'react'
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import style from "@/app/student/resume/style.module.css"
import { useState } from 'react';
import { asyncaddachive,asyncfindAchive,asyncupdateachive,asyncdeleteachive  } from "@/store/Actions/studentresumeActions"
import { useDispatch , useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai"
import { useEffect } from 'react';
import { asyncgetresume } from "@/store/Actions/studentActions"
const page = () => {

  const { student,resume, isAuthenticated} = useSelector((state) => state.studentReducers); 

  const { findachive} = useSelector((state) => state.studentReducers); 
  const dispatch = useDispatch();
  const [showAchive, setShowAchive] = useState(false);
  const [Achives, setAchives] = useState([]);
  const [updateAchiveData, setUpdateAchiveData] = useState('');
  const [functionCalled, setFunctionCalled] = useState(false);

  useEffect(()=>{
    if (student && student.resume) {
      setAchives(student.resume.accomplishments);
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
                <h4>ACCOMPLISHMENTS/ ADDITIONAL DETAILS</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>
                  {Achives.map((el,i)=>{
                      return(
                        <div key={i} className={style.row_container}>
                          <div className={style.row}>
                            <h6 style={{whiteSpace:"initial"}}>{el.description}</h6>
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