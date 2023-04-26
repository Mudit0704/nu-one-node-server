import users from "./user.js";
import * as userDao from "./user-dao.js";
import * as authDao from "../users/users-dao.js";
import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/careerImages")
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});

const upload = multer({storage: storage});

const findApplicant = async (req,res) => {
    //TODO : change the user based on the session
    // const user=users[0];
    // res.json(user);
    const user = await userDao.findUserById(req.params.userId);


    res.json(user);
}

const findApplicantByUserId = async (req,res) => {
    // console.log("findApplicantByUserId",req.params.userId)
    if(req.params.userId==="undefined" || req.params.userId==="null" || req.params.userId===""){
        res.json(null);
        return;
    }
    const applicant = await userDao.findApplicantByUserId(req.params.userId);
    res.json(applicant);

}

const findAllUsers = async (req,res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
}

const createApplicant = async (req,res) => {
    if(req.body.hasOwnProperty("userId")){
        const user = await authDao.findUserById(req.body.userId);
        let obj = {
            "contact":{
                "firstName":user.name.split(" ")[0],
                "lastName":user.name.split(" ")[1],
                "email":user.email,
                "phone":user.phone,
                "location":user.address
            },
            "userId":req.body.userId
        }
        await userDao.createApplicant(obj);
        res.json(obj);
    }
    else{
        await userDao.createApplicant(req.body);
        res.json(req.body);
    }

}

const getApplications = async (req,res) => {
    // const user = users.find(user => user._id === req.params.userId);
    const applications = await userDao.getApplications(req.params.userId);
    res.json(applications[0].applications);
}

const addApplication = async (req,res) => {
    // const user = users.find(user => user._id === req.params.userId);
    // user.applications.push({jobId:req.body.jobId,why:req.body.jobSpecific});
    // res.json(req.body);
    await userDao.addApplication(req.params.userId,{jobId:req.body.jobId,why:req.body.jobSpecific});
    res.json({jobId:req.body.jobId,why:req.body.jobSpecific});
}

const editProfile = async (req,res) => {
    // const user = users.find(user => user._id === req.params.userId);
    // if(req.body.key==='education'){
    //     user[req.body.key] = user[req.body.key].filter((item) => item.school !== req.body.school);
    //     user[req.body.key].push(req.body.editObj);
    // }
    // else if(req.body.key==='experience'){
    //     user[req.body.key] = user[req.body.key].filter((item) => item.company !== req.body.company);
    //     user[req.body.key].push(req.body.editObj);
    // }
    // else{
    //     user[req.body.key] = req.body.editObj;
    // }
    // res.json(user);
    // console.log(req.params.userId,req.body.userId,req.body.key,req.body.editObj,req.body.school,req.body.company);

    let editObj = JSON.parse(req.body.editObj);
    console.log(editObj)
    if(req.body.key==='resume'){
        await upload.single('resume');
        const data = fs.readFileSync("./public/careerImages/" + req.file.originalname);
        const contentType = 'application/pdf';
        // editObj = {
        //     data: data,
        //     contentType: contentType
        // }
        editObj = Buffer.from(data).toString('base64');
    }

    await userDao.editProfile(req.params.userId,req.body.key,editObj,req.body.school,req.body.company);
    const user = await userDao.findApplicantByUserId(req.body.userId);
    res.json(user);
}

const gotJob = async (req,res) => {
    // const user = users.find(user => user._id === req.body.userId);
    // user["hired"] = true;
    // user["hiredJob"] = req.body.jobId;
    // res.json(req.body.jobId);
    await userDao.gotJob(req.body.userId,req.body.jobId);
    res.json(req.body);

}

export default app => {
    app.get("/api/applicant/all" , findAllUsers);
    app.get("/api/applicant/userId/:userId", findApplicantByUserId);
    app.put("/api/applicant/hired", gotJob);
    app.get("/api/applicant/:userId", findApplicant);
    app.post("/api/applicant", upload.single('resume'), createApplicant);
    app.get("/api/applicant/:userId/applications", getApplications);
    app.post("/api/applicant/:userId/applications", addApplication);
    app.post("/api/applicant/:userId/edit", upload.single('editObj'), editProfile);

}

