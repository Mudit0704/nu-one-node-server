import users from "./user.js";
import * as userDao from "./user-dao.js";

const findUser = async (req,res) => {
    //TODO : change the user based on the session
    // const user=users[0];
    // res.json(user);
    const user = await userDao.findUserById(req.params.userId);
    res.json(user);
}

const findAllUsers = async (req,res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
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
    const user = await userDao.editProfile(req.params.userId,req.body.key,req.body.editObj,req.body.school,req.body.company);
    res.json(req.body.editObj);
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
    app.put("/api/applicant/hired", gotJob);
    app.get("/api/applicant/:userId", findUser);
    app.get("/api/applicant/:userId/applications", getApplications);
    app.post("/api/applicant/:userId/applications", addApplication);
    app.put("/api/applicant/:userId/edit", editProfile);
}

