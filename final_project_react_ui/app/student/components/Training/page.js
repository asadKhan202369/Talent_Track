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


    const resetUpdateTrainingData = () => {
        setUpdateTrainingData('')
    };

    const findtrainHandler = async (id) => {
        try {
          dispatch(asyncfindtrain(id))  
        } catch (error) {
          console.log(error);
        }
    };

    const updateTrainingHandler = async (id) => {
        try {
          event.preventDefault();
          dispatch(asyncupdatetrain(id, updateTrainingData));
          resetUpdateTrainingData();
          setFunctionCalled(true);
        } catch (error) {
          console.log(error);
        }
    };

  // {/* ------------ update job --------------------- */}

   
    {/* ------------ delete intern --------------------- */}

    const deletetrain = async (id) => {
      try {
        dispatch(asyncdeletetrain(id));
        setFunctionCalled(true);
      } catch (error) {
        console.log(error);
      }
    };

 {/* ------------ delete intern --------------------- */}


    {/* ------------ add Intern --------------------- */}
    
        const initialtrainingData = {
          training: "",
          startdate: "",
          organization: "",
          enddate: "",
          location: "",
          description: "",
           currentlyWorking: false, // Add this state
          // Add more fields as needed
        };

        const toggleIntern = () => {
          setShowTraining(!showTraining);
        };

        const [TrainingData, setTrainingData] = useState(initialtrainingData);

        // const inputtrainingEvent = (event) => {
        //   const { name, value } = event.target;

        //   setTrainingData((preData) => {
        //     return {
        //       ...preData,
        //       [name]: value,
        //     };
        //   });
        // };

        const inputtrainingEvent = (e) => {
          const { name, value, type, checked } = e.target;
          setTrainingData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value, // Handle checkbox input
          }));
        };

          
        const trainingform = async (e) => {
            e.preventDefault();
            try {
              dispatch(asyncaddtraining(TrainingData))
              setTrainingData(initialtrainingData); // Reset form fields
              setShowTraining(!showTraining);
             setFunctionCalled(true);   
            } catch (error) {
              console.log(error);
            }
        };

    {/* ------------ add Intern --------------------- */}


  return (
    <>
    {/* ------------ add Intern --------------------- */}
    
    {/* ------------ add Training --------------------- */}
 
    {showTraining && (

          <div
            style={{ position: "absolute", top: "67%",display:"initial" }}
            className={style.edu_form}
          >
            <div className={style.e_head}>
                <h6>Training details</h6>
              <AiOutlineClose className={style.close} onClick={toggleIntern} />    
            </div>
            <div className={style.form_div}>
                <form onSubmit={trainingform}>
                <div className="mb-3">
                    <label
                    style={{
                        fontFamily: "roobert",
                        fontSize: "1vmax",
                        fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    >
                    Training program
                    </label>
                    <input
                    onChange={inputtrainingEvent}
                    name="training"
                    placeholder="e.g Analytics"
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label
                    style={{
                        fontFamily: "roobert",
                        fontSize: "1vmax",
                        fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    >
                    Organization
                    </label>
                    <input
                    onChange={inputtrainingEvent}
                    name="organization"
                    placeholder="e.g Intershala"
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label
                    style={{
                        fontFamily: "roobert",
                        fontSize: "1vmax",
                        fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                    >
                    Location
                    </label>
                    <input
                    onChange={inputtrainingEvent}
                    name="location"
                    placeholder="e.g Mumbai"
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    />
                </div>
                <div className={style.dates}>
                    <div className={style.select}>
                    <div className="mb-3">
                        <label
                        style={{
                            fontFamily: "roobert",
                            fontSize: "1vmax",
                            fontWeight: "550",
                        }}
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                        >
                        Start date
                        </label>
                        <input
                        onChange={inputtrainingEvent}
                        name="startdate"
                        placeholder="e.g Mumbai"
                        type="date"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        />
                    </div>
                    </div>
                    <div className={style.select}>
                    <div className="mb-3">
                        <label
                        style={{
                            fontFamily: "roobert",
                            fontSize: "1vmax",
                            fontWeight: "550",
                        }}
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                        >
                        End date
                        </label>
                        <input
                        onChange={inputtrainingEvent}
                        name="enddate"
                        placeholder="e.g Mumbai"
                        type="date"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        />
                    </div>
                    </div>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="currentlyWorking"
                    checked={TrainingData.currentlyWorking}
                    onChange={inputtrainingEvent}
                    name="currentlyWorking"
                  />
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    className="form-check-label"
                    htmlFor="currentlyWorking"
                  >
                    Currently Running
                  </label>
                </div>
              
                <div style={{ marginTop: "5vh" }} className={style.dates}>
                    <div className="form-floating">
                    <textarea
                        name="description"
                        className="form-control"
                        onChange={inputtrainingEvent}
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: "100px", width: "41vw" }}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Description</label>
                    </div>
                </div>

                <div className={style.btn}>
                    <button
                    onClick={trainingform}
                    type="submit"
                    className="btn btn-primary"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
          </div>


    )}

    {/* ------------ add Intern --------------------- */}

    {/* ------------ Update Intern --------------------- */}
 
        {updateTrainingData && (
         <div
         
         className={style.edu_form}
       >
         <div className={style.e_head}>
             <h6>Training details</h6>
             <AiOutlineClose className={style.close} onClick={resetUpdateTrainingData} />    

         </div>
         <div className={style.form_div}>
             <form onSubmit={()=> updateTrainingHandler(updateTrainingData.id)}>
             <div className="mb-3">
                 <label
                 style={{
                     fontFamily: "roobert",
                     fontSize: "1vmax",
                     fontWeight: "550",
                 }}
                 htmlFor="exampleInputEmail1"
                 className="form-label"
                 >
                 Training program
                 </label>
                 <input
                 value={updateTrainingData.training}
                     onChange={updateEvent}
                 name="training"
                 placeholder="e.g Analytics"
                 type="text"
                 className="form-control"
                 id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                 />
             </div>
             <div className="mb-3">
                 <label
                 style={{
                     fontFamily: "roobert",
                     fontSize: "1vmax",
                     fontWeight: "550",
                 }}
                 htmlFor="exampleInputEmail1"
                 className="form-label"
                 >
                 Organization
                 </label>
                 <input
                 value={updateTrainingData.organization}
                     onChange={updateEvent}
                 name="organization"
                 placeholder="e.g Intershala"
                 type="text"
                 className="form-control"
                 id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                 />
             </div>
             <div className="mb-3">
                 <label
                 style={{
                     fontFamily: "roobert",
                     fontSize: "1vmax",
                     fontWeight: "550",
                 }}
                 htmlFor="exampleInputEmail1"
                 className="form-label"
                 >
                 Location
                 </label>
                 <input
                 value={updateTrainingData.location}
                     onChange={updateEvent}
                 name="location"
                 placeholder="e.g Mumbai"
                 type="text"
                 className="form-control"
                 id="exampleInputEmail1"
                 aria-describedby="emailHelp"
                 />
             </div>
             <div className={style.dates}>
                 <div className={style.select}>
                 <div className="mb-3">
                     <label
                     style={{
                         fontFamily: "roobert",
                         fontSize: "1vmax",
                         fontWeight: "550",
                     }}
                     htmlFor="exampleInputEmail1"
                     className="form-label"
                     >
                     Start date
                     </label>
                     <input
                     value={updateTrainingData.startdate}
                     onChange={updateEvent}
                     name="startdate"
                     placeholder="e.g Mumbai"
                     type="date"
                     className="form-control"
                     id="exampleInputEmail1"
                     aria-describedby="emailHelp"
                     />
                 </div>
                 </div>
                 <div className={style.select}>
                 <div className="mb-3">
                     <label
                     style={{
                         fontFamily: "roobert",
                         fontSize: "1vmax",
                         fontWeight: "550",
                     }}
                     htmlFor="exampleInputEmail1"
                     className="form-label"
                     >
                     End date
                     </label>
                     <input
                     value={updateTrainingData.enddate}
                     onChange={updateEvent}
                     name="enddate"
                     placeholder="e.g Mumbai"
                     type="date"
                     className="form-control"
                     id="exampleInputEmail1"
                     aria-describedby="emailHelp"
                     />
                 </div>
                 </div>
             </div>

           
             <div style={{ marginTop: "5vh" }} className={style.dates}>
                 <div className="form-floating">
                 <textarea
                     name="description"
                     className="form-control"
                     value={updateTrainingData.description}
                     onChange={updateEvent}
                     placeholder="Leave a comment here"
                     id="floatingTextarea2"
                     style={{ height: "100px", width: "41vw" }}
                 ></textarea>
                 <label htmlFor="floatingTextarea2">Description</label>
                 </div>
             </div>

             <div className={style.btn}>
                 <button
                 onClick={()=> updateTrainingHandler(updateTrainingData.id)}
                 type="submit"
                 className="btn btn-primary"
                 >
                 Submit
                 </button>
             </div>
             </form>
         </div>
       </div>
        )}

    {/* ------------ Update Intern --------------------- */}

    

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
                                    <h6>{el.startdate}-
                                    {el.enddate === "" ? "Currently Running" :  el.enddate}
                                    
                                    </h6>
                                </div>
                                <div className={style.ricn}>
                                    <HiOutlinePencil onClick={()=> findtrainHandler(el.id)} className={style.ri} />
                                    <RiDeleteBinLine onClick={()=>{deletetrain(el.id)}} className={style.ri} />
                                </div>
                            </div>
                    );
                })}

                  <div onClick={toggleIntern} className={style.add}>
                    <AiOutlinePlus className={style.addi} />
                    <h6>Add Training/Courses</h6>
                  </div>
                </div>
              </div>
            </div>
         </div>
    </>
  )
}

export default page