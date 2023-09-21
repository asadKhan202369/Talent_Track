"use client";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { PiWarningCircleBold } from "react-icons/pi";
import { FiDownload } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import React from "react";
import style from "@/app/student/resume/style.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncaddedu,
  asyncfindeducation,
  asyncupdateedu,
  asyncdeleteedu,
} from "@/store/Actions/studentresumeActions";
import { asyncgetresume } from "@/store/Actions/studentActions";

const page = () => {
  const { student, resume, isAuthenticated } = useSelector(
    (state) => state.studentReducers
  );
  const { findedu } = useSelector((state) => state.studentReducers);
  const dispatch = useDispatch();
  const [educationr, setEducationr] = useState([]);
  const [Grad, setGrad] = useState(false);
  const [functionCalled, setFunctionCalled] = useState(false);
  const [updateData, setUpdateData] = useState("");

  useEffect(() => {
    if (student && student.resume) {
      setEducationr(student.resume.education);
    }
  }, [student]);

  useEffect(() => {
    if (functionCalled) {
      dispatch(asyncgetresume());
      setFunctionCalled(false);
    }
  }, [functionCalled]);

  const closecard = () => {
    setGrad(!Grad);
  };

  const initialFormData = {
    collagename: "",
    startYear: "",
    endYear: "",
    Degree: "",
    Stream: "",
    PScale: "",
    Perform: "",
    persuing: "",
    yearofcomp: "",
    board: "",
    university:""

    // Add more fields as needed
  };

  const [formData, setformData] = useState(initialFormData);

  {
    /* ------------ update education --------------------- */
  }

  useEffect(() => {
    setUpdateData(findedu);
  }, [findedu]);

  const updateEvent = (event) => {
    const { name, value } = event.target;
    setUpdateData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const resetUpdateData = () => {
    setUpdateData("");
  };

  const findeducation = async (id) => {
    try {
      dispatch(asyncfindeducation(id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateGrad = async (id) => {
    try {
      event.preventDefault();
      dispatch(asyncupdateedu(id, updateData));
      resetUpdateData();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* ------------ update education --------------------- */
  }

  {
    /* ------------ add education --------------------- */
  }

  const inputEvent = (event) => {
    const { name, value } = event.target;

    setformData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const Gradform = async (e) => {
    e.preventDefault();
    try {
      dispatch(asyncaddedu(formData));
      setformData(initialFormData);
      closecard();
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* ------------ add education --------------------- */
  }

  {
    /* ------------ delete education --------------------- */
  }

  const deleteGrad = async (id) => {
    try {
      dispatch(asyncdeleteedu(id));
      setFunctionCalled(true);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* ------------ delete education --------------------- */
  }

  return (
    <>
      {/* ------------ add Gradution --------------------- */}

      {Grad && (
        <div
          style={{ display: "initial", height: "97vh" }}
          className={style.edu_form}
        >
          <div className={style.e_head}>
            <AiOutlineClose className={style.close} onClick={closecard} />
            <h6>Add Education details</h6>
          </div>
          <div className={style.form_div}>
            <form onSubmit={Gradform}>
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
                  Education Type
                </label>
                <select
                  value={formData.edutype}
                  onChange={inputEvent}
                  name="edutype"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="choose Year">Choose Education Type</option>
                  <option value="graduation/postgraduation">
                    graduation/ post graduation
                  </option>
                  <option value="secondary(X)">Add secondary (X)</option>
                  <option value="secondary(XII)">Senior secondary (XII)</option>
                  <option value="diploma">Diploma</option>
                </select>
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
                  College/School Name
                </label>
                <input
                  value={formData.collagename}
                  onChange={inputEvent}
                  name="collagename"
                  placeholder="e.g College Name"
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
                  Board/university Name
                </label>
                <input
                  value={formData.university}
                  onChange={inputEvent}
                  name="university"
                  placeholder="e.g College Name"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className={style.dates}>
                <div className={style.select}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    Start year
                  </label>
                  <select
                    value={formData.startYear}
                    onChange={inputEvent}
                    name="startYear"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="Choose Year">Choose Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                  </select>
                </div>
                <div className={style.select}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    End year
                  </label>
                  <select
                    value={formData.endYear}
                    onChange={inputEvent}
                    name="endYear"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="Choose Year">Choose Year</option>
                    <option value="2029">2029</option>
                    <option value="2028">2028</option>
                    <option value="2027">2027</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                  </select>
                </div>
              </div>
              <div className={style.dates}>
                <div className={style.select}>
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
                      Degree / Diploma
                    </label>
                    <input
                      value={formData.Degree}
                      onChange={inputEvent}
                      name="Degree"
                      placeholder="e.g B.Sc (Hons.)"
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <div className={style.select}>
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
                      Stream(Optional)
                    </label>
                    <input
                      value={formData.Stream}
                      onChange={inputEvent}
                      name="Stream"
                      placeholder="e.g Economics"
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
              </div>

              <div className={style.dates}>
                <div className={style.select}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    Performance Scale (Optional)
                  </label>
                  <select
                    value={formData.PScale}
                    onChange={inputEvent}
                    name="PScale"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="CGPA (Scale of 10)">
                      CGPA (Scale of 10)
                    </option>
                    <option value="CGPA (Scale of 9)">CGPA (Scale of 9)</option>
                    <option value="CGPA (Scale of 8)">CGPA (Scale of 8)</option>
                    <option value="CGPA (Scale of 7)">CGPA (Scale of 7)</option>
                    <option value="CGPA (Scale of 5)">CGPA (Scale of 5)</option>
                    <option value="CGPA (Scale of 4)">CGPA (Scale of 4)</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div style={{ marginTop: ".9vmax" }} className={style.select}>
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
                      Performance (Optional)
                    </label>
                    <input
                      value={formData.Perform}
                      onChange={inputEvent}
                      name="Perform"
                      placeholder="0.00"
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
              </div>
              <div className={style.btn}>
                <button
                  onClick={Gradform}
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

      {/* ------------ add Gradution --------------------- */}

      {/* ------------ Update Gradution --------------------- */}

      {updateData && (
        <div className={style.edu_form}>
          <div className={style.e_head}>
            <AiOutlineClose className={style.close} onClick={resetUpdateData} />
            <h6>Edit Education Details</h6>
          </div>
          <div className={style.form_div}>
            <form onSubmit={() => updateGrad(updateData.id)}>
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
                  Education Type
                </label>
                <select
                  value={updateData.edutype}
                  onChange={updateEvent}
                  name="edutype"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="choose Year">Choose Education Type</option>
                  <option value="graduation/postgraduation">
                    graduation/ post graduation
                  </option>
                  <option value="secondary(X)">Add secondary (X)</option>
                  <option value="secondary(XII)">Senior secondary (XII)</option>
                  <option value="diploma">Diploma</option>
                </select>
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
                  College/School name
                </label>
                <input
                  value={updateData.collagename}
                  onChange={updateEvent}
                  name="collagename"
                  placeholder="e.g College Name"
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
                  Board/university Name
                </label>
                <input
                  value={updateData.university}
                  onChange={updateEvent}
                  name="university"
                  placeholder="e.g College Name"
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className={style.dates}>
                <div className={style.select}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    Start year
                  </label>
                  <select
                    value={updateData.startYear}
                    onChange={updateEvent}
                    name="startYear"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="choose Year">Choose Year</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                  </select>
                </div>
                <div className={style.select}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    End year
                  </label>
                  <select
                    value={updateData.endYear}
                    onChange={updateEvent}
                    name="endYear"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="Choose Year">Choose Year</option>
                    <option value="2029">2029</option>
                    <option value="2028">2028</option>
                    <option value="2027">2027</option>
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2011">2011</option>
                    <option value="2010">2010</option>
                    <option value="2009">2009</option>
                    <option value="2008">2008</option>
                    <option value="2007">2007</option>
                    <option value="2006">2006</option>
                    <option value="2005">2005</option>
                    <option value="2004">2004</option>
                    <option value="2003">2003</option>
                    <option value="2002">2002</option>
                    <option value="2001">2001</option>
                    <option value="2000">2000</option>
                    <option value="1999">1999</option>
                    <option value="1998">1998</option>
                    <option value="1997">1997</option>
                    <option value="1996">1996</option>
                    <option value="1995">1995</option>
                    <option value="1994">1994</option>
                    <option value="1993">1993</option>
                    <option value="1992">1992</option>
                    <option value="1991">1991</option>
                    <option value="1990">1990</option>
                    <option value="1989">1989</option>
                    <option value="1988">1988</option>
                    <option value="1987">1987</option>
                    <option value="1986">1986</option>
                    <option value="1985">1985</option>
                    <option value="1984">1984</option>
                    <option value="1983">1983</option>
                    <option value="1982">1982</option>
                    <option value="1981">1981</option>
                    <option value="1980">1980</option>
                  </select>
                </div>
              </div>
              <div className={style.dates}>
                <div className={style.select}>
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
                      Degree
                    </label>
                    <input
                      value={updateData.Degree}
                      onChange={updateEvent}
                      name="Degree"
                      placeholder="e.g B.Sc (Hons.)"
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <div className={style.select}>
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
                      Stream(Optional)
                    </label>
                    <input
                      value={updateData.Stream}
                      onChange={updateEvent}
                      name="Stream"
                      placeholder="e.g Economics"
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
              </div>

              <div className={style.dates}>
                <div className={style.select}>
                  <label
                    style={{
                      fontFamily: "roobert",
                      fontSize: "1vmax",
                      fontWeight: "550",
                    }}
                    htmlFor="exampleInputEmail1"
                    className="form-label"
                  >
                    Performance Scale (Optional)
                  </label>
                  <select
                    value={updateData.PScale}
                    onChange={updateEvent}
                    name="PScale"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="CGPA (Scale of 10)">
                      CGPA (Scale of 10)
                    </option>
                    <option value="CGPA (Scale of 9)">CGPA (Scale of 9)</option>
                    <option value="CGPA (Scale of 8)">CGPA (Scale of 8)</option>
                    <option value="CGPA (Scale of 7)">CGPA (Scale of 7)</option>
                    <option value="CGPA (Scale of 5)">CGPA (Scale of 5)</option>
                    <option value="CGPA (Scale of 4)">CGPA (Scale of 4)</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div style={{ marginTop: ".9vmax" }} className={style.select}>
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
                      Performance (Optional)
                    </label>
                    <input
                      value={updateData.Perform}
                      onChange={updateEvent}
                      name="Perform"
                      placeholder="0.00"
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
              </div>
              <div className={style.btn}>
                <button
                  onClick={() => updateGrad(updateData.id)}
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

      {/* ------------ add Gradution --------------------- */}

      <div className={style.rsm}>
        <div className={style.edu}>
          <div className={style.l_edu}>
            <h4>EDUCATION</h4>
          </div>
          <div className={style.r_edu}>
            <div className={style.rows}>
              {educationr.map((el, i) => {
                return (
                  <div key={i} className={style.row_container}>
                    <div className={style.row}>
                      {el.edutype === "graduation/postgraduation" ? (
                        <h5 style={{ textTransform: "capitalize" }}>
                          {el.Degree},&nbsp;{el.Stream}
                        </h5>
                      ) : (
                        <h5 style={{ textTransform: "capitalize" }}>
                          {el.edutype},&nbsp;{el.Stream}
                        </h5>
                      )}

                      <h6>{el.collagename}</h6>
                      <h6>
                        {el.startYear}-{el.endYear}
                      </h6>
                    </div>
                    <div className={style.ricn}>
                      <HiOutlinePencil
                        onClick={() => findeducation(el.id)}
                        className={style.ri}
                      />
                      <RiDeleteBinLine
                        onClick={() => {
                          deleteGrad(el.id);
                        }}
                        className={style.ri}
                      />
                    </div>
                  </div>
                );
              })}

              <div onClick={() => setGrad(!Grad)} className={style.add}>
                <AiOutlinePlus className={style.addi} />
                <h6>Add education</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
