import React from 'react'
import style from "./style.module.css"
const index = () => {
  return (
    <>
          <div className={style.home}>
                    <div className={style.homeleft}>
                        <div className={style.h1}>
                              <h1>Get interns & Jobs faster</h1>
                              <h1>from the <span>coolest platform</span></h1>
                              <h1> in India.</h1>
                         </div>
                         <h6>Aplply for Jobs/Internships for <span>free</span> now</h6>
                         <div className={style.btn}>
                               <small>Apply for free</small>
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










// import React from 'react'

// const Main = () => {
//   return (
//     <div className='main w-full'> 
//         <div className="div w-full flex items-center justify-center pb-10 pt-20">
//              <h1 className="text-left text-gray-700 text-3xl font-extrabold font-['roobert'] pl-4 sm:pl-0 sm:text-5xl" >Make your dream career a reality</h1>
//         </div>
//     </div>
//   )
// }

// export default Main