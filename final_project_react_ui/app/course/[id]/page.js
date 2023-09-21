"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "@/components/Nav/Nav";
import style from "./style.module.css";
import { asynccurrentstudent } from "@/store/Actions/studentActions";
import { useEffect } from "react";
import { asyncfindcourse } from "@/store/Actions/studentActions";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/loader/loader";
import { useRouter } from "next/navigation";
import { useState } from "react";


const page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const { findcourse } = useSelector((state) => state.studentReducers);
  const [id, setId] = useState(null);

  useEffect(() => {
    // Check if window is defined (client-side) before accessing it
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      const parts = url.split("/");
      const id = parts[parts.length - 1];
      setId(id);
    }
    
  }, []);


  useEffect(() => {
    if(id){
      dispatch(asynccurrentstudent());
      findcourseDetails();
    }
  
  }, [id,asynccurrentstudent]);

  const findcourseDetails = () => {
    dispatch(asyncfindcourse(id));
  };

  const enroll = (id) => {
    console.log(id);
    // dispatch(asyncfindcourse(id));
    router.push(`/course/enroll/${id}`);
  };

  console.log(findcourse,"its findcj");

  const ht = {
    height: "10vh",
    width: "40vw",
  };

  return (
    <>
      {findcourse ? (
        <div className={style.main}>
          <Nav student={student} isAuthenticated={isAuthenticated} />
          <div className={style.top_head}>
            <div className={style.mimg}>
              <div className={style.img}>
                <img src={findcourse.cpic.url} alt="" />
              </div>
            </div>
            <div className={style.txt}>
              <div className={style.h1s}>
                <h1>{findcourse.cname}</h1>
              </div>
              <h6> {findcourse.sdes}</h6>
              <h1>₹ {findcourse.price}/-</h1>
              <div className={style.btns}>
                <small onClick={() => enroll(findcourse._id)}>Enroll Now</small>
                {/* {student &&
                student.Mycourses.some(
                  (application) => application.jobid === id
                ) ? (
                  <small>APPLIED</small>
                ) : (
                  <small onClick={toggleJob}>APPLY FOR THIS JOB</small>
                )} */}
              </div>
              <div className={style.details}>
                <h6>Details</h6>
                <p>{findcourse.details}</p>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default page;
