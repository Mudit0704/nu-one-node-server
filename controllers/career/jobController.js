import jobs from "./job.js";
import * as jobDao from "./job-dao.js";

const findAllJobs = async (req,res) => {
    const jobs = await jobDao.findAllJobs();
    res.json(jobs);
}

const findJob = async (req,res) => {
    const jobId = req.params.jobId;
    const job = await jobDao.findJob(jobId);
    res.json(job);
}

const addApplicant = async (req,res) => {
    const jobId = req.params.jobId;
    const userId = req.body.userId;
    await jobDao.addApplicant(jobId,userId);
    // const job = jobs.find(job => job._id === jobId);
    // job.applicants.push(req.body.userId);
    // job.number_of_applicants = job.number_of_applicants + 1;
    // console.log(job);
    res.json({jobId: jobId,userId: req.body.userId});
}

const addJob = async (req,res) => {
    const job = req.body;
    const addedJob = await jobDao.addJob(job);
    // jobs.push(req.body);
    res.json(addedJob);
}

const editJob = async (req,res) => {
    const jobId = req.params.jobId;
    // const job = jobs.find(job => job._id === jobId);
    // job.title=req.body.title;
    // job.company=req.body.company;
    // job.location=req.body.location;
    // job.experience=req.body.experience;
    // job.description=req.body.description;
    // job.employeeType=req.body.employeeType;
    // job.skills=req.body.skills;
    // job.Salary=req.body.Salary;
    // job.company_icon=req.body.company_icon
    // job.posting_date=req.body.posting_date;
    // job.number_of_applicants=req.body.number_of_applicants;
    // job.applicants=req.body.applicants;
    await jobDao.editJob(jobId,req.body);
    res.json(req.body);
}

const deleteJob = async (req,res) => {
    const jobId = req.params.jobId;
    // const job = jobs.find(job => job._id === jobId);
    // jobs.splice(jobs.indexOf(job),1);
    await jobDao.deleteJob(jobId);
    res.json(jobId);
}

const hiredApplicant = async (req,res) => {
    const jobId= req.params.jobId;
    const userId = req.body.userId;
    await jobDao.hiredApplicant(jobId,userId);
    // const job = jobs.find(job => job._id === jobId);
    // job["hiredApplicant"] = req.body.userId;
    res.json({jobId: jobId,userId: req.body.userId});
}

export default app =>{
    app.get("/api/jobs", findAllJobs);
    app.get("/api/jobs/:jobId", findJob);
    app.post("/api/jobs", addJob);
    app.put("/api/jobs/:jobId", editJob);
    app.delete("/api/jobs/:jobId", deleteJob);
    app.put("/api/jobs/:jobId/addApplicant", addApplicant);
    app.put("/api/jobs/:jobId/hiredApplicant", hiredApplicant);
}