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
import "./reviews.css";
import style from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { asynccurrentemployee, asyncfindjob } from "@/store/Actions/employeeAction";
import { useRouter } from "next/navigation";

const index = () => {
  const { findjob } = useSelector((state) => state.employeeReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  const { employee, isAuthenticated, allreview } = useSelector(
    (state) => state.employeeReducer
  );

  const [v, setv] = useState(3);
  const childStyle = {
    padding: "1vmax",
  };

  console.log(allreview, "its review");

  useEffect(() => {
    dispatch(asynccurrentemployee());
  }, [asynccurrentemployee]);

  const nibottom = {
    borderBottom: "2px solid #dddddd",
  };

  useEffect(() => {
    // Update value based on screen width
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setv(1);
      } else {
        setv(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <>
       
      <div className={style.review_div}>
        <div className={style.review}>
          <Swiper
            style={childStyle}
            slidesPerView={v}
            spaceBetween={30}
            pagination={{
              type: "progressbar",
            }}
            // navigation={true}
            navigation={{
              prevEl: ".swiper-button-prev2",
              nextEl: ".swiper-button-next2",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
             {allreview &&
              allreview.map((el, idx) => {
                return (
                  <SwiperSlide key={idx} className={style.swipe_slide}>
                    <div className={style.review_card}>
                      <div className={style.head}>
                        <h3>{el.htext}</h3>
                        <p>
                          {el.messsage}
                        </p>
                      </div>
                      <div className={style.user}>
                        <div className={style.uimg}>
                               <img src={el.ownerid.organisationlogo.url} alt="" />
                        </div>
                        <div className={style.name}>
                          <h6>{el.ownerid.name}&nbsp;{el.ownerid.lastname}</h6>
                          {/* <small>Zappin</small> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <div className="swiper-button-prev2 w-full">
            <RiArrowLeftSLine
              style={{ color: "#1e779d", fontSize: "1vmax", fontWeight: "500" }}
              className="rihgt_arrow"
            />
          </div>
          <div className="swiper-button-next2">
            <RiArrowRightSLine
              style={{ color: "#1e779d", fontSize: "1vmax", fontWeight: "500" }}
              className="rihgt_arrow"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
