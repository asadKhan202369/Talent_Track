import React from 'react'
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from 'react';
import style from "@/app/student/resume/style.module.css"
import { asyncaddResponsibility,asyncfindResponsibility,asyncupdateresp,asyncdeleteresp,asyncdeleteskill } from "@/store/Actions/studentresumeActions"
import { useDispatch , useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai"
import { useEffect } from 'react';
import { asyncgetresume } from "@/store/Actions/studentActions"


const page = () => {
  const { student,resume, isAuthenticated} = useSelector((state) => state.studentReducers); 
  const { findResponsibility} = useSelector((state) => state.studentReducers); 
   const dispatch = useDispatch();
   const [showResponsibility, setShowResponsibility] = useState(false);
   const [Responsibility, setResponsibility] = useState([]);
   const [updateResponsibilityData, setUpdateResponsibilityData] = useState('');
  const [functionCalled, setFunctionCalled] = useState(false);


   useEffect(()=>{
    if (student && student.resume) {
      setResponsibility(student.resume.responsibilities);
    }
  },[student])

       
  useEffect(() => {
    if (functionCalled) {
      dispatch(asyncgetresume());
      dispatch(asyncgetresume());
      setFunctionCalled(false);
    }
  }, [functionCalled]);




  //   {/* ------------ update Responsibility --------------------- */}
   
    useEffect(() => {
      setUpdateResponsibilityData(findResponsibility);  
    }, [findResponsibility]);
        
    console.log(updateResponsibilityData,"ists updatat");
    const updateEvent = (event) => {
      const { name, value } = event.target;
      setUpdateResponsibilityData((preData) => {
      return {
          ...preData,
          [name]: value,
      };
      });
    };


    const resetUpdateResponsibilityData = () => {
        setUpdateResponsibilityData('')
    };

    const findResponsibilityHandler = async (id) => {
        try {
          dispatch(asyncfindResponsibility(id))  
        } catch (error) {
          console.log(error);
        }
    };

    const updateResponsibilityHandler = async (id) => {
        try {
          event.preventDefault();
          dispatch(asyncupdateresp(id, updateResponsibilityData));
          resetUpdateResponsibilityData();
          setFunctionCalled(true);
        } catch (error) {
          console.log(error);
        }
    };

  // {/* ------------ update Responsibility --------------------- */}

   
    {/* ------------ delete REsponsibility --------------------- */}

    const deletereskill = async (id) => {
      try {
        console.log("hit deletr");
        dispatch(asyncdeleteresp(id));
        setFunctionCalled(true);
      } catch (error) {
        console.log(error);
      }
    };

 {/* ------------ delete REsponsibility --------------------- */}


    {/* ------------ add Responsibility --------------------- */}
    
        const initialresponsibilityData = {
          description: "",
          // Add more fields as needed
        };

        const toggleREsponsibility = () => {
          setShowResponsibility(!showResponsibility);
        };

        const [responsibilityData, setresponsibilityData] = useState(initialresponsibilityData);

        const inputresponsibilityEvent = (event) => {
          const { name, value } = event.target;

          setresponsibilityData((preData) => {
            return {
              ...preData,
              [name]: value,
            };
          });
        };
          
        const Responsibilityform = async (e) => {
            e.preventDefault();
            try {
              dispatch(asyncaddResponsibility(responsibilityData))
              setresponsibilityData(initialresponsibilityData); // Reset form fields
              setShowResponsibility(!showResponsibility);
              setFunctionCalled(true);
            } catch (error) {
              console.log(error);
            }
        };

    {/* ------------ add Responsibility --------------------- */}
    

  return (
    <>
    {/* ------------ add Intern --------------------- */}
 
    {showResponsibility && (
           <div className={style.edu_form}>
           <div className={style.e_head}>
             <h6>Position of responsibility</h6>
        <AiOutlineClose className={style.close} onClick={toggleREsponsibility} />    

           </div>
           <div className={style.form_div}>
             <form onSubmit={Responsibilityform}>
               <div className={style.popup}>
                 <h6>Description</h6>
                 <h6>
                   If you have been/are an active part of societies, conducted any
                   events or led a team, add details here
                 </h6>
               </div>
               <div style={{ marginTop: "5vh" }} className={style.dates}>
                 <div className="form-floating">
                   <textarea
                     name="description"
                     onChange={inputresponsibilityEvent}
                     className="form-control"
                     placeholder="Leave a comment here"
                     id="floatingTextarea2"
                     style={{ height: "200px", width: "41vw" }}
                   ></textarea>
                   <label htmlFor="floatingTextarea2">Description</label>
                 </div>
               </div>
   
               <div className={style.btn}>
                 <button
                   onClick={Responsibilityform}
                   type="submit"
                   className="btn btn-primary"
                 >
                   Save
                 </button>
               </div>
             </form>
           </div>
           </div>
    )}

    {/* ------------ add Intern --------------------- */}

    {/* ------------ Update Intern --------------------- */}
 
        {updateResponsibilityData && (
          <div className={style.edu_form}>
          <div className={style.e_head}>
            <h6>Edit Position of responsibility</h6>
       <AiOutlineClose className={style.close} onClick={resetUpdateResponsibilityData} />    

          </div>
          <div className={style.form_div}>
            <form onSubmit={() => updateResponsibilityHandler(updateResponsibilityData.id)}>
              <div className={style.popup}>
                <h6>Description</h6>
                <h6>
                  If you have been/are an active part of societies, conducted any
                  events or led a team, add details here
                </h6>
              </div>
              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    name="description"
                    value={updateResponsibilityData.description}
                    onChange={updateEvent}
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "200px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Description</label>
                </div>
              </div>
  
              <div className={style.btn}>
                <button
                  onClick={() => updateResponsibilityHandler(updateResponsibilityData.id)}
                  type="submit"
                  className="btn btn-primary"
                >
                  Save
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
                <h4>POSITIONS OF RESPONSIBILITY</h4>
              </div>
              <div className={style.r_edu}>
              {Responsibility && (
        <div className={style.rows}>
            {Responsibility.map((el, i) => {
              
              return (
                  
                  <div key={i} className={style.row_container}>
                          <div className={style.row}>
                              <h6>{el.description}</h6>
                          </div>
                          <div className={style.ricn}>
                              <HiOutlinePencil onClick={()=> findResponsibilityHandler(el.id)} className={style.ri} />
                              <RiDeleteBinLine onClick={()=>{deletereskill(el.id)}} className={style.ri} />
                          </div>
                  </div>
              );
            })}

    
      </div>
               )}
               <div onClick={toggleREsponsibility} className={style.add}>
                <AiOutlinePlus className={style.addi} />
                <h6>Add POSITIONS OF RESPONSIBILITY</h6>
              </div>
                
              </div>
            </div>
         </div>
    </>
  )
}

export default page