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



   {/* ------------ add Responsibility --------------------- */}
    
   const initialachiveData = {
    description: "",
    // Add more fields as needed
  };

  const toggleAchive = () => {
    setShowAchive(!showAchive);
  };

  const [achiveData, setachiveData] = useState(initialachiveData);

  const inputAchiveEvent = (event) => {
    const { name, value } = event.target;

    setachiveData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };
    
  const Achiveform = async (e) => {
      e.preventDefault();
      try {
        dispatch(asyncaddachive(achiveData))
        setachiveData(initialachiveData); // Reset form fields
        setShowAchive(!showAchive);
        setFunctionCalled(true);
      } catch (error) {
        console.log(error);
      }
  };



  //   {/* ------------ update job --------------------- */}
   
  useEffect(() => {
    setUpdateAchiveData(findachive);  
  }, [findachive]);
      
  const updateachiveEvent = (event) => {
    const { name, value } = event.target;
    setUpdateAchiveData((preData) => {
    return {
        ...preData,
        [name]: value,
    };
    });
  };


  const resetUpdateAchiveData = () => {
      setUpdateAchiveData('')
  };

  const findAchiveHandler = async (id) => {
      try {
        dispatch(asyncfindAchive(id))  
      } catch (error) {
        console.log(error);
      }
  };

  const updateAchiveHandler = async (id) => {
      try {
        event.preventDefault();
        dispatch(asyncupdateachive(id, updateAchiveData));
        resetUpdateAchiveData();
        setFunctionCalled(true);
      } catch (error) {
        console.log(error);
      }
  };

// {/* ------------ update job --------------------- */}


  
    {/* ------------ delete achive --------------------- */}

    const deleteachive = async (id) => {
      try {
        console.log("hit deletr");
        dispatch(asyncdeleteachive(id));
        setFunctionCalled(true);
        console.log("deleted");
      } catch (error) {
        console.log(error);
      }
    };

 {/* ------------ delete REsponsibility --------------------- */}


  
  return (
    <>
       {/* ------------ add CCOMPLISHMENTS --------------------- */}

       {showAchive && (
          <div style={{ display: "initial" }} className={style.edu_form}>
          <div className={style.e_head}>
            <h6>Additional details</h6>
           <AiOutlineClose className={style.close} onClick={toggleAchive} />    

          </div>
          <div className={style.form_div}>
            <form onSubmit={Achiveform}>
              <div className={style.popup}>
                <h6>
                    Add your accomplishments such as rewards, recognitions, test scores, certifications, etc. here. You may also add information such as seminars/workshops you have attended or any interests/hobbies you have pursued.
                </h6>
              </div>
              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={achiveData.description}
                    name="description"
                    onChange={inputAchiveEvent}
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "200px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">E.g Secured 1st rank among 500 entries in national level story writing ...</label>
                </div>
              </div>

              <div className={style.btn}>
                <button
                  onClick={Achiveform}
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

        {updateAchiveData && (
              <div style={{ display: "initial" }} className={style.edu_form}>
              <div className={style.e_head}>
                <h6>Additional details</h6>
              <AiOutlineClose className={style.close} onClick={resetUpdateAchiveData} />    

              </div>
              <div className={style.form_div}>
                <form onSubmit={()=> updateAchiveHandler(updateAchiveData.id)}>
                  <div className={style.popup}>
                    <h6>
                        Add your accomplishments such as rewards, recognitions, test scores, certifications, etc. here. You may also add information such as seminars/workshops you have attended or any interests/hobbies you have pursued.
                    </h6>
                  </div>
                  <div style={{ marginTop: "5vh" }} className={style.dates}>
                    <div className="form-floating">
                      <textarea
                        name="description"
                        value={updateAchiveData.description}
                        onChange={updateachiveEvent}
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style={{ height: "200px", width: "41vw" }}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">E.g Secured 1st rank among 500 entries in national level story writing ...</label>
                    </div>
                  </div>

                  <div className={style.btn}>
                    <button
                      onClick={()=> updateAchiveHandler(updateAchiveData.id)}
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
                          <div className={style.ricn}>
                            <HiOutlinePencil className={style.ri} onClick={()=> findAchiveHandler(el.id)} />
                            <RiDeleteBinLine className={style.ri} onClick={()=> deleteachive(el.id)} />
                          </div>
                        </div>
                      )
                  })}
                 

                  <div onClick={toggleAchive} className={style.add}>
                    <AiOutlinePlus className={style.addi} />
                    <h6>Add accomplishment/ additional detail</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default page