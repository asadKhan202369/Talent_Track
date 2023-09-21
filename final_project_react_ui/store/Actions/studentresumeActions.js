import axios from "@/utils/axios";
import { toast } from 'react-toastify';
import {
    addstudent,
    removeerror,
    removestudent,
    iserror,
    gethome,
    foundjob,
    foundintern,
    foundtraining,
    foundResponsibility,
    foundlinks,
    foundachive,
    foundskill,
    foundproject,
    addmessage,
    foundedu

} from "../Reducers/studentReducers"



// add education on resume of student

export const asyncaddedu = (edu) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/education",edu);
        dispatch(addstudent(data.student));
        toast.success('Education Succesfully Added!', { position: 'top-right' });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
        toast.warning('Job Already Added!', { position: 'top-right' });
    }
}

// add education on resume of student

// find education on resume of student

export const asyncfindeducation = (id) => async(dispatch,getState) =>{
    try{
      console.log(id,"its id of job");
       console.log("resume/findj/"+id,"its route");
        const {data} = await axios.get("/resume/finde/" + id);
        dispatch(foundedu(data.education));
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}


// find education on resume of student


// update education on resume of student

export const asyncupdateedu = (id , editdata) => async(dispatch,getState) =>{
    try{
      console.log(id,"its id of job");
       console.log("resume/findj/"+id,"its route");
        const {data} = await axios.post("/resume/edit-edu/" + id , editdata);
        console.log(data,"its sdaat");
        toast.success('Job Succesfully Updated!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// update education on resume of student

// delete education on resume of student

export const asyncdeleteedu = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/delete-edu/" + id);
        toast.success('Job Succesfully Deleted!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// delete education on resume of student


// add jobs on resume of student

export const asyncaddjob = (job) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/job",job);
        dispatch(addstudent(data.student));
        toast.success('Job Succesfully Added!', { position: 'top-right' });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
        toast.warning('Job Already Added!', { position: 'top-right' });
    }
}

// add jobs on resume of student


// find jobs on resume of student

export const asyncfindjob = (id) => async(dispatch,getState) =>{
    try{
      console.log(id,"its id of job");
       console.log("resume/findj/"+id,"its route");
        const {data} = await axios.get("/resume/findj/" + id);
        dispatch(foundjob(data.job));
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// find jobs on resume of student

// update jobs on resume of student

export const asyncupdatejob = (id , editdata) => async(dispatch,getState) =>{
    try{
      console.log(id,"its id of job");
       console.log("resume/findj/"+id,"its route");
        const {data} = await axios.post("/resume/edit-job/" + id , editdata);
        console.log(data,"its sdaat");
        toast.success('Job Succesfully Updated!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// update jobs on resume of student



// delete jobs on resume of student

export const asyncdeletejob = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/delete-job/" + id);
        toast.success('Job Succesfully Deleted!', { position: 'top-right' });
    }catch(error){
        asyncupdatejob
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// delete jobs on resume of student


// add Internships on resume of student

export const asyncaddintern = (internship) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/intern",internship);
        dispatch(addstudent(data.student));
        toast.success('Internship Succesfully Added!', { position: 'top-right' });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
        toast.warning('Internship Already Added!', { position: 'top-right' });
    }
}

// find Internships on resume of student

// find intern on resume of student

export const asyncfindintern = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume/findi/" + id);
        dispatch(foundintern(data.job));
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// find intern on resume of student

// update intern on resume of student

export const asyncupdateintern = (id , editdata) => async(dispatch,getState) =>{
    
    try{
       console.log("/resume/edit-intern/"+id,"its route");
        const {data} = await axios.post("/resume/edit-intern/" + id , editdata);
        dispatch(addstudent(data.internship));
        toast.success('Internship Succesfully Updated!', { position: 'top-right' });

    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}


// update intern on resume of student

// delete Internships on resume of student

export const asyncdeleteintern = (id) => async(dispatch,getState) =>{
    try{
      console.log(id,"its id of job");
       console.log("resume/findj/"+id,"its route");
        const {data} = await axios.post("/resume/delete-intern/" + id);
        // dispatch(addstudent());
        toast.success('Internship Succesfully Deleted!', { position: 'top-right' });
    }catch(error){
        asyncupdatejob
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// delete Internships on resume of student


// add Responsibility on resume of student

export const asyncaddResponsibility = (Responsibility) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/responsibility",Responsibility);
        dispatch(foundintern(data.responsibilities));
        toast.success('Succesfully Added!', { position: 'top-right' });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

// add Responsibilityships on resume of student

// find Responsibility on resume of student

export const asyncfindResponsibility = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume/findr/" + id);
        console.log(data,"its daat");
        dispatch(foundResponsibility(data.resp));
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// find Responsibility on resume of student

// update Responsibility on resume of student

export const asyncupdateresp = (id , editdata) => async(dispatch,getState) =>{
    
    try{
       console.log("/resume/edit-responsibility/"+id,"its route");
        const {data} = await axios.post("/resume/edit-res/" + id , editdata);
        console.log(data,"its datata");
        toast.success('Succesfully Updated!', { position: 'top-right' });
        // dispatch(addstudent(data.Responsibilityship));

    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}


// update Responsibility on resume of student

// delete Responsibilityships on resume of student

export const asyncdeleteresp = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/delete-resp/" + id);
        toast.success('Succesfully Deleted!', { position: 'top-right' });
    }catch(error){
        asyncupdatejob
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// delete Responsibilityships on resume of student


// add training on resume of student

export const asyncaddtraining = (training) => async(dispatch,getState) =>{
    try{
        console.log("hitted");
        const {data} = await axios.post("/resume/train",training);
        dispatch(foundtraining(data.train));
        toast.success('Training Succesfully Added!', { position: 'top-right' });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
        toast.warning('Training is Already Added!', { position: 'top-right' });
    }
}

// add training on resume of student



// find training on resume of student

export const asyncfindtrain = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume/findt/" + id);
        console.log(data,"its daat");
        dispatch(foundtraining(data.trainp));
        
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// find training on resume of student


// update Training on resume of student

export const asyncupdatetrain = (id , editdata) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/edit-train/" + id , editdata);
        console.log(data,"its datata");
        dispatch(addstudent(data.train));
        toast.success('Training Succesfully Updated!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}


// update Training on resume of student


// delete Training on resume of student

export const asyncdeletetrain = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/delete-train/" + id);
        toast.success('Training Succesfully Deleted!', { position: 'top-right' });
    }catch(error){
        asyncupdatejob
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// delete Training on resume of student


// add Portfolio on resume of student

export const asyncaddportfolio = (links) => async(dispatch,getState) =>{
    try{
        console.log("hitted");
        const {data} = await axios.post("/resume/links",links);
        dispatch(foundlinks(data.portfolio));
        toast.success('Succesfully Added!', { position: 'top-right' });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
        toast.warning('Project is Already  Added!',{ position: 'top-right' });}
}

// add training on resume of student


// find training on resume of student

export const asyncfindlink = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume/findl/" + id);
        console.log(data,"its daat");
        dispatch(foundlinks(data.link));
    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// find training on resume of student

// update Link on resume of student

export const asyncupdatelink = (id , editdata) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/edit-link/" + id , editdata);
        console.log(data,"its datata");
        dispatch(addstudent(data.portfolio));
        toast.success('Portfolio Succesfully Updated!', { position: 'top-right' });

    }catch(error){
        console.log(error);
        console.log("bsdk kya error dera he mc");
        dispatch(iserror(error.response.data.status_message));
    }
}

// update Link on resume of student

// delete Link on resume of student

export const asyncdeletelink = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/delete-link/" + id);
        // dispatch(addstudent());
        toast.success('Portfolio Link Succesfully Deleted!', { position: 'top-right' });
    }catch(error){
        // asyncupdatejob/
        console.log(error);
        console.log("bsdk kya error dera he mc");
        // dispatch(iserror(error.response.data.status_message));
    }
}

// delete Link on resume of student


// add Portfolio on resume of student

export const asyncaddachive = (achive) => async(dispatch,getState) =>{
    try{

        const {data} = await axios.post("/resume/achive",achive);
        dispatch(foundachive(data.accomplishments));
        toast.success('Achivement Succesfully Added!', { position: 'top-right' });

    }catch(error){
        dispatch(iserror(error.response.data.status_message));
    }
}

// add training on resume of student


// find Achive on resume of student

export const asyncfindAchive = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume/finda/" + id);
        console.log(data,"its daat");
        dispatch(foundachive(data.achive));
    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// find Achive on resume of student

// update achive on resume of student

export const asyncupdateachive = (id , editdata) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/edit-achive/" + id , editdata);
        console.log(data,"its datata");
        dispatch(addstudent(data.accomplishments));
        toast.success('Achivement Succesfully Updated!', { position: 'top-right' });

    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// update Link on resume of student

// delete Link on resume of student

export const asyncdeleteachive = (id) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/delete-achive/" + id);
        // dispatch(addstudent(data.accomplishments));
        toast.success('Achivement Succesfully Deleted!', { position: 'top-right' });

    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// delete Link on resume of student


// add skill on resume of student

export const asyncaddskill = (skill) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/skill",skill);
        dispatch(foundskill(data.skills));
        dispatch(addmessage(data.message)); 
        toast.success('Skill added successfully.', { position: 'top-right' });
    }catch(error){
        console.log(error,"its an errororororo");
        dispatch(iserror(error.response.data.status_message));
        toast.warning('Project is Already  Added!',{ position: 'top-right' });}
}

// add skill on resume of student



// find skill on resume of student

export const asyncfindskill = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume/finds/" + id);
        console.log(data,"its daat");
        dispatch(foundskill(data.skill));
    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// find skill on resume of student

// delete skill on resume of student

export const asyncskilldlete = (id) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/delete-skill/" + id );
        // dispatch(addstudent(data.accomplishments));
        toast.success('Skill Deleted Succesfully!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// delete skill on resume of student


// update skill on resume of student

export const asyncupdateskill = (id , editdata) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/edit-skill/" + id , editdata);
        console.log(data,"its datata");
        dispatch(addstudent(data.skil_l));
        toast.success('Skill Updated Succesfully!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// update skill on resume of student




// add Projects on resume of student

export const asyncaddProject = (project) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.post("/resume/project",project);
        dispatch(foundproject(data.projects));
        toast.success('Project Added succesfully!', { position: 'top-right' });
    }catch(error){
        dispatch(iserror(error.response.data.status_message));
        toast.warning('Project is Already  Added!',{ position: 'top-right' });
        toast.warning('Project is Already  Added!',{ position: 'top-right' });

    }
}

// add Projects on resume of student


// find skill on resume of student

export const asyncfindProject = (id) => async(dispatch,getState) =>{
    try{
        const {data} = await axios.get("/resume/findp/" + id);
        console.log(data,"its daat");
        dispatch(foundproject(data.project));
    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// find skill on resume of student

// update project on resume of student

export const asyncupdateproject = (id , editdata) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/edit-project/" + id , editdata);
        console.log(data,"its datata");
        dispatch(addstudent(data.project));
        toast.success('Project Updated succesfully!', { position: 'top-right' });
    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }

}


// update project on resume of student


// delete project on resume of student

export const asyncdeleteproject = (id) => async(dispatch,getState) =>{
    
    try{
        const {data} = await axios.post("/resume/delete-project/" + id );
        toast.success('Project Deleted succesfully!', { position: 'top-right' });

    }catch(error){
        console.log(error);
        dispatch(iserror(error.response.data.status_message));
    }
}

// delete project on resume of student






