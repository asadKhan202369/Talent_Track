"use client"
import React from 'react'
import { useEffect } from "react";
import Home from "@/app/student/home/page" 
import { useSelector, useDispatch } from "react-redux";
import { asyncgethome,asynclogoutstudent   } from '@/store/Actions/studentActions'

const page = () => {
  const dispatch = useDispatch();
  const { student, isAuthenticated} = useSelector((state) => state.studentReducers); 
  
  useEffect(()=>{
    dispatch(asyncgethome());
  },[])

  return (
    <>
      <Home />
    </>
  )
}

export default page