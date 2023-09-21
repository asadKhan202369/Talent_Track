"use client";
import React from "react";
import style from "./style.module.css";
import Nav from "@/app/employee/components/Nav/page";
import { useEffect } from "react";
import { asynccurrentemployee } from "@/store/Actions/employeeAction";
import { BiSolidPencil } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { asyncupdatedetails,asyncupdatephotu } from "@/store/Actions/employeeAction";
import Loader from "@/components/loader/loader";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const profile = () => {
  const router = useRouter();
  const { employee, isAuthenticated } = useSelector(
    (state) => state.employeeReducer
  );

  const inpt = useRef(null);
  const abtn = useRef(null);
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/employee/profile");
    } else {
      router.push("/employee/login");
    }
  }, [isAuthenticated]);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);

    setTimeout(() => {
      abtn.current.click();
    }, 0);
  };

  const inputHandler = () => {
    inpt.current.click();
  };

  const uploadphoto = async (event) => {
    event.preventDefault();
    if (file) {
      dispatch(asyncupdatephotu(file));
      dispatch(asynccurrentemployee());
    } else {
      console.error("No file selected for upload.");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/employee/profile/");
    } else {
      router.push("/employee/login");
    }
  }, [isAuthenticated]);

  const initialformData = {
    name: "",
    lastname: "",
    email: "",
    organisationname: "",
    organisationlocation: "",
    contact: "",
  };

  const [formData, setformData] = useState(initialformData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asynccurrentemployee());
  }, []);

  useEffect(() => {
    if (employee) {
      setformData(employee);
    }
  }, [employee]);

  const updateEvent = (event) => {
    const { name, value } = event.target;

    setformData((preData) => {
      return {
        ...preData,
        [name]: value,
      };
    });
  };

  const updateDetails = async (e) => {
    event.preventDefault();
    await dispatch(asyncupdatedetails(formData));
    dispatch(asynccurrentemployee());
  };

  return (
    <>
      <form
        className="hidden"
        onSubmit={uploadphoto}
        style={{ marginTop: "10vh" }}
        method="post"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            onChange={handleFileInputChange}
            name="file"
            className="form-control"
            type="file"
            ref={inpt}
            id="formFile"
          />
          <button ref={abtn} onClick={uploadphoto} type="submit">
            Avatar dalo
          </button>
        </div>
      </form>

      {employee ? (
        <div className={style.main}>
          <Nav employee={employee} isAuthenticated={isAuthenticated} />
          <div className={style.center}>
            <div className={style.left_panel}>
              <div className={style.user}>
                <div className={style.user_img}>
                  <img
                    src={employee.organisationlogo.url}
                    alt=""
                  />
                  <div className={style.user_edit_btn}>
                    <button onClick={inputHandler}>
                      <BiSolidPencil />
                    </button>
                  </div>
                </div>
                <h6>
                  {employee.name}
                  {employee.lastname}
                </h6>
              </div>
              <div className={style.user_options}>
                <h3>
                  <div className={`${style.leftline} ${style.leftline1}`}></div>
                  My Profile
                </h3>
                <Link
                  style={{ textDecoration: "none", width: "100%" }}
                  href="/employee/profile/myjobs"
                >
                  <h3>
                    <div className={style.leftline}></div>
                    My Jobs
                  </h3>
                </Link>

                <h3>
                  <div className={style.leftline}></div>
                  My Internships
                </h3>
                <Link
                  style={{ textDecoration: "none", width: "100%" }}
                  href="/employee/profile/applicant"
                >
                  <h3>
                    <div className={style.leftline}></div>
                    Applicants
                  </h3>
                </Link>
                <h3>
                  <div className={style.leftline}></div>
                  Log out
                </h3>
              </div>
            </div>
            <div className={style.right_panel}>
              <div className={style.faram1}>
                <h1>
                  Welcome, <span>{employee.name}</span>.
                </h1>
                <h3>Account Details</h3>
                <form className={style.form} onSubmit={updateDetails}>
                  <div className={style.firstName}>
                    {employee && (
                      <input
                        name="name"
                        id="firstNameInput"
                        type="text"
                        placeholder="first Name"
                        onChange={updateEvent}
                        value={formData.name || ""}
                      />
                    )}
                    {employee && (
                      <input
                        name="lastname"
                        id="firstNameInput5"
                        type="text"
                        placeholder="last Name"
                        onChange={updateEvent}
                        value={formData.lastname || ""}
                      />
                    )}
                  </div>
                  <div className={style.firstEmail}>
                    {employee && (
                      <input
                        name="organisationname"
                        id="firstNameInput1"
                        type="text"
                        placeholder="Organization name"
                        onChange={updateEvent}
                        value={formData.organisationname || ""}
                      />
                    )}
                  </div>
                  <div className={style.firstEmail}>
                    {employee && (
                      <input
                        name="organisationlocation"
                        id="firstNameInput2"
                        type="text"
                        placeholder="Organization location"
                        onChange={updateEvent}
                        value={formData.organisationlocation || ""}
                      />
                    )}
                  </div>
                  <div className={style.firstEmail}>
                    {employee && (
                      <input
                        name="email"
                        id="firstNameInput3"
                        type="email"
                        placeholder="Organization Email"
                        onChange={updateEvent}
                        value={formData.email || ""}
                      />
                    )}
                  </div>
                  <div className={style.firstName}>
                    {employee && (
                      <input
                        name="contact"
                        id="firstNameInput4"
                        type="text"
                        placeholder="Contact No.(Whatsapp)"
                        onChange={updateEvent}
                        value={formData.contact || ""}
                      />
                    )}
                    <div className={style.btns}>
                      <button className={style.save} type="submit">
                        Save
                      </button>
                      <button
                        type="submit"
                        id="cancelbtn"
                        onClick={updateDetails}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default profile;
