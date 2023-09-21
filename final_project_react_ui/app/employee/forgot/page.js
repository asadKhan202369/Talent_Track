"use client"
import style from './style.module.css'
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import axios from '@/utils/axios';
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {AiFillGoogleCircle} from "react-icons/ai"
import {RxCross2} from "react-icons/rx"
import Link from 'next/link';
import { asyncresetpassword } from "@/store/Actions/studentActions"

const index = () => {
    const dispatch = useDispatch();
  const router = useRouter();

  const input = {
    // height: '60vh',.
    width:'25vw',
    padding:'.6vmax 0vmax',
    paddingLeft:'1.4vmax',
    borderRadius:'3vmax',
    outline:'none',
    focus:'none',
    boxShadow: ' 0 1px 1px rgba(0,0,0,0.12), 0 2px 2px rgba(0,0,0,0.12)'

  };

  const button = {
    // height: '60vh',.
    padding:'.6vmax 0vmax',
    borderRadius:'3vmax',
    outline:'none',
    focus:'none',
    // backgroundColor:'#f2d069',
    backgroundColor:'#1e779d',
    border:'none',
    color:'#fff',
    fontFamily:'roobert',
    letterSpacing:'1px',
    fontWeight:'500',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
  };


    const initialFormData = {
      email: '',
        //   password: '',
      // Add more fields as needed
    };
    const [formData, setformData] =  useState(initialFormData)

    const inputEvent=(event)=>{
      const {name, value} = event.target;

      setformData((preData)=>{
          return {
              ...preData,
              [name]:value
          }
      })
    }
   
    const formHandler = async (e)=>{
        e.preventDefault();
        try{ 
             
             dispatch(asyncresetpassword(formData));
             setformData(initialFormData); // Reset form fields        
        }catch(error){
            console.log(error);
        }
    }

  return (
    
    <>
       <div className={style.register_page}>
            <Link style={{color:"#111"}} href="/"><RxCross2 className={style.crosss} /></Link>
           <div className={style.register}>
            
               <div className={style.left_l}>
                {/* <img src="https://i.pinimg.com/originals/d2/1b/4f/d21b4f4df62a50685043d04dcaabc7b8.jpg" alt="" /> */}
                    <h3 style={{textAlign:"left"}}> Forgot Your Password</h3>
                    <p>No Worries! Enter Your Email and We will send you a reset link on your email.</p>
                    <div className={style.lbtm}>
                    </div>
               </div>
               <div className={style.right_r}>
                   <h3>FORGOT FORM</h3>
                   {/* <div className={style.options}>
                          <small>As a</small>
                          <div className={style.se}>
                              <h6 className={style.h6}>Student</h6>
                              <h6 onClick={rempl}>Employee</h6>
                          </div>
                     </div> */}
                     <form className="flex flex-col items-center mt-16" onSubmit={formHandler}>
                       
                        <div className="mb-3">
                            <label style={{paddingLeft:"1vmax",fontWeight:"600",fontFamily:"roobert",letterSpacing:"1px"}} htmlFor="exampleInputPassword1" className="form-label">Email</label>
                            <input style={input}  placeholder='Enter Your Email' required name='email' value={formData.email} onChange={inputEvent} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="username" />
                        </div>
    
                        <button style={button} onClick={formHandler} type="submit" className="btn btn-primary text-center flex items-center justify-center w-48 mt-3 bg-yellow-500 ">Send Request</button>
                     </form>

               </div>
           </div>
       </div>
    </>
    
  )
}

export default index