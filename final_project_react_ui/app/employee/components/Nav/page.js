"use client";
import React, { useEffect } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";
import employeeReducer from "@/store/Reducers/employeeReducer";
import { asynclogoutemployee } from "@/store/Actions/employeeAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import {
  asyncaddoppo,
  asynccurrentemployee,
  asyncaddreview,
} from "@/store/Actions/employeeAction";

const employeeNav = () => {
  const { employee, isAuthenticated } = useSelector(
    (state) => state.employeeReducer
  );
  const dispatch = useDispatch();
  const [showhover, setshowhover] = useState(true);
  const [showloc, setshowloc] = useState(false);
  const [showloc1, setshowloc1] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);

  const logout = () => {
    dispatch(asynclogoutemployee());
  };

  useEffect(() => {
    dispatch(asynccurrentemployee());
  }, [asynccurrentemployee]);

  const [selectedOption, setSelectedOption] = useState("intern");

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const car = () => {
    //  setshowhover(!showhover);
  };

  useEffect(() => {
    if (functionCalled) {
      dispatch(asynccurrentemployee());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  const toggleJob = () => {
    setshowloc(!showloc);
  };

  const initialjobData = {
    otype: "internship",
    type: "",
    title: "",
    opening: "",
    deadline: "",
    salary: "",
    experience: "",
    location: "",
    description: "",
    skills: "",
    // Add more fields as needed
  };

  const [jobData, setjobData] = useState(initialjobData);

  const inputjobEvent = (event) => {
    const { name, value } = event.target;

    setjobData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const Jobform = async (e) => {
    e.preventDefault();
    try {
      const skillsArray = jobData.skills.split(",");

      const dataToSend = {
        ...jobData,
        skills: skillsArray,
      };

      await dispatch(asyncaddoppo(dataToSend));
      setjobData(initialjobData); // Reset form fields
      setFunctionCalled(true);
      toggleJob();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleJob1 = () => {
    setshowloc1(!showloc1);
  };

  const initialreviewData = {
    htext: "",
    messsage: "",
    // Add more fields as needed
  };

  const [reviewData, setreviewData] = useState(initialreviewData);

  const inputjobEvent1 = (event) => {
    const { name, value } = event.target;

    setreviewData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const reviewForm = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncaddreview(reviewData));
      setreviewData(initialreviewData); // Reset form fields
      setFunctionCalled(true);
      toggleJob1();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showloc && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Post Jobs/Internships for free</h6>
            <MdClose className={style.close} onClick={toggleJob} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={Jobform}>
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
                        // value={jobData.otype}
                        value="internship"
                        onChange={inputjobEvent}
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
                        // value={jobData.otype}
                        value="job"
                        onChange={inputjobEvent}
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
                        value="Online"
                        onChange={inputjobEvent}
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
                        checked={selectedOption === "job"}
                        value="In Office"
                        onChange={inputjobEvent}
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
                  value={jobData.title}
                  onChange={inputjobEvent}
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
                  value={jobData.skills}
                  onChange={inputjobEvent}
                  name="skills"
                  placeholder="e.g node js,Figma,Adobe"
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
                  Number Of Opening
                </label>
                <input
                  value={jobData.opening}
                  onChange={inputjobEvent}
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
                  Deadline/Availability
                </label>
                <input
                  value={jobData.deadline}
                  onChange={inputjobEvent}
                  name="deadline"
                  placeholder="e.g"
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
                    value={jobData.salary}
                    onChange={inputjobEvent}
                    name="salary"
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
                    value={jobData.experience}
                    onChange={inputjobEvent}
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

              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
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

      {showloc1 && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Add Review</h6>
            <MdClose className={style.close} onClick={toggleJob1} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={reviewForm}>
              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={reviewData.description}
                    onChange={inputjobEvent1}
                    name="htext"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">
                    Head text for the review{" "}
                  </label>
                </div>
              </div>

              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={reviewData.description}
                    onChange={inputjobEvent1}
                    name="messsage"
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px", width: "41vw" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Write your review</label>
                </div>
              </div>

              <div className={style.btn}>
                <button
                  onClick={reviewForm}
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

      <div className={style.nav}>
        <Link style={{textDecoration:"none",color:"#111"}} href="/employee/home">
          <div className={style.logo}>
            <div className={style.img}>
              <img
                src="https://ik.imagekit.io/sheryians/Sheryians_Logo_wFKd9VClG.png"
                alt=""
              />
            </div>
            <div className={style.line}></div>
            <h6>Talent Track</h6>
          </div>
        </Link>

        {employee ? (
          <div onMouseLeave={car} onMouseEnter={car} className={style.user_div}>
            {/* <div className={style.user_img}>
                      {employee && employee.organisationlogo && (
                        <img src={employee.organisationlogo.url} alt="organization logo" />
                      )}
                    </div> */}
            <h6 onClick={toggleJob1}>Add Review</h6>
            <h6 onClick={toggleJob}>Post Add</h6>
            <h6>Heyy, &nbsp;{employee.name}</h6>
            {showhover && (
              <div className={style.hover_card}>
                <h4>{employee.name}</h4>
                <Link
                  style={{ textDecoration: "none" }}
                  href="/employee/profile"
                >
                  <h6>My Account</h6>
                </Link>
                <h6 onClick={logout}>log out</h6>
              </div>
            )}
          </div>
        ) : (
          <Link href="/employee/login">
            <h5>Sign Up</h5>
          </Link>
        )}
      </div>
    </>
  );
};

export default employeeNav;
