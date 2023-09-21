"use client";
import React from "react";
import style from "./style.module.css";
import Nav from "@/components/Nav/Nav";
import { asyncallcourses,asyncfindcourse,asynccurrentstudent } from "@/store/Actions/studentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { MdOutlineWatchLater } from "react-icons/md";
import { BsCurrencyRupee } from "react-icons/bs";
import { RiArrowRightSLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const page = () => {
  const { findcourse } = useSelector((state) => state.studentReducers);

  const dispatch = useDispatch();
  const router = useRouter();
  const { student, isAuthenticated, allcourse } = useSelector(
    (state) => state.studentReducers
  );

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  const findCourseDetails = (id) => {
    dispatch(asyncfindcourse(id));
    router.push(`/course/${id}`);
  };

  return (
    <>
      <div className={style.main}>
        <Nav student={student} isAuthenticated={isAuthenticated} />
        <div className={style.head}>
          <h1>All Courses</h1>
        </div>
        <div className={style.cards}>
          {allcourse &&
            allcourse.map((el, idx) => {
              return (
                <div key={idx} className={style.intern_card}>
                  <div className="itop h-40 overflow-hidden ">
                    <img
                      className="object-cover h-full w-full hover:"
                      src={el.cpic.url}
                      alt=""
                    />
                  </div>
                  <div className="tbtm pt-3 flex flex-col gap-1 items-start pl-6 justify-end ">
                    <small className="font-['roobert'] text-xl font-bold text-black-500">
                      {el.cname}
                    </small>
                    <span className="font-['roobert'] text-sm font-medium bg-yellow-400 mt-1 px-1">
                      {/* {el.sdes} */}
                      {el.ldate} start date
                    </span>
                    <div className="brows mb-2 flex mt-4 items-center gap-1.5 justify-start h-fit w-full">
                      <MdOutlineWatchLater className="text-md w-fit font-medium text-gray-500" />
                      <small className="font-['roobert'] text-sm font-medium text-gray-500">
                        {/* {el.ldate} start date */}
                        {el.nlacture} lactures
                      </small>
                    </div>
                    <div className="brows mb-2 flex items-center gap-1.5 justify-start h-fit w-full">
                      <BsCurrencyRupee className="text-md w-fit font-medium text-gray-500" />
                      <small className="font-['roobert'] text-sm font-medium text-gray-500">
                        {el.price} /-
                      </small>
                    </div>
                    <div className="brows mb-2 flex items-center gap-1.5 justify-start h-fit w-full">
                      {/* <PiBagDuotone className="text-md w-fit font-medium text-gray-500" /> */}
                      <small className="font-['roobert'] text-sm font-medium text-gray-500">
                        {/* {el.sdes} */}
                        Enrolled : {el.enrolled.length} &nbsp;
                        {el.enrolled.length === 1 ? "student" : "students"}
                      </small>
                    </div>
                    <div className="det mt-3 flex items-center ">
                      <small
                        onClick={() => findCourseDetails(el._id)}
                        className="text-sky-500 font-medium text-md font-['roobert']"
                      >
                        View Details
                      </small>
                      <RiArrowRightSLine className="text-md text-sky-500" />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default page;
