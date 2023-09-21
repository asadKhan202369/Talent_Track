"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "@/components/Nav/Nav";
import style from "./style.module.css";
import { GrHomeRounded } from "react-icons/gr";
import { asynccurrentstudent } from "@/store/Actions/studentActions";
import { useEffect } from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { GoLocation } from "react-icons/go";
import { ImProfile } from "react-icons/im";
import { BiTimeFive } from "react-icons/bi";
import { BsCash } from "react-icons/bs";
import { asyncfindjob } from "@/store/Actions/employeeAction";
import { formatDistanceToNow } from "date-fns";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import { IoIosTimer } from "react-icons/io"
import { RiHourglassFill } from "react-icons/ri"
import { AiOutlineCalendar } from "react-icons/ai"
import { HiOutlineUserGroup,HiOutlineMail } from "react-icons/hi"
import Link from "next/link";
import { asyncapply } from "@/store/Actions/employeeAction";
import Loader from "@/components/loader/loader";
import Footer from "@/components/footer/Footer";

const page = () => {
  const dispatch = useDispatch();
  const { student, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const { findjob } = useSelector((state) => state.employeeReducer);
  
  const [functionCalled, setFunctionCalled] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (functionCalled) {
      dispatch(asynccurrentstudent());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      const parts = url.split("/");
      const id = parts[parts.length - 1];
      setId(id);
    }
  }, []);

  
  useEffect(() => {
    if(id){
      dispatch(asynccurrentstudent());
      findJobDetails();
    }
  }, [id,asynccurrentstudent]);
 
  const findJobDetails = () => {
    dispatch(asyncfindjob(id));
  };
  
  const [showi, setshowi] = useState(false);
  const [showloc, setshowloc] = useState(false);

  const toggleJob = () => {
    setshowloc(!showloc);
  };

  const initialjobData = {
    avail: "",
    plink: "",
    // Add more fields as needed
  };

  const [jobData, setjobData] = useState(initialjobData);

  const inputjobEvent = (event) => {
    const { name, value } = event.target;

    setjobData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const Jobform = async (id) => {
    event.preventDefault();
    try {
      await dispatch(asyncapply(id, jobData));
      setjobData(initialjobData); // Reset form fields
      setFunctionCalled(true);
      toggleJob();
    } catch (error) {
      console.log(error);
    }
  };

  const clk = () => {
    setshowi(!showi);
  };

  const ht = {
    height: "10vh",
    width: "40vw",
  };

  return (
    <>
      {showloc && (
        <div className={`${style.edu_form}`}>
          <div className={style.e_head}>
            <h6>Applying for {findjob.title}</h6>
            <MdClose className={style.close} onClick={toggleJob} />
          </div>
          <div className={style.form_div}>
            <form className={style.form_apl} onSubmit={() => Jobform(id)}>
              <div className={style.rsm}>
                <h1>Your resume</h1>
                <h6>
                  Your current resume will be submitted along with this
                  application.{" "}
                  <Link style={{ textDecoration: "none" }} href="/resume">
                    <span>Edit resume</span>
                  </Link>
                </h6>
              </div>
              <div className={style.selectin}>
                <div className={style.inp}>
                  <h1>Your availability</h1>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Confirm your availability
                  </label>
                  <div className={style.dates}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="avail"
                        id="flexRadioDefault2"
                        // value={jobData.otype}
                        value="available"
                        onChange={inputjobEvent}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Yes, I am available for work from home job, starting
                        immediately
                      </label>
                    </div>
                    <div onClick={clk} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="avail"
                        id="flexRadioDefault1"
                        // value={jobData.otype}
                        value="not"
                        onChange={inputjobEvent}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        No (Please specify your availability)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {showi && (
                <div className="mb-3">
                  <input
                    style={ht}
                    value={jobData.title}
                    onChange={inputjobEvent}
                    name="avail"
                    placeholder="e.g i am available for work in office,but will require a week relocate  currently "
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              )}

              <div className={style.dates}>
                <h5>Assessment</h5>
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
                    Please share your portfolio/projects work on.(optional)
                  </label>
                  <input
                    style={ht}
                    value={jobData.plink}
                    onChange={inputjobEvent}
                    name="plink"
                    placeholder="Enter Link.... "
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>

              <div className={style.btn}>
                <button
                  onClick={() => Jobform(id)}
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

      {findjob ? (
        <div className={style.main}>
          <Nav student={student} isAuthenticated={isAuthenticated} />
          <div className={style.top_head}>
            <div className={style.txt}>
              <div className={style.h1s}>
                <h1>{findjob.title}</h1>
                <h1>
                  <span>at</span> &nbsp;{findjob.ownerid.organisationlocation}
                </h1>
              </div>
              <h6>{findjob.description}</h6>
              <div className={style.btns}>
                  <small>VIEW COMPANY</small>
                  {student && 
                    student.applied.some(application => application.jobid === id) ? (
                        <small>APPLIED</small>
                    ) : (
                      <small onClick={toggleJob}>APPLY FOR THIS JOB</small>
                    )
                  }
              </div>
            </div>
          </div>
          <h5>About this role</h5>
          <div className={style.aboutjob}>
            <div className={style.abtlft}>
              <div className={style.compdiv}>
                <div className={style.clogo}>
                  <img src={findjob.ownerid.organisationlogo.url} alt="" />
                </div>
                <div className={style.cname}>
                  <h3>{findjob.title}</h3>
                  <h6>
                    {findjob.ownerid.organisationname}, -{" "}
                    {findjob.ownerid.organisationname} UK
                  </h6>
                  <p>₹ {findjob.stipend}/-Month</p>
                </div>
              </div>

              <div className={style.tpp}>
                <div className={style.heading}>
                  <h5>Profile Type : </h5>
                  <h5>Location : </h5>
                  <h5>JobMode : </h5>
                  <h5>JobType : </h5>
                  <h5>Stipend/Salary : </h5>
                </div>
                <div className={style.tppp}>
                  <div className={style.tp}>
                    <ImProfile className={style.hicn} />
                    <h6>{findjob.otype}</h6>
                  </div>
                  <div className={style.tp}>
                    <GoLocation className={style.hicn} />
                    <h6>{findjob.location}</h6>
                  </div>

                  {findjob.type === "Online" ? (
                    <div className={style.tp}>
                      <GrHomeRounded className={style.hicn} />
                      <h6>{findjob.type}</h6>
                    </div>
                  ) : (
                    <>
                      <div className={style.tp}>
                        <HiOutlineOfficeBuilding className={style.hicn} />

                        <h6>{findjob.type}</h6>
                      </div>
                    </>
                  )}

                  <div className={style.tp}>
                    <BiTimeFive className={style.hicn} />
                    <h6>{findjob.time}</h6>
                  </div>
                  <div className={style.tp}>
                    <BsCash className={style.hicn} />
                    <h6>₹ {findjob.stipend} -/Month</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.skills_div}>
              <small>{findjob.description}</small>
              <h4>Required Skills</h4>
              <div className={style.skill}>
                {findjob.requiredSkills.map((skl, idx) => {
                  return <small key={idx}>{skl}</small>;
                })}
              </div>
            </div>
          </div>
          <div className={style.divs}>
              <h6>
                 <IoIosTimer className={style.timer} />
                 {formatDistanceToNow(new Date(findjob.createdAt))} ago
              </h6>
              <h6>
                  <HiOutlineUserGroup  className={style.timer}/>
                   {findjob.applicants.length} applicants
              </h6>

              <h5>Number of openings : {findjob.opening} </h5>
              <h5>
                 <RiHourglassFill />
                  Apply by : {findjob.applicationDeadline} </h5>
          </div>
          <div className={style.company_act}>
              <h6>Activity on Internshala</h6>
              <div className={style.cbtmm}>
                
                    <div className={style.cbl}>
                         <AiOutlineCalendar className={style.icnc} />
                         <small>Hiring since {findjob.ownerid.createdAt}</small>
                    </div>
                    <div className={style.cbl}>
                         <HiOutlineMail className={style.icnc} />
                         <small>{findjob.ownerid.job.length} opportunities posted</small>
                    </div>
                    <div className={style.cbl}>
                         <AiOutlineCalendar className={style.icnc} />
                         <small>{findjob.ownerid.hired.length} Candidate hired</small>
                    </div>
              </div>
          </div>
                
          <Footer/>
        </div>
      ) : ( 
        <Loader/>
      )}
    </>
  );
};

export default page;
