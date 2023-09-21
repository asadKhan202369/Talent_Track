"use client";
import React from "react";
import style from "./style.module.css";
import { GrLocation } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";
import Nav from "@/components/Nav/Nav";
import { asyncalljobs } from "@/store/Actions/studentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asynccurrentstudent } from "@/store/Actions/studentActions";
import { useRouter } from "next/navigation";
import { asyncfindresume } from "@/store/Actions/studentActions";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/student/profile/applicant");
    } else {
      router.push("/student/login");
    }
  }, [isAuthenticated]);

  const rdets = (id, job) => {
    dispatch(asyncfindresume(id));
    router.push(`/employee/profile/applicant/aresume/${id}/${job}`);
  };

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  // Loader
  return (
    <>
      {student ? (
        <div className={style.main}>
          <Nav />
          {student && student.applied && student.applied.length > 0 ? (
            <div className={style.head}>
              <h1>All Jobs and Internships You applied</h1>
            </div>
          ) : null}

          <div className={style.cards}>
            {student && student.applied && student.applied.length > 0 ? (
              student.applied.map((el, idx) => {
                return (
                  <div key={idx} className={style.single_card}>
                    <div className={style.chead}>
                      <div className={style.chl}>
                        <h2>{el.jobid.title}</h2>
                        <h3>{el.jobid.ownerid.organisationname}</h3>

                        <h6 className={style.loc}>
                          <GrLocation
                            style={{ color: "#797474" }}
                            className={style.linc}
                          />
                          {el.jobid.location}
                        </h6>
                      </div>
                      <div className={style.hlogo}>
                        <img
                          src={el.jobid.ownerid.organisationlogo.url}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className={style.avail}>
                      <div className={style.wtch}>
                        <IoIosTimer className={style.w} />
                        <p>Just now</p>
                      </div>
                      <h4>{el.jobid.otype}</h4>
                    </div>
                    {el.applicant && el.applicant.name ? (
                      <div>
                        <div className={style.opt}>
                          {/* <h5>Apply at: {el.createdAt}</h5> */}
                          <h5>
                            Apply at:
                            {new Date(el.createdAt).toLocaleDateString()}
                          </h5>
                          <h4>{el.jobid.opening} Openings</h4>
                        </div>
                      </div>
                    ) : (
                      <p>Applicant name not available</p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className={style.ni}>
                <h2>You have not applied any job/internship Yet</h2>
                <Link style={{textDecoration:"none"}} href="/alljobs">
                  <small>Apply Now</small>
                </Link>
              </div>
            )}
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
