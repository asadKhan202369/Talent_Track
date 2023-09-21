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
  const { findintern} = useSelector((state) => state.studentReducers); 
   const dispatch = useDispatch();
   const [showIntern, setShowIntern] = useState(false);
   const [internship, setinternship] = useState([]);
   const [updateInternData, setUpdateInternData] = useState('');
   
   const [functionCalled, setFunctionCalled] = useState(false);

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



  //   {/* ------------ update job --------------------- */}
   
    useEffect(() => {
      setUpdateInternData(findintern);  
    }, [findintern]);
        
    const updateEvent = (event) => {
      const { name, value } = event.target;
      setUpdateInternData((preData) => {
      return {
          ...preData,
          [name]: value,
      };
      });
    };


    const resetUpdateInternData = () => {
        setUpdateInternData('')
    };

    const findinternHandler = async (id) => {
        try {
          dispatch(asyncfindintern(id))  
        } catch (error) {
          console.log(error);
        }
    };

    const updateInternHandler = async (id) => {
        try {
          event.preventDefault();
          dispatch(asyncupdateintern(id, updateInternData));
          resetUpdateInternData();
          setFunctionCalled(true);
        } catch (error) {
          console.log(error);
        }
    };

  // {/* ------------ update job --------------------- */}

   
    {/* ------------ delete intern --------------------- */}

    const deleteintern = async (id) => {
      try {
        console.log("hit deletr");
        dispatch(asyncdeleteintern(id));
        setFunctionCalled(true);

      } catch (error) {
        console.log(error);
      }
    };

 {/* ------------ delete intern --------------------- */}


    {/* ------------ add Intern --------------------- */}
    
        const initialinternData = {
          profile: "",
          startdate: "",
          organization: "",
          enddate: "",
          location: "",
          description: "",
          // Add more fields as needed
         currentlyWorking: false, // Add this state
        };

        const toggleIntern = () => {
          setShowIntern(!showIntern);
        };

        const [internData, setinternData] = useState(initialinternData);

        // const inputinternEvent = (event) => {
        //   const { name, value } = event.target;

        //   setinternData((preData) => {
        //     return {
        //       ...preData,
        //       [name]: value,
        //     };
        //   });
        // };

        
      const inputinternEvent = (e) => {
        const { name, value, type, checked } = e.target;
        setinternData((prevData) => ({
          ...prevData,
          [name]: type === "checkbox" ? checked : value, // Handle checkbox input
        }));
      };

          
        const Internfor = async (e) => {
            e.preventDefault();
            try {
              dispatch(asyncaddintern(internData))
              setinternData(initialinternData); // Reset form fields
              setShowIntern(!showIntern);
              setFunctionCalled(true);
            } catch (error) {
              console.log(error);
            }
        };

    {/* ------------ add Intern --------------------- */}


  return (
    <>
    {/* ------------ add Intern --------------------- */}
 
    {showIntern && (
          <div
          className={`${style.edu_form} ${style.addintern_form}`}
        
      >
        <div className={style.e_head}>
        <AiOutlineClose className={style.close} onClick={toggleIntern} />    
          <h6>Intern details</h6>
        </div>
        <div className={style.form_div}>
          <form onSubmit={Internfor}>
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
                Profile
              </label>
              <input
                value={internData.profile}
                onChange={inputinternEvent}
                name="profile"
                placeholder="e.g Sales & Marketing"
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
                value={internData.organization}
                onChange={inputinternEvent}
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
                value={internData.location}
                onChange={inputinternEvent}
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
                    value={internData.startdate}
                    onChange={inputinternEvent}
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
                    value={internData.enddate}
                    onChange={inputinternEvent}
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
                    checked={internData.currentlyWorking}
                    onChange={inputinternEvent}
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
                    Currently Working
                  </label>
              </div>

            {/* <div className={style.popup}>
              <h6>Pro tip:</h6>
              <h6>
                Mention key internship responsibilities in max 3-4 points
              </h6>
              <h6>
                Use action verbs: Built, Led, Drove, Conceptualized, Learnt,
                etc.
              </h6>
            </div> */}
            <div style={{ marginTop: "5vh" }} className={style.dates}>
              <div className="form-floating">
                <textarea
                  value={internData.description}
                  onChange={inputinternEvent}
                  name="description"
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px", width: "41vw" }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Description</label>
              </div>
            </div>

            <div className={style.btn}>
              <button
                onClick={Internfor}
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
 
        {updateInternData && (
          <div
          className={`${style.edu_form} ${style.addintern_form}`}
        
         >
        <div className={style.e_head}>
        <AiOutlineClose className={style.close} onClick={resetUpdateInternData} />    
          <h6>Edit Internship details</h6>
        </div>
        <div className={style.form_div}>

          <form onSubmit={()=> updateInternHandler(updateInternData.id)}>
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
                Profile
              </label>
              <input
                value={updateInternData.profile}
                onChange={updateEvent}
                name="profile"
                placeholder="e.g Sales & Marketing"
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
                value={updateInternData.organization}
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
                value={updateInternData.location}
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
                    value={updateInternData.startdate}
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
                    value={updateInternData.enddate}
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
                  value={updateInternData.description}
                  onChange={updateEvent}
                  name="description"
                  className="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px", width: "41vw" }}
                ></textarea>
                <label htmlFor="floatingTextarea2">Description</label>
              </div>
            </div>

            <div className={style.btn}>
              <button
                onSubmit={()=> updateInternHandler(updateInternData.id)}
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
                                    <h6>{el.startdate}-
                                        {el.enddate === "" ? "Currently Running" :  el.enddate}
                              
                                    </h6>
                                </div>
                                <div className={style.ricn}>
                                    <HiOutlinePencil onClick={()=> findinternHandler(el.id)} className={style.ri} />
                                    <RiDeleteBinLine onClick={()=>{deleteintern(el.id)}} className={style.ri} />
                                </div>
                            </div>
                    );
                })}

                  <div onClick={toggleIntern} className={style.add}>
                    <AiOutlinePlus className={style.addi} />
                    <h6>Add internship</h6>
                  </div>
                </div>
              </div>
            </div>
         </div>
    </>
  )
}

export default page