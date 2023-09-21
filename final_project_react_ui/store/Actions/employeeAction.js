import axios from "@/utils/axios";
import {
  addemployee,
  removeerror,
  removeemployee,
  iserror,
  gethome,
  foundjob,
  addallreviews
} from "../Reducers/employeeReducer";
import { data } from "autoprefixer";
import { toast } from "react-toastify";
import { addstudent } from "../Reducers/studentReducers";

export const asyncgethome = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/");
    dispatch(gethome(data));
  } catch (error) {
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncaddemployee = (employee) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employee/signup", employee);
    dispatch(addemployee(data));
    toast.success("Check Your Mail!", { position: "top-right" });

  } catch (error) {
    console.log(error);
    toast.warning("Please Enter Vlid Email!", { position: "top-right" });
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncloginemployee = (employee) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employee/signin", employee);
    dispatch(addemployee(data));
    toast.success("Successfully Login!", { position: "top-right" });
  } catch (error) {
    console.log(error);
    dispatch(iserror(error.response.data.status_message));
    toast.error("Wrong Credentials!", { position: "top-right" });
  }
};

export const asynclogoutemployee = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/employee/signout");
    dispatch(removeemployee(data));
  } catch (error) {
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncupdatephotu = (file) => async (dispatch, getState) => {
  try {
      const formData = new FormData();
      formData.append('file', file);
   
      const { data } = await axios.post("/employee/avatar", formData, {
          headers: {
              'Content-Type': 'multipart/form-data', // Important for file uploads
          },
      });
      dispatch(addemployee(data.employee));
      toast.success("Profile Photo Succesfully Updated!", { position: "top-right" });

  } catch (error) {
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asynccurrentemployee = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/employee/detail");
    dispatch(addemployee(data.employee));
    dispatch(addallreviews(data.reviews));
  } catch (error) {
    dispatch(iserror(error.response.data.status_message));
  }
};


export const asyncaddreview = (formdata) => async (dispatch, getState) => {
  try {
    console.log("hited");
    const { data } = await axios.post("/employee/review", formdata);
    console.log(data,"ut t rara");
    dispatch(addemployee(data.review));
    toast.success("review Succesfully Updated!", { position: "top-right" });
  } catch (error) {
    console.log(error);
    console.log("bsdk kya error dera he mc");
    // dispatch(iserror(error.response.data.status_message));
  }
};



export const asyncupdatedetails = (editdata) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employee/update", editdata);
    dispatch(addemployee(data.employee));
  } catch (error) {
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncconfirmotp = (otp) => async (dispatch, getState) => {
  console.log(otp);
  try {
    const { data } = await axios.post("/employee/confirm/employee", otp);
    dispatch(addemployee(data.employee));
  } catch (error) {
    console.log(data, "its data");
    // dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncgetresume = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/resume");
    dispatch(addstudent(data.student));
  } catch (error) {
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncresetpassword =
  (forgotdata) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/forgot/password", forgotdata);
      console.log(data, "its forgot");
      // dispatch(addstudent(data.student));
    } catch (error) {
      // dispatch(iserror(error.response.data.status_message));
    }
  };

export const asyncupdatepassword =
  (id, forgotdata) => async (dispatch, getState) => {
    try {
      console.log("/forgot/reset_link/" + id, "its a reset update link");
      const { data } = await axios.post("/forgot/reset_link/" + id, forgotdata);
      console.log(data, "its forgot");
      dispatch(addstudent(data.student));
    } catch (error) {
      // dispatch(iserror(error.response.data.status_message));
    }
  };

// -------------------------------- jobs ---------------------

export const asyncaddoppo = (jobdata) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employee/create/opp", jobdata);
    dispatch(addemployee(data));
    toast.success("Job Succesfully Added!", { position: "top-right" });
  } catch (error) {
    console.log(error);
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncfindjob = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("employee/find/opp/" + id);
    dispatch(foundjob(data.job));
  } catch (error) {
    console.log(error);
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncupdatejob = (id, editdata) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employee/edit/opp/" + id, editdata);
    dispatch(addemployee(data.job));
    toast.success("Job Succesfully Updated!", { position: "top-right" });
  } catch (error) {
    console.log(error);
    console.log("bsdk kya error dera he mc");
    // dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncdeletejob = (id) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("employee/delete/opp/" + id);
    dispatch(addemployee(data));
    toast.success("Job Succesfully Deleted!", { position: "top-right" });
  } catch (error) {
    console.log(error);
    // dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncapply = (id, applydata) => async (dispatch, getState) => {
  try {
    const { data } = await axios.post("/employee/apply/" + id, applydata);
    dispatch(addemployee(data));
    toast.success("apply Succesfully Added!", { position: "top-right" });
  } catch (error) {
    console.log(error);
    dispatch(iserror(error.response.data.status_message));
  }
};

export const asyncscheduleint = (sid,jobid, jobData) => async (dispatch, getState) => {
    try {
       
      const { data } = await axios.post("/employee/schedule/"+ sid + "/" +jobid , jobData);
      dispatch(addemployee(data));
      dispatch(addstudent(data));
      toast.success("interview Scheduled Successfuly!", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
      dispatch(iserror(error.response.data.status_message));
    }
  };
