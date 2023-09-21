"use client";
import React, { useEffect, useState } from "react";
import Jobs from "../components/Jobs/page";
import Education from "../components/Education/page";
import Internships from "../components/Internships/page";
import Training from "../components/Training/page";
import Nav from "@/components/Nav/Nav";
import Skills from "../components/Skills/page";
import Accomplishment from "../components/Accomplishment/page";
import Responsibility from "../components/Responsibility/page";
import Portfoliow from "../components/Portfoliow/page";
import Projects from "../components/Projects/page";
import Details from "../components/Details/page";
import { PiWarningCircleBold } from "react-icons/pi";
import { asyncgetresume } from "@/store/Actions/studentActions";
import { useSelector, useDispatch } from "react-redux";
import style from "./style.module.css";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/loader"

const page = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { student, resume, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );

    useEffect(()=>{
        if(isAuthenticated){
            router.push('/student/resume')
        }else{
            router.push('/student/login')
        }
   },[isAuthenticated])

  const [currentstudent, setcurrentstudent] = useState(null);

  useEffect(() => {
    setcurrentstudent(student);
  }, [student]);

  if (currentstudent) {
    console.log(currentstudent.responsibilities, "its curnrn");
  }
  useEffect(() => {
    dispatch(asyncgetresume());
  }, []);
  return (
    <>
      {student ? (
        <div className={style.main}>
          <Nav student={student} isAuthenticated={isAuthenticated} />
          <div className={style.head}>
            <h3>Resume</h3>
          </div>
          <div className={style.wrn}>
            <PiWarningCircleBold className={style.wrni} />
            <p>
              Whenever you apply to an internship or fresher job, this is the
              resume that the employer will see. Always make sure it is up to
              date.
            </p>
          </div>

          <div className={style.resume_container}>
            {currentstudent && currentstudent.resume && (
              <Details student={currentstudent} />
            )}
            {currentstudent && currentstudent.resume && (
              <Education education={currentstudent.resume.education} />
            )}
            {currentstudent && currentstudent.resume && (
              <Jobs jobs={currentstudent.resume.jobs} />
            )}

            {currentstudent && currentstudent.resume && (
              <Internships internship={currentstudent.resume.internship} />
            )}

            {currentstudent && currentstudent.resume && (
              <Responsibility
                responsibilities={currentstudent.resume.responsibilities}
              />
            )}
            {currentstudent && currentstudent.resume && (
              <Training train={currentstudent.resume.train} />
            )}
            {currentstudent && currentstudent.resume && (
              <Projects projects={currentstudent.resume.projects} />
            )}
            {currentstudent && currentstudent.resume && (
              <Skills skills={currentstudent.resume.skills} />
            )}

            {currentstudent && currentstudent.resume && (
              <Portfoliow link={currentstudent.resume.portfolio} />
            )}
            {currentstudent && currentstudent.resume && (
              <Accomplishment achive={currentstudent.resume.accomplishments} />
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default page;
