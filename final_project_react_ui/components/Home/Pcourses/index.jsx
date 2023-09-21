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
import Link from "next/link";
import { RiCheckFill } from "react-icons/ri";
import { MdOutlineWatchLater } from "react-icons/md";
import { BsCurrencyRupee } from "react-icons/bs";
import { asyncfindcourse } from "@/store/Actions/studentActions";
import { MdNumbers } from "react-icons/md";
import { asynccurrentstudent } from "@/store/Actions/studentActions";
import "./pcourses.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Job = () => {
  const { findcourse } = useSelector((state) => state.studentReducers);

  const dispatch = useDispatch();
  const router = useRouter();
  const { student, isAuthenticated, allcourse } = useSelector(
    (state) => state.studentReducers
  );

  useEffect(() => {
    dispatch(asynccurrentstudent());
  }, [asynccurrentstudent]);

  const [v, setv] = useState(4);
  const childStyle = {
    height: "75vh",
  };
  const height = {
    height: "60vh",
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

  const findCourseDetails = (id) => {
    dispatch(asyncfindcourse(id));
    router.push(`/course/${id}`);
  };

  return (
    <>
      <div className="trending-section w-full bg-sky-100 mt-10 sm:mt-0 pb-10">
        <div className="title w-full flex flex-col items-center justify-center pt-16 sm:justify-center sm:items-left">
          <h5 className="font-['roobert'] font-bold text-xl text-left text-gray-700 tracking-wide sm:text-4xl">
            Our Courses
          </h5>
          <div className="catagory_div flex items-center h-10 gap-3 pt-10 pb-3 overflow-y-hiddenoverflow-x-auto sm:pb-0 sm-w-full ">
            <div className="catagory_div flex items-center h-10 gap-3 pt-10 pb-5 overflow-y-hiddenoverflow-x-auto sm:pb-0 sm-w-full ">
              <div className="cat_div flex items-center gap-3 h-full">
                <div className="cd flex items-center gap-2 justify-center w-fit px-3 py-1 border-grey-400  ">
                  <RiCheckFill className="text-2xl" />
                  <small className="text-lg whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                    Guaranteed placement
                  </small>
                </div>
                <div className="cd flex items-center gap-2 justify-center w-fit px-3 py-1 border-grey-400  ">
                  <RiCheckFill className="text-2xl" />
                  <small className="text-lg whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                    Get 100% refund if not hired
                  </small>
                </div>
                <div className="cd flex items-center gap-2 justify-center w-fit px-3 py-1 border-grey-400  ">
                  <RiCheckFill className="text-2xl" />
                  <small className="text-lg whitespace-nowrap text-grey-400 font-medium font-['roobert']">
                    Become job ready
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="swiper_container bg-white-200 h-full relative w-full h-60vh flex items-center justify-center px-0 pt-5 sm:px-4">
          <div style={childStyle} className="w-11/12">
            <Swiper
              slidesPerView={v}
              spaceBetween={30}
              pagination={{
                type: "progressbar",
              }}
              // navigation={true}
              navigation={{
                prevEl: ".swiper-button-prev4",
                nextEl: ".swiper-button-next4",
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {allcourse &&
                allcourse.map((el, idx) => {
                  return (
                    <SwiperSlide key={idx} style={height}>
                      <div className="intern_card w-full h-full ">
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
                            {/* <MdOutlineWatchLater className="text-md w-fit flex font-medium text-gray-500" /> */}
                            {el.ldate} start date
                          </span>
                          <div className="brows mb-2 flex mt-4 items-center gap-1.5 justify-start h-fit w-full">
                            <MdOutlineWatchLater className="text-md w-fit font-medium text-gray-500" />
                            <small className="font-['roobert'] text-sm font-medium text-gray-500">
                              {el.ldate} start date
                            </small>
                          </div>
                          <div className="brows mb-2 flex items-center gap-1.5 justify-start h-fit w-full">
                            <BsCurrencyRupee className="text-md w-fit font-medium text-gray-500" />
                            <small className="font-['roobert'] text-sm font-medium text-gray-500">
                              {el.price} /-
                            </small>
                          </div>
                          <div className="brows mb-2 flex items-center gap-1.5 justify-start h-fit w-full">
                            <MdNumbers className="text-md w-fit font-medium text-gray-500" />
                            <small className="font-['roobert'] text-sm font-medium text-gray-500">
                              {/* {el.description} */}
                              {el.nlacture} lactures
                            </small>
                          </div>
                          
                            <div
                              onClick={() => findCourseDetails(el._id)}
                              className="det mt-3 flex items-center "
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
              <SwiperSlide style={height}>
                <div className="intern_card w-full h-full ">
                  <div className="itop h-40 overflow-hidden ">
                    <img
                      className="object-cover h-full w-full hover:"
                      src="https://internshala.com/static/images/home/specializations/fsd.png"
                      alt=""
                    />
                  </div>
                  <div className="tbtm flex gap-1 items-center justify-center pt-16">
                    <h6 className="all">View All Courses</h6>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="swiper-button-prev4 w-full">
              <RiArrowLeftSLine
                style={{ color: "#111", fontSize: "1vmax", fontWeight: "500" }}
                className="rihgt_arrow"
              />
            </div>
            <div className="swiper-button-next4">
              <RiArrowRightSLine
                style={{ color: "#111", fontSize: "1vmax", fontWeight: "500" }}
                className="rihgt_arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
