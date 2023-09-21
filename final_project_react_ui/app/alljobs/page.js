"use client";
import React from "react";
import style from "./style.module.css";
import { GrLocation } from "react-icons/gr";
import { BiPlayCircle } from "react-icons/bi";
import { BsCash } from "react-icons/bs";
import { PiBagSimple } from "react-icons/pi";
import { IoIosTimer } from "react-icons/io";
import Nav from "@/components/Nav/Nav";
import { asyncalljobs } from "@/store/Actions/studentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const page = () => {
  const dispatch = useDispatch();
  const { student, isAuthenticated, alljobs } = useSelector(
    (state) => state.studentReducers
  );

  useEffect(() => {
    dispatch(asyncalljobs());
  }, [asyncalljobs]);

  return (
    <>
      <div className={style.main}>
        <Nav student={student} isAuthenticated={isAuthenticated} />
        <div className={style.head}>
          <h1>All Jobs and Internships</h1>
        </div>
        <div className={style.cards}>
          {alljobs &&
            alljobs.map((el, idx) => {
              return (
                <div key={idx} className={style.single_card}>
                  <div className={style.chead}>
                    <div className={style.chl}>
                      <h2>{el.title}</h2>
                      <h3>
                        {el.ownerid.organisationname}
                      </h3>
                      <h6 className={style.loc}>
                        <GrLocation
                          style={{ color: "#797474" }}
                          className={style.linc}
                        />
                        {el.location}
                      </h6>
                    </div>
                    <div className={style.hlogo}>
                      <img
                        src={el.ownerid.organisationlogo.url}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className={style.opt}>
                    <div className={style.op}>
                      <div className={style.oph}>
                        <BiPlayCircle className={style.opti} />
                        <small>START DATE</small>
                      </div>
                      <h5>Immediately</h5>
                    </div>
                    <div className={style.op}>
                      <div className={style.oph}>
                        <BsCash className={style.opti} />
                        <small>CTC (ANNUAL)</small>
                      </div>
                      <h5>₹ {el.stipend} /- Month</h5>
                    </div>
                    <div className={style.op}>
                      <div className={style.oph}>
                        <PiBagSimple className={style.opti} />
                        <small>EXPERIENCE</small>
                      </div>
                      <h5>{el.experience} years</h5>
                    </div>
                  </div>
                  <div className={style.avail}>
                    <div className={style.wtch}>
                      <IoIosTimer className={style.w} />
                      <p>Just now</p>
                    </div>
                    <h4>{el.otype}</h4>
                  </div>
                  <div className={style.cbtm}>
                    <h6>View details</h6>
                  </div>
                </div>
              ) 
            })}
        </div>
      </div>
    </>
  );
};

export default page;
