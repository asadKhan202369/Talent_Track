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

  useEffect(() => {
    if (functionCalled) {
      dispatch(asyncgetresume());
      dispatch(asyncgetresume());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

     
    {/* ------------ delete REsponsibility --------------------- */}

    const deletereproject = async (id) => {
      try {
        console.log("hit deletr");
        dispatch(asyncdeleteproject(id));
        setFunctionCalled(true);
        console.log("deleted");
      } catch (error) {
        console.log(error);
      }
    };

 {/* ------------ delete REsponsibility --------------------- */}

 {/* ------------ update projects --------------------- */}

   

  useEffect(() => {
    setUpdateProjectData(findproject);  
  }, [findproject]);
  console.log(updateProjectData,"its projects")

  const updateEvent = (event) => {
    const { name, value } = event.target;
    setUpdateProjectData  ((preData) => {
    return {
        ...preData,
        [name]: value,
    };
    });
  };

  const resetUpdateProject = () => {
    setUpdateProjectData('')
  };

  const updateProjectHandler = async (id) => {
    try {
      event.preventDefault();
      dispatch(asyncupdateproject(id, updateProjectData));
      resetUpdateProject();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
 };



  const findProjectHandler = async (id) => {
    try {
      dispatch(asyncfindProject(id)) 
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
 };

 {/* ------------ update projects --------------------- */}



      {/* ------------ add Project --------------------- */}

      const initialProjectData = {
        startmonth: "",
        endmonth: "",
        title:"",
        description: "",
        plink:"",
        currentlyWorking: false, // Add this state
        // Add more fields as needed
      };
      

      const toggleProject = () => {
        setShowProjects(!showProjects);
      };

      const [projectData, setprojectData] = useState(initialProjectData);

      // const inputprojectEvent = (event) => {
      //   const { name, value } = event.target;

      //   setprojectData((preData) => {
      //     return {
      //       ...preData,
      //       [name]: value,
      //     };
      //   });
      // };

      const inputprojectEvent = (e) => {
        const { name, value, type, checked } = e.target;
        setprojectData((prevData) => ({
          ...prevData,
          [name]: type === "checkbox" ? checked : value, // Handle checkbox input
        }));
      };

      
      const projectform = async (e) => {
        e.preventDefault();
        try {
          dispatch(asyncaddProject(projectData))
          setprojectData(initialProjectData); // Reset form fields
          setShowProjects(!showProjects);
         setFunctionCalled(true);
        } catch (error) {
          console.log(error);
        }
      };

      {/* ------------ add Project --------------------- */}

  return (
    <>
      {/* ------------ add Project --------------------- */}

      {showProjects && (
        <div style={{ display: "initial" }} className={style.edu_form}>
          <div className={style.e_head}>
            <h6>Project details</h6>
            <AiOutlineClose className={style.close} onClick={toggleProject} />
          </div>
           <div className={style.form_div}>
            <form onSubmit={projectform}>
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
                  Title
                </label>
                <input
                  value={projectData.title}
                  onChange={inputprojectEvent}
                  name="title"
                  placeholder="e.g Your Project Title"
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
                      value={projectData.startmonth}
                      onChange={inputprojectEvent}
                      name="startmonth"
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
                      value={projectData.endmonth}
                      onChange={inputprojectEvent}
                      name="endmonth"
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
                    checked={projectData.currentlyWorking}
                    onChange={inputprojectEvent}
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
                    value={projectData.description}
                    onChange={inputprojectEvent}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Description (Optional)</label>
                </div>
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
                  Project link(Optional)
                </label>
                <input
                  value={projectData.plink}
                  onChange={inputprojectEvent}
                  name="plink"
                  placeholder="e.g http://myprojectlink.com"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className={style.btn}>
                <button
                  onClick={projectform}
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

      {/* ------------ add Project --------------------- */}

      {/* ------------ edit Project --------------------- */}


      {updateProjectData && (
        <div style={{ display: "initial" }} className={style.edu_form}>
          <div className={style.e_head}>
            <h6>Project details</h6>
            <AiOutlineClose className={style.close} onClick={resetUpdateProject} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={()=> updateProjectHandler(updateProjectData.id)}>
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
                  Title
                </label>
                <input
                  value={updateProjectData.title}
                  onChange={updateEvent}
                  name="title"
                  placeholder="e.g Your Project Title"
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
                      value={updateProjectData.startmonth}
                      onChange={updateEvent}
                      name="startmonth"
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
                      value={updateProjectData.endmonth}
                      onChange={updateEvent}
                      name="endmonth"
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
                    value={updateProjectData.description}
                    onChange={updateEvent}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Description (Optional)</label>
                </div>
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
                  Project link(Optional)
                </label>
                <input
                  value={updateProjectData.plink}
                  onChange={updateEvent}
                  name="plink"
                  placeholder="e.g http://myprojectlink.com"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>

              <div className={style.btn}>
                <button
                  onClick={()=> updateProjectHandler(updateProjectData.id)}
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

      {/* ------------ edit Project --------------------- */}

    
      

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
                        <h6>{el.startmonth} -
                        {el.endmonth === "" ? "Currently Running" :  el.endmonth}
                        </h6>
                      </div>
                      <div className={style.ricn}>
                        <HiOutlinePencil className={style.ri} onClick={()=> findProjectHandler(el.id)} />
                        <RiDeleteBinLine className={style.ri} onClick={()=> deletereproject(el.id)} />
                      </div>
                </div>
              );
            })}

                 

                  <div onClick={toggleProject} className={style.add}>
                    <AiOutlinePlus className={style.addi} />
                    <h6>Add academic/ personal project</h6>
                  </div>
                </div>
              </div>
            </div>
      </div>

      
    </>
  )
}

export default page