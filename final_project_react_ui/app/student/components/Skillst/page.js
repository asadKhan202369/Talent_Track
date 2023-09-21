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
  const { student,resume, isAuthenticated} = useSelector((state) => state.studentReducers); 
  const { findskill } = useSelector((state) => state.studentReducers); 
  const [showskills, setShowskills] = useState(false);
  const [skillsData, setskillsData] = useState([]);
  const [updateSkilllsData, setUpdateSkilllsData] = useState('');
  const [functionCalled, setFunctionCalled] = useState(false);

      useEffect(()=>{
        if (student && student.resume) {
          setskillsData(student.resume.skills);
        }
      },[student])

      
      useEffect(() => {
        if (functionCalled) {
          dispatch(asyncgetresume());
          dispatch(asyncgetresume());
          setFunctionCalled(false);
        }
      }, [functionCalled]);

     useEffect(() => {
       setUpdateSkilllsData(findskill);  
     }, [findskill]);


    const updateEvent = (event) => {
      const { name, value } = event.target;
      setUpdateSkilllsData((preData) => {
      return {
          ...preData,
          [name]: value,
      };
      });
    };

    const resetUpdateSkillData = () => {
        setUpdateSkilllsData('')
    };

    
    const findskillHandler = async (id) => {
      try {
        dispatch(asyncfindskill(id))  
      } catch (error) {
        console.log(error);
      }
     };
     

     const updateSkillHandler = async (id) => {
          try {
            event.preventDefault();
            dispatch(asyncupdateskill(id, updateSkilllsData));
            resetUpdateSkillData();
            setFunctionCalled(true);

          } catch (error) {
            console.log(error);
          }
     };
        

    
       {/* ------------ delete skill --------------------- */}

        const deleteskillHandler = async (id) => {
          try {
            console.log("hit deletr");
            dispatch(asyncskilldlete(id));
            dispatch(asyncgetresume());
            setFunctionCalled(true);
          } catch (error) {
            console.log(error);
          }
        };

        {/* ------------ delete skill --------------------- */}

       {/* ------------ add skill --------------------- */}

          const toggleskills = () => {
            setShowskills(!showskills);
          };


            const initialskillData = {
                srated:"",
                skill:""
                // Add more fields as needed
            };
              
          const [skillData, setskillData] = useState(initialskillData);


          const inputjobEvent = (event) => {
            const { name, value } = event.target;

            setskillData((preData) => {
              return {
                ...preData,
                [name]: value,
              };
            });
          };

            const skillform = async (e) => {
                e.preventDefault();
                try {
                  dispatch(asyncaddskill(skillData))
                  setskillData(initialskillData)
                  setShowskills(!showskills)
                   setFunctionCalled(true);
                } catch (error) {
                  console.log(error);
                }
            };

          {/* ------------ add skill --------------------- */}

  return (
    <>
    
       {/* ------------ add Skills --------------------- */}

      {showskills && (
          <div style={{display:"initial"}} className={style.edu_form}>
            <div className={style.e_head}>
              <h6>Skills</h6>
              <AiOutlineClose className={style.close} onClick={toggleskills} />    
            </div>
            <div className={style.form_div}>
              <form onSubmit={skillform}>
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
                    Add skills
                  </label>
                  <input
                    value={skillData.skill}
                    onChange={inputjobEvent}
                    name="skill"
                    placeholder="e.g Adobe Photoshop"
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                
              
                <div className={style.dates}>
                  <div style={{width:"100%"}} className={style.select}>
                    <label
                      style={{
                        fontFamily: "roobert",
                        fontSize: "1vmax",
                        fontWeight: "550",
                      }}
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      How would you rate yourself on this skill?
                    </label>
                    <select
                      value={skillData.srated}
                      onChange={inputjobEvent}
                      name="srated"
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="percentage">Rate Your Skill</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className={style.btn}>
                  <button
                    onClick={skillform}
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
      
      
      {updateSkilllsData && (
          <div style={{display:"initial"}} className={style.edu_form}>
            <div className={style.e_head}>
              <h6>Skills</h6>
              <AiOutlineClose className={style.close} onClick={resetUpdateSkillData} />    
            </div>
            <div className={style.form_div}>
              <form onSubmit={()=> updateSkillHandler(updateSkilllsData.id)}>
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
                    Add skills
                  </label>
                  <input
                    value={updateSkilllsData.skill}
                    onChange={updateEvent}
                    name="skill"
                    placeholder="e.g Adobe Photoshop"
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                
              
                <div className={style.dates}>
                  <div style={{width:"100%"}} className={style.select}>
                    <label
                      style={{
                        fontFamily: "roobert",
                        fontSize: "1vmax",
                        fontWeight: "550",
                      }}
                      htmlFor="exampleInputEmail1"
                      className="form-label"
                    >
                      How would you rate yourself on this skill?
                    </label>
                    <select
                      value={updateSkilllsData.srated}
                      onChange={updateEvent}
                      name="srated"
                      className="form-select"
                      aria-label="Default select example"
                    >
                      <option value="percentage">Rate Your Skill</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className={style.btn}>
                  <button
                    onClick={()=> updateSkillHandler(updateSkilllsData.id)}
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
                          <div className={style.sricn}>
                            <HiOutlinePencil className={style.sri} onClick={()=> findskillHandler(el.id)} />
                            <RiDeleteBinLine className={style.sri} onClick={()=> deleteskillHandler(el.id)} />
                          </div>
                       </div>
                    )
                })}
                 
                  

                  
                </div>
                <div onClick={toggleskills} className={style.sadd}>
                    <AiOutlinePlus className={style.saddi}  />
                    <h6>Add skill</h6>
                  </div>
              </div>
            </div>
       </div>
    </>
  )
}

export default page