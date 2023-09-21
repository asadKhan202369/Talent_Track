"use client";
import React, { useEffect, useState } from "react";
import Jobs from "@/app/employee/profile/applicant/components/Jobs/page";
import Education from "@/app/employee/profile/applicant/components/Education/page";
import Internships from "@/app/employee/profile/applicant/components/Internships/page";
import Training from "@/app/employee/profile/applicant/components/Training/page";
import Nav from "@/app/employee/components/Nav/page";
import Skills from "@/app/employee/profile/applicant/components/Skills/page";
import Accomplishment from "@/app/employee/profile/applicant/components/Accomplishment/page";
import Responsibility from "@/app/employee/profile/applicant/components/Responsibility/page";
import Portfoliow from "@/app/employee/profile/applicant/components/Portfoliow/page";
import Projects from "@/app/employee/profile/applicant/components/Projects/page";
import Details from "@/app/employee/profile/applicant/components/Details/page";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import { asynccurrentemployee } from "@/store/Actions/employeeAction";
import { asyncfindresume } from "@/store/Actions/studentActions";
import { AiOutlineClose } from "react-icons/ai";
import { asyncscheduleint } from "@/store/Actions/employeeAction";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/Footer";
import { asyncfindjob } from "@/store/Actions/employeeAction";

const page = () => {
  const dispatch = useDispatch();

  const [showJob, setShowJob] = useState(false);
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const { findjob } = useSelector((state) => state.employeeReducer);

  const { employee } = useSelector((state) => state.employeeReducer);
  const [jobid, setjobid] = useState("");
  const [sid, setsid] = useState("");

  useEffect(() => {
    const currentURL = window.location.href;
    const url = currentURL.split("/");
    setsid(url[7]);
    setjobid(url[8]);
  }, [sid, dispatch]);

  // useEffect(() => {
  //   dispatch(asynccurrentemployee());
  // }, [asynccurrentemployee]);

  useEffect(() => {
    if(jobid){
      dispatch(asynccurrentemployee());
      findJobDetails();
    }
  }, [jobid,asynccurrentemployee]);
 
  const findJobDetails = () => {
    dispatch(asyncfindjob(jobid));
  };

  useEffect(() => {
    dispatch(asyncfindresume(sid));
  }, [sid, dispatch]);

  {
    /* ------------ add job --------------------- */
  }

  const initialJobData = {
    imd: "",
    date: "",
    time: "",
    location: "",
    job: "",
    // job:""
  };

  const [jobData, setjobData] = useState(initialJobData);

  const inputjobEvent = (event) => {
    const { name, value } = event.target;

    setjobData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const Jobform = async (sid) => {
    event.preventDefault();
    try {
      dispatch(asyncscheduleint(sid, jobid, jobData));
      setjobData(initialJobData); // Reset form fields
      setShowJob(false);
      // setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleJob = () => {
    setShowJob(!showJob);
  };

  return (
    <>
        {student?.interview?.length > 0 ? (

          <div className={style.main}>
            {/* ------------ add job --------------------- */}

            {showJob && (
              <div
                // className={style.edu_form}
                className={`${style.edu_form} ${style.addjob_form}`}
              >
                <div className={style.e_head}>
                  <h6>Schedule Interview</h6>
                  <AiOutlineClose className={style.close} onClick={toggleJob} />
                </div>
                <div className={style.form_div}>
                  <form onSubmit={() => Jobform(sid)}>
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
                        Interview Mode
                      </label>
                      <select
                        value={jobData.imd}
                        onChange={inputjobEvent}
                        name="imd"
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="percentage">Interview Mode</option>
                        <option value="In office">In office</option>
                        <option value="Online">Online</option>
                      </select>
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
                            Date
                          </label>
                          <input
                            value={jobData.date}
                            onChange={inputjobEvent}
                            name="date"
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
                            Time
                          </label>
                          <input
                            value={jobData.time}
                            onChange={inputjobEvent}
                            name="time"
                            placeholder="e.g Mumbai"
                            type="time"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>
                    </div>

                    <div className={style.btn}>
                      <button
                        onClick={() => Jobform(sid)}
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
            <Nav student={employee} isAuthenticated={isAuthenticated} />
            <div className={style.head}>
              <h3>Candidate Resume for {findjob.title}</h3>
            </div>
            <div className={style.resume_container}>
              {student && student.resume && <Details student={student} />}
              {student && student.resume && (
                <Education education={student.resume.education} />
              )}
              {student && student.resume && <Jobs jobs={student.resume.jobs} />}

              {student && student.resume && (
                <Internships internship={student.resume.internship} />
              )}

              {student && student.resume && (
                <Responsibility
                  responsibilities={student.resume.responsibilities}
                />
              )}
              {student && student.resume && (
                <Training train={student.resume.train} />
              )}
              {student && student.resume && (
                <Projects projects={student.resume.projects} />
              )}
              {student && student.resume && (
                <Skills skills={student.resume.skills} />
              )}

              {student && student.resume && (
                <Portfoliow link={student.resume.portfolio} />
              )}
              {student && student.resume && (
                <Accomplishment achive={student.resume.accomplishments} />
              )}
            </div>

            {student?.interview?.length > 0 ? (
              student.interview.map((el, i) => (
                <div key={i} className={style.btm}>
                  {el.job === jobid ? (
                    <div>
                      <small>Scheduled</small>
                    </div>
                  ) : (
                    <>
                      <small>Reject Resume</small>
                      <small onClick={toggleJob}>Schedule Interview</small>
                    </>
                  )}
                </div>
              ))
            ) : (
               <h1>h1llo</h1>
            )}
                  <Footer/>
          </div>

        ) : (
          <Loader />
        )}


    </>
  );
};

export default page;
