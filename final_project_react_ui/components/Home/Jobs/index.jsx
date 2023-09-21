"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { GoLocation } from "react-icons/go";
import { BsCash } from "react-icons/bs";
import { SlCalender } from "react-icons/sl";
import { ImOffice } from "react-icons/si";
import "./jobs.css";
import { useDispatch, useSelector } from "react-redux";
import { asynccurrentstudent } from "@/store/Actions/studentActions";
import style from "./style.module.css";
import Link from "next/link";
import { asyncfindjob } from "@/store/Actions/employeeAction";
import { useRouter } from "next/navigation";

const Job = () => {
  const { findjob } = useSelector((state) => state.employeeReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const { student, isAuthenticated, alljobs } = useSelector(
    (state) => state.studentReducers
  );

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  const [v, setv] = useState(4);
  const childStyle = {
    height: "70vh",
  };

  const nibottom = {
    borderBottom: "2px solid #dddddd",
  };


  useEffect(() => {
    // Update value based on screen width
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setv(1);
      } else {
        setv(4);
      }
    };

    // Initial update
    handleResize();

    // Attach event listener for screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const findJobDetails = (id) => {
    dispatch(asyncfindjob(id));
    router.push(`/opp/${id}`);
  };

  return (
    <div className="trending-section relative w-full pt-5 bg-gray-50">
      <div className="title w-full flex flex-col items-center justify-center pt-4 sm:justify-center sm:items-left ">
        <h5 className="font-['roobert'] font-bold text-xl text-left text-gray-700 tracking-wide sm:text-4xl">
          Latest Jobs or Internships
        </h5>
        <div className="catagory_div relative flex items-center h-10 gap-3 pt-10 pb-5 overflow-y-hiddenoverflow-x-auto sm:pb-0 sm-w-full ">
          <h6 className="font-['roobert'] mt-1 tracking-wide">
            POPULAR CATAGORIES:
          </h6>
          <div className="cat_div flex items-center gap-3 h-full">
            <div className="cd flex items-center justify-center w-fit px-3 py-1 border-grey-400 border-solid border-2 rounded-2 rounded-4 ">
              <small className="text-sm whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                Big brands
              </small>
            </div>
            <div className="cd flex items-center justify-center w-fit px-3 py-1 border-grey-400 border-solid border-2 rounded-2 rounded-4 ">
              <small className="text-sm whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                Big brands
              </small>
            </div>
            <div className="cd flex items-center justify-center w-fit px-3 py-1 border-grey-400 border-solid border-2 rounded-2 rounded-4 ">
              <small className="text-sm whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                Big brands
              </small>
            </div>
            <div className="cd flex items-center justify-center w-fit px-3 py-1 border-grey-400 border-solid border-2 rounded-2 rounded-4 ">
              <small className="text-sm whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                Big brands
              </small>
            </div>
            <div className="cd flex items-center justify-center w-fit px-3 py-1 border-grey-400 border-solid border-2 rounded-2 rounded-4 ">
              <small className="text-sm whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                Big brands
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="swiper_container bg-white-200 h-full relative w-full flex items-center justify-center px-0 pt-5 sm:px-4">
        <div style={childStyle} className="w-11/12">
          <Swiper
            slidesPerView={v}
            spaceBetween={30}
            pagination={{
            }}
            // navigation={true}
            navigation={{
              prevEl: ".swiper-button-prev3",
              nextEl: ".swiper-button-next3",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {alljobs &&
              alljobs.map((el, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <div className="intern_card w-full h-full ">
                      <div className="itop pt-4 pl-3">
                        <div className="sctive w-fit h-fit px-3 pt-1 flex items-center justify-center rounded-md border-1">
                          <h6 className="text-sm whitespace-nowrap w-fit h-fit font-['roobert']">
                            Actively Hiring
                          </h6>
                        </div>
                        <div
                          className="ni flex items-center justify-between pl-1 pr-2 pt-2 pb-3"
                          style={nibottom}
                        >
                          <div className="l flex flex-col items-start">
                            <h6 className="font['roobert'] text-base font-bold tracking-wide capitalize text-black-150 tracking-wide leading-4">
                              {el.title}
                            </h6>
                            <h5 className="font['roobert'] font-medium text-gray-500 text-sm font-medium text-black-400 tracking-wide leading-4">
                              {el.ownerid.organisationname}
                            </h5>
                          </div>
                          <div className={style.img}>
                            <img src={el.ownerid.organisationlogo.url} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="tbtm pt-3 flex flex-col items-start justify-start">
                        <div className="br_c">
                          <div className="brows mb-2 flex items-center gap-1.5 justify-start pl-3 h-fit w-full">
                            <GoLocation className="text-md font-medium text-gray-500" />
                            <small className="font-['roobert'] text-md font-medium text-gray-500">
                              {el.location}
                            </small>
                          </div>

                          <div className="brows mb-2 flex items-center gap-1.5 justify-start pl-3 h-fit w-full">
                            <BsCash className="text-md font-medium text-gray-500" />
                            <small className="font-['roobert'] text-md font-medium text-gray-500">
                              {el.stipend} /- Month
                            </small>
                          </div>
                          <div className="brows mb-2 flex items-center gap-1.5 justify-start pl-3 h-fit w-full">
                            {/* <SlCalender className='text-md font-medium text-gray-500' /> */}
                            <small className="font-['roobert'] text-base capitalize tracking-wide font-medium text-gray-500">
                              {el.otype}
                            </small>
                          </div>
                        </div>
                        <div
                          onClick={() => findJobDetails(el._id)}
                          className="det flex items-center pl-3 mt-3 "
                        >
                          <small className="text-sky-500 font-medium text-md font-['roobert']">
                            View Details
                          </small>
                          <RiArrowRightSLine className="text-md text-sky-500" />
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}


            <SwiperSlide>
              <div className="intern_card w-full h-full ">
                <div className="itop pt-4 pl-3">
                  <div
                    className="ni flex items-start justify-start pl-1 pr-2 pt-2 pb-3"
                    style={nibottom}
                  >
                    <div className="l flex flex-col items-start">
                      <h6 className={style.emore}>
                        View All Jobs and Internships
                      </h6>
                      <Link href="/alljobs" style={{ textDecoration: "none" }}>
                        <small className={style.va}>View all</small>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="tbtm pt-3 flex flex-col items-start justify-start">
                  <img
                    src="https://internshala.com/static/images/student/dashboard/jobs-view-all.svg"
                    alt=""
                  />
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="swiper-button-prev3 w-full">
            <RiArrowLeftSLine
              style={{ color: "#111", fontSize: "1vmax", fontWeight: "500" }}
              className="rihgt_arrow"
            />
          </div>
          <div className="swiper-button-next3">
            <RiArrowRightSLine
              style={{ color: "#111", fontSize: "1vmax", fontWeight: "500" }}
              className="rihgt_arrow"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
