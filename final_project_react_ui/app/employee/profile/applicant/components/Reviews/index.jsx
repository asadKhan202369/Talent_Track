"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import  { useRef,useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import {GoLocation} from "react-icons/go"
import {BsCash} from "react-icons/bs"
import {SlCalender} from "react-icons/sl"
import "./reviews.css";
import style from "./style.module.css"
const index = () => {
    const [v, setv] = useState(3)
    const childStyle = {
        padding:'1vmax',
         
    };

    const nibottom = {
        borderBottom: '2px solid #dddddd'
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
    
        // Initial update
        handleResize();
    
        // Attach event listener for screen size changes
        window.addEventListener('resize', handleResize);
    
        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);



  return (
     <>
       <div className={style.review_div}>
           <div className={style.review}>
           <Swiper style={childStyle}
                       slidesPerView={v}
                       spaceBetween={30}
                        pagination={{
                        type: 'progressbar',
                        }}
                        // navigation={true}
                        navigation={{
                            prevEl: '.swiper-button-prev2',
                            nextEl: '.swiper-button-next2',
                          }}
                          
                        modules={[Pagination, Navigation]}
                        className="mySwiper"
                        >
                            <SwiperSlide className={style.swipe_slide}>
                                 <div className={style.review_card}>
                                    <div className={style.head}>
                                          <h3>Hired across multiple profiles</h3>
                                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam obcaecati minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, unde.  Obcaecati Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, recusandae Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, ipsam.!!

                                          </p>
                                    </div>
                                    <div className={style.user}>
                                          <div className={style.uimg}>

                                          </div>
                                          <div className={style.name}>
                                              <h6>Arbaz Khan</h6>
                                              <small>Zappin</small>
                                          </div>
                                    </div>
                                 </div>
                            </SwiperSlide>
                            <SwiperSlide className={style.swipe_slide}>
                                 <div className={style.review_card}>
                                    <div className={style.head}>
                                          <h3>Hired across multiple profiles</h3>
                                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam obcaecati minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, unde.  Obcaecati Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, recusandae Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, ipsam.!!

                                          </p>
                                    </div>
                                    <div className={style.user}>
                                          <div className={style.uimg}>

                                          </div>
                                          <div className={style.name}>
                                              <h6>Arbaz Khan</h6>
                                              <small>Zappin</small>
                                          </div>
                                    </div>
                                 </div>
                            </SwiperSlide>
                            <SwiperSlide className={style.swipe_slide}>
                                 <div className={style.review_card}>
                                    <div className={style.head}>
                                          <h3>Hired across multiple profiles</h3>
                                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam obcaecati minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, unde.  Obcaecati Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, recusandae Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, ipsam.!!

                                          </p>
                                    </div>
                                    <div className={style.user}>
                                          <div className={style.uimg}>

                                          </div>
                                          <div className={style.name}>
                                              <h6>Arbaz Khan</h6>
                                              <small>Zappin</small>
                                          </div>
                                    </div>
                                 </div>
                            </SwiperSlide>
                            <SwiperSlide className={style.swipe_slide}>
                                 <div className={style.review_card}>
                                    <div className={style.head}>
                                          <h3>Hired across multiple profiles</h3>
                                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam obcaecati minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, unde.  Obcaecati Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, recusandae Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, ipsam.!!

                                          </p>
                                    </div>
                                    <div className={style.user}>
                                          <div className={style.uimg}>

                                          </div>
                                          <div className={style.name}>
                                              <h6>Arbaz Khan</h6>
                                              <small>Zappin</small>
                                          </div>
                                    </div>
                                 </div>
                            </SwiperSlide>

                            <SwiperSlide className={style.swipe_slide}>
                                 <div className={style.review_card}>
                                    <div className={style.head}>
                                          <h3>Hired across multiple profiles</h3>
                                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam obcaecati minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, unde.  Obcaecati Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, recusandae Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, ipsam.!!

                                          </p>
                                    </div>
                                    <div className={style.user}>
                                          <div className={style.uimg}>

                                          </div>
                                          <div className={style.name}>
                                              <h6>Arbaz Khan</h6>
                                              <small>Zappin</small>
                                          </div>
                                    </div>
                                 </div>
                            </SwiperSlide>
                            <SwiperSlide className={style.swipe_slide}>
                                 <div className={style.review_card}>
                                    <div className={style.head}>
                                          <h3>Hired across multiple profiles</h3>
                                          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam obcaecati minima Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, unde.  Obcaecati Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, recusandae Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, ipsam.!!

                                          </p>
                                    </div>
                                    <div className={style.user}>
                                          <div className={style.uimg}>

                                          </div>
                                          <div className={style.name}>
                                              <h6>Arbaz Khan</h6>
                                              <small>Zappin</small>
                                          </div>
                                    </div>
                                 </div>
                            </SwiperSlide>
                            
                            
                            
                    </Swiper>
                            <div className="swiper-button-prev2 w-full">
                                 <RiArrowLeftSLine style={{color:"#1e779d",fontSize:"1vmax",fontWeight:"500"}} className="rihgt_arrow" />
                            </div>
                            <div className="swiper-button-next2">
                                 <RiArrowRightSLine style={{color:"#1e779d",fontSize:"1vmax",fontWeight:"500"}} className="rihgt_arrow" />
                            </div>
           </div>
       </div>
     
     </>
  )
}

export default index