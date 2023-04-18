import users from "./user.js";

const findUser = (req,res) => {
    //TODO : change the user based on the session
    const user=users[0];
    res.json(user);
}

const findAllUsers = (req,res) => {
    res.json(users);
}

const getApplications = (req,res) => {
    const user = users.find(user => user._id === req.params.userId);
    res.json(user.applications);
}

const addApplication = (req,res) => {
    const user = users.find(user => user._id === req.params.userId);
    user.applications.push({jobId:req.body.jobId,why:req.body.jobSpecific});
    res.json(req.body);
}

const editProfile = (req,res) => {
    const user = users.find(user => user._id === req.params.userId);
    if(req.body.key==='education'){
        user[req.body.key] = user[req.body.key].filter((item) => item.school !== req.body.school);
        user[req.body.key].push(req.body.editObj);
    }
    else if(req.body.key==='experience'){
        user[req.body.key] = user[req.body.key].filter((item) => item.company !== req.body.company);
        user[req.body.key].push(req.body.editObj);
    }
    else{
        user[req.body.key] = req.body.editObj;
    }
    res.json(user);
}

const gotJob = (req,res) => {
    const user = users.find(user => user._id === req.body.userId);
    user["hired"] = true;
    user["hiredJob"] = req.body.jobId;
    res.json(req.body.jobId);
}

export default app => {
    app.get("/api/applicant", findUser);
    app.get("/api/applicant/all",findAllUsers);
    app.get("/api/applicant/:userId/applications", getApplications);
    app.post("/api/applicant/:userId/applications", addApplication);
    app.put("/api/applicant/:userId/edit", editProfile);
    app.put("/api/applicant/hired", gotJob);
}

