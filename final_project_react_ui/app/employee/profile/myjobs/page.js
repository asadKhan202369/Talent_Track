"use client";
import React from "react";
import style from "./style.module.css";
import Nav from "@/app/employee/components/Nav/page";
import { asynccurrentemployee } from "@/store/Actions/employeeAction";
import { useDispatch, useSelector } from "react-redux";
import { BsCash } from "react-icons/bs";
import { IoIosTimer } from "react-icons/io";
import { GrHomeRounded } from "react-icons/gr";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { HiPencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import Loader from "@/components/loader/loader"
import {
  asyncfindjob,
  asyncupdatejob,
  asyncdeletejob,
} from "@/store/Actions/employeeAction";
import { useRouter } from "next/navigation";

const profile = () => {
  const router = useRouter();
  const { employee, isAuthenticated } = useSelector(
    (state) => state.employeeReducer
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/employee/profile/myjobs");
    } else {
      router.push("/employee/login");
    }
  }, [isAuthenticated]);

  const { findjob } = useSelector((state) => state.employeeReducer);
  const [updateJobData, setUpdateJobData] = useState("");
  const [up, setup] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccurrentemployee());
  }, [asynccurrentemployee]);

  useEffect(() => {
    if (functionCalled) {
      dispatch(asynccurrentemployee());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  useEffect(() => {
    setUpdateJobData(findjob);
  }, [findjob]);

  const updateEvent = (event) => {
    const { name, value } = event.target;
    setUpdateJobData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const findjobHandler = async (id) => {
    try {
      dispatch(asyncfindjob(id));
    } catch (error) {
      console.log(error);
    }
  };

  const resetUpdateJobData = () => {
    setUpdateJobData("");
  };

  const updateJobandler = async (id) => {
    try {
      event.preventDefault();
      await dispatch(asyncupdatejob(id, updateJobData));
      resetUpdateJobData();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const deletejob = async (id) => {
    try {
      await dispatch(asyncdeletejob(id));
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {updateJobData && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Edit Jobs/Internships</h6>
            <MdClose className={style.close} onClick={resetUpdateJobData} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={() => updateJobandler(updateJobData._id)}>
              <div className={style.selectin}>
                <div className={style.inp}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Opporunity Type
                  </label>
                  <div className={style.dates}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="otype"
                        id="flexRadioDefault2"
                        value={updateJobData.otype}
                        onChange={updateEvent}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Intern
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="otype"
                        id="flexRadioDefault1"
                        value={updateJobData.otype}
                        onChange={updateEvent}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Job
                      </label>
                    </div>
                  </div>
                </div>
                <div className={style.inp}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Work Type
                  </label>
                  <div className={style.dates}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="flexRadioDefault2"
                        value={updateJobData.type}
                        onChange={updateEvent}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Online
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="type"
                        id="flexRadioDefault1"
                        value={updateJobData.type}
                        onChange={updateEvent}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        In Office
                      </label>
                    </div>
                  </div>
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
                  Title
                </label>
                <input
                  value={updateJobData.title}
                  onChange={updateEvent}
                  name="title"
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
                  Skills (comma-separated):
                </label>
                <input
                  value={updateJobData.skills}
                  onChange={updateEvent}
                  name="skills"
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
                    Number Of Opening
                  </label>
                  <input
                    value={updateJobData.opening}
                    onChange={updateEvent}
                    name="opening"
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
                    Job Timing
                  </label>

                  <select
                    onChange={updateEvent}
                    name="time"
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>{updateJobData.time} </option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                  </select>
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
                  Deadline/Availability
                </label>
                <input
                  value={updateJobData.applicationDeadline}
                  onChange={updateEvent}
                  name="deadline"
                  type="date"
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
                    Stipend/Salary
                  </label>
                  <input
                    value={updateJobData.stipend}
                    onChange={updateEvent}
                    name="stipend"
                    placeholder="e.g 25000"
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
                    Experience
                  </label>
                  <input
                    value={updateJobData.experience}
                    onChange={updateEvent}
                    name="experience"
                    placeholder="e.g 2"
                    type="number"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
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
                  Location
                </label>
                <input
                  value={updateJobData.location}
                  onChange={updateEvent}
                  name="location"
                  placeholder="e.g Mumbai"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
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
                  <label htmlFor="floatingTextarea2">Description</label>
                </div>
              </div>

              <div className={style.btn}>
                <button
                  onClick={() => updateJobandler(updateJobData._id)}
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
      {employee && employee.job && employee.job.length > 0 ? (
        <>
          <Nav employee={employee} isAuthenticated={isAuthenticated} />

          <div className={style.main}>
            <h1>Jobs You Have Created</h1>

            {employee && employee.job && employee.job.length > 0 ? (
              <div className={style.cards}>
                {employee.job.map((job, index) => (
                  <div key={index} className={style.scard}>
                    <div className={style.shead}>
                      <h3>{job.title}</h3>
                      <h4>{employee.organisationname}</h4>
                    </div>
                    <div className={style.jtyp}>
                      {job.type === "Online" ? (
                        <>
                          <GrHomeRounded
                            style={{ color: "#33333" }}
                            className={style.j}
                          />
                          <small>Online</small>
                        </>
                      ) : (
                        <>
                          <HiOutlineOfficeBuilding
                            style={{ color: "#33333" }}
                            className={style.j}
                          />
                          <small>In Office</small>
                        </>
                      )}
                    </div>
                    <div className={style.jtyp}>
                      <BsCash style={{ color: "#33333" }} className={style.j} />
                      <small>{job.stipend} -/month</small>
                    </div>
                    <div className={style.stt}>
                      <div className={style.wtc}>
                        <IoIosTimer className={style.w} />
                        <h6>
                          {formatDistanceToNow(new Date(job.createdAt))} ago
                        </h6>
                      </div>

                      <h6>{job.otype}</h6>
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
                ))}
              </div>
            ) : (
              <div className={style.content}>
                <div className={style.msg}>
                  <h4>You are not Created/Posted any Jobs Yet</h4>
                  <div className={style.ebtn}>Post Now</div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default profile;
