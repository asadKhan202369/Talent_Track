import axios from "@/utils/axios";
// import axios from "axios";
import {
    addstudent,
    removeerror,
    removestudent,
    iserror,
    gethome,
    foundjob,
    addmessage,
    addalljobs,
    foundcourse,
    addallcourses,
    addallreviews
} from "../Reducers/studentReducers"
import { toast } from "react-toastify";


export const asyncgethome = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/");
        dispatch(gethome(data));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncaddstudent = (student) => async(dispatch,getState) =>{
    try{
        console.log(student,"ots comming datta");
        const {data} = await axios.post("/student/signup",student);
        console.log(data ,"irs sfsfssf");
        dispatch(addstudent(data));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncloginstudent = (student) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/student/signin",student);
        console.log(data,"its student data");
        dispatch(addstudent(data));
    }catch(error){
        dispatch(iserror(error.response.data.status_message)); 
    }
}

export const asynclogoutstudent = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/student/signout");
        console.log(data,"uts logoutdata");
        dispatch(removestudent(data));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncupdatedetails = (editdata) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/student/update", editdata);
      dispatch(addstudent(data.student));
    toast.success("Student Details Succesfully Updated!", { position: "top-right" });

    } catch (error) {
      dispatch(iserror(error.response.data.status_message));
    }
};

export const asyncupdatephotu = (file) => async (dispatch, getState) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const { data } = await axios.post("/student/avatar", formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            },
        });
        dispatch(addstudent(data.student));
        toast.success("Profile Photo Succesfully Updated!", { position: "top-right" });

    } catch (error) {
      dispatch(iserror(error.response.data.status_message));
    }
};

export const asyncalljobs = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/alljobs");
        dispatch(addstudent(data.student));
        dispatch(addalljobs(data.jobs));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncallcourses = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/allcourses");
        dispatch(addstudent(data.student));
        console.log(data,"uits datat");
        dispatch(addallcourses(data.courses));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asynccurrentstudent = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/student");
        dispatch(addstudent(data.student));
        dispatch(addalljobs(data.jobs));
        dispatch(addallcourses(data.courses));
        dispatch(addallreviews(data.reviews));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}


export const asyncgetresume = () => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume");
        dispatch(addstudent(data.student));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncresetpassword = (forgotdata) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("employee/forgot/password",forgotdata);
        console.log(data,"its forgot");
        // dispatch(addstudent(data.student));
    }catch(error){
        // dispatch(iserror(error.response.data.status_message));
    }
}


export const asyncupdatepassword = (id,forgotdata) => async(dispatch,getState) =>{
    try{
        console.log("/forgot/reset_link/"+id,"its a reset update link");
        const {data} = await axios.post("employee/forgot/reset_link/"+id,forgotdata);
        console.log(data,"its forgot");
        dispatch(addstudent(data.student));
    }catch(error){
        // dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncfindresume = (sid) => async(dispatch,getState) =>{
    try{
         console.log(sid,"its sid");
        const {data} = await axios.get("/sresume/" + sid);
        console.log(data,"its data link");
        await dispatch(addstudent(data.student));
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}


export const asyncaddcourse = (course) => async(dispatch,getState) =>{
    try{
        console.log(course,"ots comming datta");
        // const {data} = await axios.post("/create/course",course);
        const {data} = await axios.post('/create/course', course, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important for file uploads
            },
          });
        dispatch(addstudent(data));
      toast.success("Course Succesfully Added!", { position: "top-right" });

    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

export const asyncdeletecourse = (id) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/delete/course/" + id);
      dispatch(addstudent(data));
      toast.success("course Succesfully Deleted!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      dispatch(iserror(error.response.data.status_message));
    }
  };

  export const asyncfindcourse = (id) => async (dispatch, getState) => {
    try {
      const { data } = await axios.get("course/find/" + id);
      console.log(data,"its find");
      dispatch(foundcourse(data.course));
    //   toast.success("Course Succ!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      dispatch(iserror(error.response.data.status_message));
    }
  };


  export const asyncupdatecourse = (id, editdata) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/update/course/" + id, editdata);
      dispatch(addstudent(data.job));
      toast.success("course Succesfully Updated!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      console.log("bsdk kya error dera he mc");
      // dispatch(iserror(error.response.data.status_message));
    }
  };

  export const asyncaddreview = (formdata) => async (dispatch, getState) => {
    try {
      const { data } = await axios.post("/review/student", formdata);
      console.log(data,"its review action data");
      dispatch(addstudent(data.review));
      toast.success("review Succesfully Updated!", { position: "top-right" });
    } catch (error) {
      console.log(error);
      console.log("bsdk kya error dera he mc");
      // dispatch(iserror(error.response.data.status_message));
    }
  };

  
  

