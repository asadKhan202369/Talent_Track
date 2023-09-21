"use client";
import React from "react";
import style from "./style.module.css";
import { GrLocation } from "react-icons/gr";
import { IoIosTimer } from "react-icons/io";
import Nav from "@/app/employee/components/Nav/page";
import { asyncalljobs } from "@/store/Actions/studentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asynccurrentemployee } from "@/store/Actions/employeeAction";
import { useRouter } from "next/navigation";
import { asyncfindresume } from "@/store/Actions/studentActions";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/Footer"

const page = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { employee, isAuthenticated } = useSelector(
    (state) => state.employeeReducer
  );

  const rdets = (id, job) => {
    dispatch(asyncfindresume(id));
    router.push(`/employee/profile/applicant/aresume/${id}/${job}`);
  };

  useEffect(() => {
    dispatch(asynccurrentemployee());
  }, [asynccurrentemployee]);
  // Loader
  return (
    <>
      {employee ? (
        <div className={style.main}>
          <Nav />
          <div className={style.head}>
            <h1>All Jobs and Internships</h1>
          </div>
          <div className={style.cards}>
            {employee &&
              employee.application.map((el, idx) => {
                return (
                  <div key={idx} className={style.single_card}>
                    <div className={style.chead}>
                      <div className={style.chl}>
                        <h2>{el.jobid.title}</h2>
                        <h3>{employee.organisationname}</h3>
                        <h6 className={style.loc}>
                          <GrLocation
                            style={{ color: "#797474" }}
                            className={style.linc}
                          />
                          {el.jobid.location}
                        </h6>
                      </div>
                      <div className={style.hlogo}>
                        <img src={employee.organisationlogo.url} alt="" />
                      </div>
                    </div>

                    <div className={style.avail}>
                      <div className={style.wtch}>
                        <IoIosTimer className={style.w} />
                        <p>Just now</p>
                      </div>
                      <h4>{el.jobid.otype}</h4>
                      <h4>{el.jobid.opening} Openings</h4>
                    </div>
                    {el.applicant && el.applicant.name ? (
                      <div>
                        <div className={style.opt}>
                          <h5>
                            Applicant name: {el.applicant.name}&nbsp;
                            {el.applicant.lastname}
                          </h5>
                          <h5>Applicant email: {el.applicant.email}</h5>
                          <h5>Apply at: {new Date(el.createdAt).toLocaleDateString()}</h5>
                        </div>

                        <div
                          className={style.cbtm}
                          onClick={() => rdets(el.applicant._id, el.jobid._id)}
                        >
                          <h6>View resume</h6>
                        </div>
                      </div>
                    ) : (
                      <p>Applicant name not available</p>
                    )}
                  </div>
                );
              })}
          </div>
          <Footer/>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default page;
