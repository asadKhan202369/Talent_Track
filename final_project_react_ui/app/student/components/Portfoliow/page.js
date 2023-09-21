import React from 'react'
import style from "@/app/student/resume/style.module.css"
import { useState } from 'react';
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus,AiOutlineClose } from "react-icons/ai";
import { useEffect } from 'react';
import { asyncaddportfolio ,asyncfindlink,asyncupdatelink,asyncdeletelink } from "@/store/Actions/studentresumeActions"
import { asyncgetresume } from "@/store/Actions/studentActions"
import { useDispatch,useSelector } from 'react-redux';

const page = () => {

  const { student,resume, isAuthenticated,message} = useSelector((state) => state.studentReducers); 
  const { findlinks} = useSelector((state) => state.studentReducers); 
  console.log(findlinks,"its link");

  const dispatch = useDispatch();
  const [showlinks, setShowlinks] = useState(false);
  const [links, setlinks] = useState([]);
  const [updatelinkData, setUpdatelinkData] = useState('');
  const [functionCalled, setFunctionCalled] = useState(false);

  useEffect(()=>{
    if (student && student.resume) {
       setlinks(student.resume.portfolio);
       console.log(student.resume.portfolio,"its a portfolio");
    }
  },[student])

  useEffect(() => {
    if (functionCalled) {
      dispatch(asyncgetresume());
      dispatch(asyncgetresume());
      setFunctionCalled(false);
    }
  }, [functionCalled]);


   //   {/* ------------ update Links --------------------- */}
   
   useEffect(() => {
    setUpdatelinkData(findlinks);  
  }, [findlinks]);

  const updateEvent = (event) => {
    const { name, value } = event.target;
    setUpdatelinkData((preData) => {
    return {
        ...preData,
        [name]: value,
    };
    });
  };

  const resetUpdatelinksData = () => {
    setUpdatelinkData('')
  };

  const findlinkHandler = async (id) => {
    try {
      dispatch(asyncfindlink(id))  
    } catch (error) {
      console.log(error);
    }
  };


  
  const updatelinkHandler = async (id) => {
    try {
      event.preventDefault();
      dispatch(asyncupdatelink(id, updatelinkData));
      resetUpdatelinksData();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

    const togglelinks = () => {
      setShowlinks(!showlinks);
    };
    const initiallinkData = {
        blog:'',
        Github:'',
        PS:'',
        Behance:'',
        MW:''
       // Add more fields as needed
     };

    const [linkData, setlinkData] = useState(initiallinkData)

    const inputlinkEvent = (event) => {
        const { name, value } = event.target;
    
        setlinkData((preData) => {
          return {
            ...preData,
            [name]: value,
          };
        });
    };
      
    const linkform = async (e) => {
        e.preventDefault();
        try {
          dispatch(asyncaddportfolio(linkData))
          setlinkData(initiallinkData); // Reset form fields
          setShowlinks(!showlinks);
          setFunctionCalled(true);

        } catch (error) {
          console.log(error);
        }
    };

     {/* ------------ delete intern --------------------- */}

      const deletelink = async (id) => {
        try {
          dispatch(asyncdeletelink(id));
          setFunctionCalled(true);
        } catch (error) {
          console.log(error);
        }
      };

 {/* ------------ delete intern --------------------- */}

  return (
    <>
       
       {/* ------------ add Add portfolio/ work sample --------------------- */}

       {showlinks && (

           <div style={{display:"initial"}} className={style.edu_form}>
           <div className={style.e_head}>
           <AiOutlineClose className={style.close} onClick={togglelinks} />    

           <h6>Add Links</h6>
           </div>
           <div className={style.form_div}>
           <form onSubmit={linkform}>
               <div className="mb-3">
               <label
                   style={{
                   fontFamily: "roobert",
                   fontSize: "1vmax",
                   fontWeight: "550",
                   }}
                   htmlFor="exampleInputEmail1"
                   className="form-label"
               >
                   Blog link
               </label>
               <input
                   value={linkData.blog}
                   onChange={inputlinkEvent}
                   name="blog"
                   placeholder="http://myblog.com"
                   type="text"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
               />
               </div>
               <div className="mb-3">
               <label
                   style={{
                   fontFamily: "roobert",
                   fontSize: "1vmax",
                   fontWeight: "550",
                   }}
                   htmlFor="exampleInputEmail1"
                   className="form-label"
               >
                   GitHub profile
               </label>
               <input
                   value={linkData.Github}
                   onChange={inputlinkEvent}
                   name="Github"
                   placeholder="http://GitHub.com/my_profile"
                   type="text"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
               />
               </div>
               <div className="mb-3">
               <label
                   style={{
                   fontFamily: "roobert",
                   fontSize: "1vmax",
                   fontWeight: "550",
                   }}
                   htmlFor="exampleInputEmail1"
                   className="form-label"
               >
                   Play store developer A/c (public link)
               </label>
               <input
                   value={linkData.PS}
                   onChange={inputlinkEvent}
                   name="PS"
                   placeholder="http://play.google.com/store/apps/developer?id=myapps"
                   type="text"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
               />
               </div>
               <div className="mb-3">
               <label
                   style={{
                   fontFamily: "roobert",
                   fontSize: "1vmax",
                   fontWeight: "550",
                   }}
                   htmlFor="exampleInputEmail1"
                   className="form-label"
               >
                   Behance portfolio link
               </label>
               <input
                   value={linkData.Behance}
                   onChange={inputlinkEvent}
                   name="Behance"
                   placeholder="http://behance.net/my_profile"
                   type="text"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
               />
               </div>
           
               <div className="mb-3">
               <label
                   style={{
                   fontFamily: "roobert",
                   fontSize: "1vmax",
                   fontWeight: "550",
                   }}
                   htmlFor="exampleInputEmail1"
                   className="form-label"
               >
                   Other work sample link
               </label>
               <h6 className={style.d}>Your work samples could be in the form of social media posts, presentations, documents, website etc. If you have multiple work samples, upload them to google drive and add the link here.</h6>
               <input
                   value={linkData.MW}
                   onChange={inputlinkEvent}
                   name="MW"
                   placeholder="http:/myworksample.com"
                   type="text"
                   className="form-control"
                   id="exampleInputEmail1"
                   aria-describedby="emailHelp"
               />
               </div>
           
           

       
               <div className={style.btn}>
               <button
                   onClick={linkform}
                   type="submit"
                   className="btn btn-primary"
               >
                   Submit
               </button>
               </div>
           </form>
           </div>
           </div>

       )}

      {updatelinkData && (

        <div style={{display:"initial"}} className={style.edu_form}>
        <div className={style.e_head}>
        <h6> Edit Links</h6>
        <AiOutlineClose className={style.close} onClick={resetUpdatelinksData} />    

        </div>
        <div className={style.form_div}>
        <form onSubmit={()=> updatelinkHandler(updatelinkData.id)}>
            <div className="mb-3">
            <label
                style={{
                fontFamily: "roobert",
                fontSize: "1vmax",
                fontWeight: "550",
                }}
                htmlFor="exampleInputEmail1"
                className="form-label"
            >
                Blog link
            </label>
            <input
               
                name="blog"
                value={updatelinkData.blog}
                onChange={updateEvent}
                placeholder="http://myblog.com"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
            />
            </div>
            <div className="mb-3">
            <label
                style={{
                fontFamily: "roobert",
                fontSize: "1vmax",
                fontWeight: "550",
                }}
                htmlFor="exampleInputEmail1"
                className="form-label"
            >
                GitHub profile
            </label>
            <input
                value={updatelinkData.GitHub}
                onChange={updateEvent}
                name="Github"
                placeholder="http://GitHub.com/my_profile"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
            />
            </div>
            <div className="mb-3">
            <label
                style={{
                fontFamily: "roobert",
                fontSize: "1vmax",
                fontWeight: "550",
                }}
                htmlFor="exampleInputEmail1"
                className="form-label"
            >
                Play store developer A/c (public link)
            </label>
            <input
               value={updatelinkData.PS}
               onChange={updateEvent}
                name="PS"
                placeholder="http://play.google.com/store/apps/developer?id=myapps"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
            />
            </div>
            <div className="mb-3">
            <label
                style={{
                fontFamily: "roobert",
                fontSize: "1vmax",
                fontWeight: "550",
                }}
                htmlFor="exampleInputEmail1"
                className="form-label"
            >
                Behance portfolio link
            </label>
            <input
               value={updatelinkData.Behance}
               onChange={updateEvent}
                name="Behance"
                placeholder="http://behance.net/my_profile"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
            />
            </div>
        
            <div className="mb-3">
            <label
                style={{
                fontFamily: "roobert",
                fontSize: "1vmax",
                fontWeight: "550",
                }}
                htmlFor="exampleInputEmail1"
                className="form-label"
            >
                Other work sample link
            </label>
            <h6 className={style.d}>Your work samples could be in the form of social media posts, presentations, documents, website etc. If you have multiple work samples, upload them to google drive and add the link here.</h6>
            <input
                value={updatelinkData.MW}
                onChange={updateEvent}
                name="MW"
                placeholder="http:/myworksample.com"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
            />
            </div>
        
        

    
            <div className={style.btn}>
            <button
                onClick={()=> updatelinkHandler(updatelinkData.id)}
                type="submit"
                className="btn btn-primary"
            >
                Submit
            </button>
            </div>
        </form>
        </div>
        </div>
        
      )}


    

        <div className={style.rsm}>
            <div className={style.edu}>
              <div className={style.l_edu}>
                <h4>PORTFOLIO/ WORK SAMPLES</h4>
              </div>
              <div className={style.r_edu}>
                <div className={style.rows}>

                {links  .map((el, i) => {
                    
                    return (
                        
                        <div key={i} className={style.row_container}>
                                <div className={style.row}>
                                    <h5>{el.blog}</h5>
                                    <h6>{el.Behance}</h6>
                                    <h6>{el.GitHub}</h6>
                                    <h6>{el.PS}</h6>
                                    <h6>{el.MW}</h6>
                                    
                                </div>
                                <div className={style.ricn}>
                                    <HiOutlinePencil onClick={()=> findlinkHandler(el.id)} className={style.ri} />
                                    <RiDeleteBinLine onClick={()=>{deletelink(el.id)}} className={style.ri} />
                                </div>
                            </div>
                    );
                })}
                
                  <div onClick={togglelinks} className={style.add}>
                    <AiOutlinePlus className={style.addi} />
                    <h6>Add portfolio/ work sample</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
    </>
  )
}

export default page