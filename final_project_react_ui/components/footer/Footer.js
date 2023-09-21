import React from 'react'
import style from "./style.module.css"
import { BiSolidPhoneCall } from "react-icons/bi"
import { HiMail } from "react-icons/hi"
import { BsInstagram ,BsLinkedin} from "react-icons/bs"
import { FaFacebookF } from "react-icons/fa"

const Footer = () => {
  return (
    <>
       <div className={style.footer}>
           <div className={style.fimg}>
                <img src="https://ik.imagekit.io/sheryians/Sheryians_Logo_wFKd9VClG.png" alt="" />
           </div>
           <div className={style.tags}>
                 <h6>Privacy Policy</h6>
                 <h6>Terms and Conditions</h6>
                 <h6>Pricing and Refund</h6>
           </div>
           <div className={style.tags}>
                 <h6>Post Jobs/Internships</h6>
                 <h6>Hire from here</h6>
                 <h6>Pricing and Refund</h6>
           </div>
           <div className={style.tags}>
                 <h6>Community</h6>
                 <h6>Our services</h6>
           </div>
           <div className={style.dets}>
                <h4>Contact us</h4>
                <div className={style.rows}>
                       <BiSolidPhoneCall className={style.icns} />
                       <p>+91 8962834895</p>
                </div>
                <div className={style.rows}>
                       <HiMail className={style.icns} />
                       <p>contact@talenttrack.com</p>
                </div>
                <div className={style.sinc}>
                     <BsInstagram className={style.sicns} />
                     <FaFacebookF className={style.sicns} />
                     <BsLinkedin className={style.sicns} />
                </div>
           </div>
       </div>
    </>
  )
}

export default Footer