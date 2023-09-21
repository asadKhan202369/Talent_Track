"use client";
import React from "react";
import style from "./style.module.css";
import Nav from "@/components/Nav/Nav";
import { useEffect } from "react";
import { asynccurrentstudent } from "@/store/Actions/studentActions";
import { BiSolidPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "@/components/loader/loader";
import {
  asyncupdatedetails,
  asyncupdatephotu,
  asyncaddcourse,
} from "@/store/Actions/studentActions";
import { useRouter } from "next/navigation";
import axios from "@/utils/axios";

const profile = () => {
  const router = useRouter();
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/student/profile");
    } else {
      router.push("/student/login");
    }
  }, [isAuthenticated]);

  const inpt = useRef(null);
  const abtn = useRef(null);
  const [showTraining, setShowTraining] = useState(false);
  const [file, setFile] = useState(null);
  const initialformData = {
    name: "",
    lastname: "",
    email: "",
    contact: "",
    city: "",
    gender: "",
  };

  const [formData, setformData] = useState(initialformData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, []);

  useEffect(() => {
    if (student) {
      setformData(student);
    }
  }, [student]);

  const updateEvent = (event) => {
    const { name, value } = event.target;

    setformData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const addform = () => {
    setShowTraining(!showTraining);
  };

  const updateDetails = async (e) => {
    event.preventDefault();
    await dispatch(asyncupdatedetails(formData));
    dispatch(asynccurrentstudent());
  };

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);

    setTimeout(() => {
      abtn.current.click();
    }, 0);
  };

  const inputHandler = () => {
    inpt.current.click();
  };

  const uploadphoto = async (event) => {
    event.preventDefault();
    if (file) {
      dispatch(asyncupdatephotu(file));
      dispatch(asynccurrentstudent());
    } else {
      console.error("No file selected for upload.");
    }
  };

  const initialcourseData = {
    cname: "",
    startdate: "",
    description: "",
    price: "",
    teachers: "",
    ldate: "",
    details: "",
    sdes: "",
    cprojects: "",
    nlacture:"",
    // Add more fields as needed
  };

  const [courseData, setcourseData] = useState(initialcourseData);

  const inputcourseEvent = (event) => {
    const { name, value } = event.target;

    setcourseData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const handleFileChange = (event) => {
    setcourseData({
      ...courseData,
      file: event.target.files[0],
    });
  };

  const courseform = async (e) => {
    e.preventDefault();
    try {
      dispatch(asyncaddcourse(courseData));
      setcourseData(initialcourseData); // Reset form fields
      setShowTraining(!showTraining);
      // setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="hidden"
        onSubmit={uploadphoto}
        style={{ marginTop: "10vh" }}
        method="post"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            onChange={handleFileInputChange}
            name="file"
            className="form-control"
            type="file"
            ref={inpt}
            id="formFile"
          />
          <button ref={abtn} onClick={uploadphoto} type="submit">
            Avatar dalo
          </button>
        </div>
      </form>

      {student ? (
        <div className={style.main}>
          {showTraining && (
            <div className={style.edu_form}>
              <div className={style.e_head}>
                <h6>Course details</h6>
                <AiOutlineClose className={style.close} onClick={addform} />
              </div>
              <div className={style.form_div}>
                <form onSubmit={courseform} encType="multipart/form-data">
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
                      onChange={inputcourseEvent}
                      name="cname"
                      placeholder="e.g Web Developement"
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
                          Course Price
                        </label>
                        <input
                          onChange={inputcourseEvent}
                          name="price"
                          placeholder="e.g 5500-/"
                          type="number"
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
                          Number Of lactures
                        </label>
                        <input
                          onChange={inputcourseEvent}
                          name="nlacture"
                          placeholder="e.g 40"
                          type="number"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
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
                      Instructor Of Course(saoerated by comma , )
                    </label>
                    <input
                      onChange={inputcourseEvent}
                      name="teachers"
                      placeholder="e.g Harsh , Adarsh, Dhanesh"
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
                          Course Start date
                        </label>
                        <input
                          onChange={inputcourseEvent}
                          name="ldate"
                          placeholder="e.g 20sept"
                          type="date"
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
                          Class Project
                        </label>
                        <input
                          onChange={inputcourseEvent}
                          name="cprojects"
                          placeholder="e.g Mumbai"
                          type="text"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formFileSm" className="form-label">
                      Select a Photo
                    </label>
                    <input
                      className="form-control form-control-sm"
                      id="formFileSm"
                      type="file"
                      name="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className={style.dates}>
                    <div className="form-floating">
                      <textarea
                        name="description"
                        className="form-control"
                        onChange={inputcourseEvent}
                        placeholder="Desription of the course"
                        id="floatingTextarea2"
                        style={{ height: "100px", width: "41vw" }}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">
                        Desription of the course
                      </label>
                    </div>
                  </div>

                  <div className={style.dates}>
                    <div className="form-floating">
                      <textarea
                        name="details"
                        className="form-control"
                        onChange={inputcourseEvent}
                        placeholder="Details of the course"
                        id="floatingTextarea2"
                        style={{ height: "100px", width: "41vw" }}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">
                        Details of the course
                      </label>
                    </div>
                  </div>
                  <div className={style.dates}>
                    <div className="form-floating">
                      <textarea
                        name="sdes"
                        className="form-control"
                        onChange={inputcourseEvent}
                        placeholder="Short tag line for the course of the course"
                        id="floatingTextarea2"
                        style={{ height: "100px", width: "41vw" }}
                      ></textarea>
                      <label htmlFor="floatingTextarea2">
                        Short tag line for the course of the course
                      </label>
                    </div>
                  </div>
                  <div className={style.btn}>
                    <button
                      onClick={courseform}
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

          <Nav student={student} isAuthenticated={isAuthenticated} />
          <div className={style.center}>
            <div className={style.left_panel}>
              <div className={style.user}>
                {student && (
                  <div className={style.user_img}>
                    <img src={student.avatar.url} alt="" />
                    <div className={style.user_edit_btn}>
                      <button onClick={inputHandler}>
                        <BiSolidPencil />
                      </button>
                    </div>
                  </div>
                )}

                <h6>
                  {student.name} &nbsp;
                  {student.lastname}
                </h6>
              </div>
              <div className={style.user_options}>
                <h3>
                  <div className={`${style.leftline} ${style.leftline1}`}></div>
                  My Profile
                </h3>
                {student.admin ? (
                  <h3 onClick={addform}>
                    <div className={style.leftline}></div>
                    Post Courses
                  </h3>
                ) : (
                  <Link
                    style={{ textDecoration: "none", width: "100%" }}
                    href="/student/resume"
                  >
                    <h3>
                      <div className={style.leftline}></div>
                      My Resume
                    </h3>
                  </Link>
                )}

                {student.admin ? (
                  <h1></h1>
                ) : (
                  <Link
                    style={{ textDecoration: "none", width: "100%" }}
                    href="/student/profile/applicant"
                  >
                    <h3>
                      <div className={style.leftline}></div>
                      My Applicantions
                    </h3>
                  </Link>
                )}
                <Link
                  style={{ textDecoration: "none", width: "100%" }}
                  href="/student/mycourses"
                >
                  <h3>
                    <div className={style.leftline}></div>
                    My Courses
                  </h3>
                </Link>
                <h3>
                  <div className={style.leftline}></div>
                  Log out
                </h3>
              </div>
            </div>
            <div className={style.right_panel}>
              <div className={style.faram1}>
                <h1>
                  Welcome, <span>{student.name}</span>.
                </h1>
                <h3>Account Details</h3>
                <form className={style.form} onSubmit={updateDetails}>
                  <div className={style.firstName}>
                    {student && (
                      <input
                        name="name"
                        id="firstNameInput"
                        type="text"
                        placeholder="first Name"
                        onChange={updateEvent}
                        value={formData.name || ""}
                      />
                    )}
                    {student && (
                      <input
                        name="lastname"
                        id="firstNameInput5"
                        type="text"
                        placeholder="last Name"
                        onChange={updateEvent}
                        value={formData.lastname || ""}
                      />
                    )}
                  </div>

                  <div className={style.firstName}>
                    {student && (
                      <input
                        name="city"
                        id="firstNameInput"
                        type="text"
                        placeholder="City"
                        onChange={updateEvent}
                        value={formData.city || ""}
                      />
                    )}
                    {student && (
                      <input
                        name="gender"
                        id="firstNameInput5"
                        type="text"
                        placeholder="gender"
                        onChange={updateEvent}
                        value={formData.gender || ""}
                      />
                    )}
                  </div>
                  <div className={style.firstEmail}>
                    {student && (
                      <input
                        name="email"
                        id="firstNameInput3"
                        type="email"
                        placeholder="Organization Email"
                        onChange={updateEvent}
                        value={formData.email || ""}
                      />
                    )}
                  </div>
                  <div className={style.firstName}>
                    {student && (
                      <input
                        name="contact"
                        id="firstNameInput4"
                        type="text"
                        placeholder="Contact No.(Whatsapp)"
                        onChange={updateEvent}
                        value={formData.contact || ""}
                      />
                    )}
                    <div className={style.btns}>
                      <button className={style.save} type="submit">
                        Save
                      </button>
                      <button
                        type="submit"
                        id="cancelbtn"
                        onClick={updateDetails}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default profile;
