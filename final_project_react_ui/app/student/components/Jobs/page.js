"use client";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import React from "react";
import {
  asyncaddjob,
  asyncfindjob,
  asyncupdatejob,
  asyncdeletejob,
} from "@/store/Actions/studentresumeActions";
import style from "@/app/student/resume/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { asyncgetresume } from "@/store/Actions/studentActions";

const page = () => {
  const { student, resume, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const { findjob } = useSelector((state) => state.studentReducers);
  const dispatch = useDispatch();
  const [showJob, setShowJob] = useState(false);
  const [jobs, setjobs] = useState([]);
  const [currentjob, setcurrentjob] = useState({});
  const [updateData, setUpdateData] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const [functionCalled, setFunctionCalled] = useState(false);

  useEffect(() => {
    if (student && student.resume) {
      setjobs(student.resume.jobs);
    }
  }, [student]);

  useEffect(() => {
    if (functionCalled) {
      dispatch(asyncgetresume());
      dispatch(asyncgetresume());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  const toggleJob = () => {
    setShowJob(!showJob);
  };

  {
    /* ------------ update job --------------------- */
  }

  useEffect(() => {
    setUpdateData(findjob);
    // setIsChecked(event.target.checked);
  }, [findjob]);

  const updateEvent = (event) => {
    const { name, value } = event.target;
    setUpdateData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const resetUpdateData = () => {
    setUpdateData("");
  };

  const findjobHandler = async (id) => {
    try {
      // const { data } = await axios.get(`/resume/findj/${id}`);
      dispatch(asyncfindjob(id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateJobHandler = async (id) => {
    try {
      event.preventDefault();
      dispatch(asyncupdatejob(id, updateData));
      resetUpdateData();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* ------------ update job --------------------- */
  }

  {
    /* ------------ add job --------------------- */
  }

  const initialJobData = {
    profile: "",
    startdate: "",
    organization: "",
    enddate: "",
    location: "",
    description: "",
    currentlyWorking: false, // Add this state
    // Add more fields as needed
  };

  const [jobData, setjobData] = useState(initialJobData);

  // const inputjobEvent = (event) => {
  //   const { name, value } = event.target;

  //   setjobData((preData) => {
  //     return {
  //       ...preData,
  //       [name]: value,
  //     };
  //   });
  // };

  const inputjobEvent = (e) => {
    const { name, value, type, checked } = e.target;
    setjobData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox input
    }));
  };


  const Jobform = async (e) => {
    e.preventDefault();
    try {
      dispatch(asyncaddjob(jobData));
      setjobData(initialJobData);   
      setShowJob(!showJob);
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* ------------ add job --------------------- */
  }

  {
    /* ------------ delete job --------------------- */
  }

  const deleteJob = async (id) => {
    try {
      dispatch(asyncdeletejob(id));
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* ------------ delete job --------------------- */
  }

  return (
    <>
      <div className={style.main}>
        {/* ------------ add job --------------------- */}

        {showJob && (
          <div
            // className={style.edu_form}
            className={`${style.edu_form} ${style.addjob_form}`}
          >
            <div className={style.e_head}>
              <h6>Job details</h6>
              <AiOutlineClose className={style.close} onClick={toggleJob} />
            </div>
            <div className={style.form_div}>
              <form onSubmit={Jobform}>
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
                    value={jobData.profile}
                    onChange={inputjobEvent}
                    name="profile"
                    placeholder="e.g Operation"
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
                    value={jobData.organization}
                    onChange={inputjobEvent}
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
                    value={jobData.location}
                    onChange={inputjobEvent}
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
                        value={jobData.startdate}
                        onChange={inputjobEvent}
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
                        value={jobData.enddate}
                        onChange={inputjobEvent}
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
                    checked={jobData.currentlyWorking}
                    onChange={inputjobEvent}
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
                <div style={{ marginTop: "5vh" }} className={style.dates}>
                  <div className="form-floating">
                    <textarea
                      //  defaultValue={jobData.description}
                      value={jobData.description}
                      onChange={inputjobEvent}
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
                    onClick={Jobform}
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

        {/* ------------ add job --------------------- */}

        {/* ------------ update job --------------------- */}

        {updateData && (
          <div className={`${style.edu_form} ${style.addjob_form}`}>
            <div className={style.e_head}>
              <h6>Edit Job details</h6>
              <AiOutlineClose
                className={style.close}
                onClick={resetUpdateData}
              />
            </div>
            <div className={style.form_div}>
              <form onSubmit={() => updateJobHandler(updateData.id)}>
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
                    value={updateData.profile}
                    onChange={updateEvent}
                    name="profile"
                    placeholder="e.g Operation"
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
                    value={updateData.organization}
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
                    value={updateData.location}
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
                        value={updateData.startdate}
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
                        value={updateData.enddate}
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
                      defaultValue={updateData.description}
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
                    onClick={() => updateJobHandler(updateData.id)}
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

        {/* ------------ update job --------------------- */}

        <div className={style.rsm}>
          <div className={style.edu}>
            <div className={style.l_edu}>
              <h4>JOBS</h4>
            </div>
            <div className={style.r_edu}>
              <div className={style.rows}>
                {jobs.map((el, i) => {
                  return (
                    <div key={i} className={style.row_container}>
                      <div className={style.row}>
                        <h5>{el.profile}</h5>
                        <h6>{el.organization}</h6>
                        <h6>
                          {el.startdate}-
                          {el.enddate === "" ? "Currently Working" :  el.enddate}
                         
                        </h6>
                      </div>
                      <div className={style.ricn}>
                        <HiOutlinePencil
                          onClick={() => findjobHandler(el.id)}
                          className={style.ri}
                        />
                        <RiDeleteBinLine
                          onClick={() => {
                            deleteJob(el.id);
                          }}
                          className={style.ri}
                        />
                      </div>
                    </div>
                  );
                })}

                <div onClick={toggleJob} className={style.add}>
                  <AiOutlinePlus className={style.addi} />
                  <h6>Add education</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
