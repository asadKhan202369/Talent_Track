"use client"
import React from 'react'
import style from './style.module.css'
const Sug_l = () => {
  return (
    <>
        <div>
            <div className="style div">

            </div>
             <div className="style sugg flex items-center h-64">
                  <div className="style sleft w-1/2 flex items-center justify-center">
                      <h1 className="text-left text-white tracking-wide font-['roobert'] font-bold">Empower your career with <br /> Internshala today</h1>
                  </div>
                  <div className="style sright flex gap-3 items-center justify-center w-1/2 h-full">
                        <div className="style google flex items-center justify-center gap-1">
                              <img src="https://internshala.com/static/images/login/google_logo_24.svg" alt="" />
                              <small className="font-['roobert'] font-medium text-md">Continue with Google</small>
                        </div>
                        <div className="style register flex items-center justify-center rounded">
                              <small className='whitespace-nowrap'>Register Now</small>
                        </div>
                  </div>
             </div>
        </div>

    </>
  )
}

export default Sug_l