"use client";
import React, { useEffect } from "react";
import style from "./style.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { MdClose } from "react-icons/md"
import { asynclogoutstudent } from "@/store/Actions/studentActions";
import {
  asyncaddreview,
  asynccurrentstudent,
} from "@/store/Actions/studentActions";


const employeeNav = () => {
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const dispatch = useDispatch();
  const [showhover, setshowhover] = useState(true);
  const [showloc, setshowloc] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);

  const logout = () => {
    dispatch(asynclogoutstudent());
  };

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  useEffect(() => {
    if (functionCalled) {
      dispatch(asynccurrentstudent());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  const toggleJob = () => {
    setshowloc(!showloc);
  };

  const initialreviewData = {
    htext: "",
    messsage: "",
    // Add more fields as needed
  };

  const [reviewData, setreviewData] = useState(initialreviewData);

  const inputjobEvent = (event) => {
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
      toggleJob();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showloc && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Add Review</h6>
            <MdClose className={style.close} onClick={toggleJob} />
          </div>
          <div className={style.form_div}>
            <form onSubmit={reviewForm}>
              <div style={{ marginTop: "5vh" }} className={style.dates}>
                <div className="form-floating">
                  <textarea
                    value={reviewData.description}
                    onChange={inputjobEvent}
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
                    onChange={inputjobEvent}
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
        <Link
          href="/student/home"
          style={{ textDecoration: "none", color: "#111" }}
        >
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

        {/* {student && <h1 style={{color:"red"}}>{student.name},"it studen"</h1>} */}
        {student === null ? (
          <div className={style.right_n}>
            <Link style={{ textDecoration: "none" }} href="/student/login">
              <h5>Sign Up</h5>
            </Link>
            <Link style={{ textDecoration: "none" }} href="/employee/home">
              <h5>Hire</h5>
            </Link>
          </div>
        ) : (
          <div className={style.user_div}>
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href="/alljobs"
            >
              <h3>Jobs</h3>
            </Link>
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href="/alljobs"
            >
              <h3>Internships</h3>
            </Link>
            <Link
              style={{ color: "#111", textDecoration: "none" }}
              href="/allcourses"
            >
              <h3>Courses</h3>
            </Link>
            <h3 onClick={toggleJob}>Add Review</h3>
            <h6>Heyy, &nbsp;{student.name}</h6>
            {showhover && (
              <div className={style.hover_card}>
                <h4>{student.name}</h4>
                <Link
                  style={{ textDecoration: "none" }}
                  href="/student/profile"
                >
                  <h6>My Account</h6>
                </Link>
                <h6 onClick={logout}>log out</h6>
              </div>
            )}
          </div>
        )}
        
      </div>
    </>
  );
};

export default employeeNav;
