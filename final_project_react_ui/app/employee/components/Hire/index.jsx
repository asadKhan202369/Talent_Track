import React from 'react'
import style from './style.module.css'
import {AiOutlineUserAdd} from "react-icons/ai"
import { RiFileCloudLine } from "react-icons/ri"
import { MdOutlinePersonSearch } from "react-icons/md"
const index = () => {
  return (
    <>
       <div className={style.steps_div}>
            <h1>Hire interns in 3 Simple Steps</h1>
            <div className={style.steps}>
                  <div className={style.step}>
                        <AiOutlineUserAdd className={style.icons} />
                       <h6>SIGN UP</h6>
                       <small>Get started by creating your <br />account</small>
                  </div>
                  <div className={style.step}>
                        <RiFileCloudLine className={style.icons} />
                       <h6>POST</h6>
                       <small>Post internship for any <br /> profile and location</small>
                  </div>
                  <div className={style.step}>
                        <MdOutlinePersonSearch className={style.icons} />
                       <h6>HIRE</h6>
                       <small>Screen and hire at your <br /> fingertips</small>
                  </div>
            </div>
       </div>
    </>
  )
}

export default index