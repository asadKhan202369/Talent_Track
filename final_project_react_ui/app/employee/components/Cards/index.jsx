import React from 'react'
import style from "./style.module.css"
import {MdKeyboardArrowRight } from 'react-icons/md'
const page = () => {
  return (
     <>
         <div className={style.cards}>
             <h1>A one stop solution for fast & hassle-free hiring</h1>
             <div className={style.card_options}>
                  <div className={style.left}>
                     <div className={style.left_options}>
                        <img src="https://internshala.com/static/images/registration/employer/registration_new/images/icons/filter-active.svg" alt="" />
                          <div className={style.lol}>
                              <h6>Faster shortlisting</h6>
                              <small>World class ATS with filters to shortlist candidates faster</small>
                          </div>
                          <MdKeyboardArrowRight className={style.oicon} />
                          <div className={style.bline}></div>
                     </div>
                     
                     <div className={style.left_options}>
                        <img src="https://internshala.com/static/images/registration/employer/registration_new/images/icons/calendar-inactive.svg" alt="" />
                          <div className={style.lol}>
                              <h6>Advanced hiring tools</h6>
                              <small>Built-in interview scheduler and assignment tool for hasslefree hiring</small>
                          </div>
                          <MdKeyboardArrowRight className={style.oicon} />
                          <div className={style.bline}></div>
                     </div>
                     <div className={style.left_options}>
                        <img src="https://internshala.com/static/images/registration/employer/registration_new/images/icons/calendar-inactive.svg" alt="" />
                          <div className={style.lol}>
                              <h6>Advanced hiring tools</h6>
                              <small>Built-in interview scheduler and assignment tool for hasslefree hiring</small>
                          </div>
                          <MdKeyboardArrowRight className={style.oicon} />
                          <div className={style.bline}></div>
                     </div>
                  </div>
                  <div className={style.right}>
                      <div className={style.imgdiv}>
                          <img src="https://internshala.com/static/images/registration/employer/registration_new/images/features/r991/advanced-hiring-tools.png" alt="" />
                      </div>
                  </div>
             </div>
         </div>
     </>
  )
}

export default page