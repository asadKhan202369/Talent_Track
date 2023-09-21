import React from 'react'
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from 'react';
import style from "@/app/student/resume/style.module.css"
import { asyncaddtraining,asyncfindtrain,asyncupdatetrain,asyncdeletetrain } from "@/store/Actions/studentresumeActions"
import { useDispatch , useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai"
import { asyncgetresume } from "@/store/Actions/studentActions"
import { useEffect } from 'react';

const page = () => {
  const { student,resume, isAuthenticated} = useSelector((state) => state.studentReducers); 

  const { findtraining} = useSelector((state) => state.studentReducers); 
  console.log(findtraining,"istststs ");
   const dispatch = useDispatch();
   const [showTraining, setShowTraining] = useState(false);
   const [training, settraining] = useState([]);
   const [updateTrainingData, setUpdateTrainingData] = useState('');
  const [functionCalled, setFunctionCalled] = useState(false);

   useEffect(()=>{
    if (student && student.resume) {
      settraining(student.resume.train);
    }
  },[student])

  useEffect(() => {
    if (functionCalled) {
      dispatch(asyncgetresume());
      dispatch(asyncgetresume());
      setFunctionCalled(false);
    }
  }, [functionCalled]);




  //   {/* ------------ update Training --------------------- */}
   
    useEffect(() => {
      setUpdateTrainingData(findtraining);  
    }, [findtraining]);
        
    const updateEvent = (event) => {
      const { name, value } = event.target;
      setUpdateTrainingData((preData) => {
      return {
          ...preData,
          [name]: value,
      };
      });
    };



  return (
    <>
    

         <div className={style.rsm}>
            <div className={style.edu}>
              <div className={style.l_edu}>
                <h4>TRAINING/COURSES</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>
                  {training.map((el, i) => {
                    
                    return (
                        
                        <div key={i} className={style.row_container}>
                                <div className={style.row}>
                                    <h5>{el.training}</h5>
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