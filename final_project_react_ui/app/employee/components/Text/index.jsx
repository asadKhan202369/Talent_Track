import React from 'react'
import style from "./style.module.css"
const index = () => {
  return (
    <>
          <div className={style.home}>
                    <div className={style.homeleft}>
                        <div className={style.h1}>
                              <h1>Hire interns & freshers faster</h1>
                              <h1>from the <span>coolest platform</span></h1>
                              <h1> in India.</h1>
                         </div>
                         <h6>Post jobs for <span>free</span> now</h6>
                         <div className={style.btn}>
                               <small>Post for free</small>
                         </div>
                         <div className={style.leaf}>
                             <div className={style.imgl}>
                                  <img src="https://sheryians.com/Assets/images/Icon%20awesome-feather-alt.png" alt="" />
                             </div>
                             <p>we're about coding and designing, it's in our heart & we would love to share all of it with you.</p>
                         </div>
                    </div>
                    <div className={style.homeright}>
                        
                    </div>
               </div>
    </>
  )
}

export default index