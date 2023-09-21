import React from 'react'
import style from "./style.module.css"
import Nav from '../Nav/Nav'
import Main from './Main/index'
import Pcourses from './Pcourses/index'
import Top_companies from './Top_companies/index'
import Sug_login from './Sug_login/index'
import Jobs from './Jobs/index'
import { asynclogoutstudent } from "@/store/Actions/studentActions"
import { useDispatch } from 'react-redux'

const homepage = () => {
   const dispatch = useDispatch();

  const logout = ()=>{
     dispatch(asynclogoutstudent());
  }
  
  return (
    <>
       <Nav  />
       <Main />
      {/* <button onClick={logout}>logout</button> */}
       <Jobs />
       <Pcourses />
       <Sug_login />
       <Top_companies />
    </>
  )
}

export default homepage