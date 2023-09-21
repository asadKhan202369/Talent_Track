"use client";
import React from "react";
import style from "./style.module.css";
import Nav from "@/components/Nav/Nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/Footer";

import {
  asyncdeletecourse,
  asyncfindcourse,
  asynccurrentstudent,
  asyncupdatecourse,
} from "@/store/Actions/studentActions";

const profile = () => {
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const { findcourse } = useSelector((state) => state.studentReducers);
  const [updateJobData, setUpdateJobData] = useState("");
  const [up, setup] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  useEffect(() => {
    if (functionCalled) {
      dispatch(asynccurrentstudent());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  useEffect(() => {
    setUpdateJobData(findcourse);
  }, [findcourse]);

  const updateEvent = (event) => {
    const { name, value } = event.target;
    setUpdateJobData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  console.log(updateJobData, "its dtdt");

  const findjobHandler = async (id) => {
    try {
      dispatch(asyncfindcourse(id));
    } catch (error) {
      console.log(error);
    }
  };

  const resetUpdateJobData = () => {
    setUpdateJobData("");
  };

  const updatecourseHandler = async (id) => {
    try {
      event.preventDefault();
      await dispatch(asyncupdatecourse(id, updateJobData));
      resetUpdateJobData();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deletejob = async (id) => {
    try {
      await dispatch(asyncdeletecourse(id));
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(student, "its apna stdny");

  return (
    <>
      {updateJobData && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Edit Course</h6>
            <MdClose className={style.close} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={() => updatecourseHandler(updateJobData._id)}>
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
                  Course name
                </label>
                <input
                  value={updateJobData.cname}
                  onChange={updateEvent}
                  name="cname"
                  placeholder="e.g Front End Developer"
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
                  Course Price
                </label>
                <input
                  value={updateJobData.price}
                  onChange={updateEvent}
                  name="price"
                  placeholder="e.g node js,Figma,Adobe"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
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
                    Class Projects
                  </label>
                  <input
                    value={updateJobData.cprojects}
                    onChange={updateEvent}
                    name="cprojects"
                    placeholder="e.g 3"
                    type="number"
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
                    Start Date
                  </label>
                  <input
                    value={updateJobData.ldate}
                    onChange={updateEvent}
                    name="ldate"
                    type="date"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>

              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={updateJobData.description}
                    onChange={updateEvent}
                    name="description"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Description of the course
                  </label>
                </div>
              </div>

              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={updateJobData.sdes}
                    onChange={updateEvent}
                    name="sdes"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Short tag line of the course{" "}
                  </label>
                </div>
              </div>

              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={updateJobData.details}
                    onChange={updateEvent}
                    name="details"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Details of the course
                  </label>
                </div>
              </div>

              <div className={style.btn}>
                <button
                  onClick={() => updatecourseHandler(updateJobData._id)}
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

      {student ? (
        <>
          <Nav student={student} isAuthenticated={isAuthenticated} />

          <div className={style.main}>
            {student && student.admin === true ? (
              <>
                <h1>courses You Have Created</h1>
                {student.Mycourses && student.Mycourses.length > 0 ? (
                  <div className={style.cards}>
                    {student.Mycourses.map((job, index) => (
                      <div key={index} className={style.s_contain}>
                        <div className={style.simgc}>
                          <img src={job.cpic.url} alt="" />
                        </div>
                        <div className={style.scard}>
                          <div className={style.shead}>
                            <h3>{job.cname}</h3>
                            {/* <small>{job.sdes}</small> */}
                            <h4>{student.organisationname}</h4>
                          </div>
                          <div className={style.ra}>
                            <div
                              style={{ margin: "initial" }}
                              className={style.jtyp}
                            >
                              <h6>Mode : </h6>
                              <small>Online</small>
                            </div>
                            <div className={style.jtyp}>
                              <h6>Price : </h6>
                              <small>{job.price}/-</small>
                            </div>
                          </div>
                          <div className={style.stt}>
                            <div className={style.wtc}>
                              <h6>Start date : </h6>
                              <h6>{job.ldate}</h6>
                            </div>
                            <small>
                            Enrolled : {job.enrolled.length} &nbsp;
                            {job.enrolled.length === 1 ? "student" : "students"}
                            </small>
                          </div>
                          
                          <div className={style.sbtm}>
                            <small onClick={() => findjobHandler(job._id)}>
                              <HiPencil />
                              Edit
                            </small>
                            <small onClick={() => deletejob(job._id)}>
                              <RiDeleteBinLine />
                              Delete
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={style.content}>
                    <div className={style.msg}>
                      <h4>You have not created/posted a course yet</h4>
                      <Link
                        style={{ textDecoration: "none" }}
                        href="/student/profile"
                      >
                        <div className={style.ebtn}>Add Now</div>
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <h1>Courses You Have Enrolled</h1>
                {student.Ecourses && student.Ecourses.length > 0 ? (
                  <div className={style.cards}>
                    {student.Ecourses.map((job, index) => (
                      <div key={index} className={style.s_contain}>
                        <div className={style.simgc}>
                          <img src={job.courseid.cpic.url} alt="" />
                        </div>
                        <div className={style.scard}>
                          <div className={style.shead}>
                            <h3>{job.courseid.cname}</h3>
                            {/* <small>{job.sdes}</small> */}
                            <h4>{student.organisationname}</h4>
                          </div>
                          <div className={style.ra}>
                            <div
                              style={{ margin: "initial" }}
                              className={style.jtyp}
                            >
                              <h6>Mode : </h6>
                              <small>Online</small>
                            </div>
                            <div className={style.jtyp}>
                              <h6>Price : </h6>
                              <small>{job.courseid.price}/-</small>
                            </div>
                          </div>
                          <div className={style.stt}>
                            <div className={style.wtc}>
                              <h6>Start date : </h6>
                              <h6>{job.courseid.ldate}</h6>
                            </div>
                          </div>
                          <div
                            className={style.sbtm}
                            style={{ justifyContent: "flex-end" }}
                          >
                            <small>
                              <BsFillCheckCircleFill />
                              Paid
                            </small>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={style.content}>
                    <div className={style.msg}>
                      <h4>You have not created/posted a course yet</h4>
                      <Link
                        style={{ textDecoration: "none" }}
                        href="/student/profile"
                      >
                        <div className={style.ebtn}>Add Now</div>
                      </Link>
                    </div>
                  </div>
                )}
              </>
            )}

            <Footer />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default profile;
