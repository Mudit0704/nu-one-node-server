import jobs from "./job.js";

const findAllJobs = (req,res) => {
    res.json(jobs);
}

const addApplicant = (req,res) => {
    const jobId = req.params.jobId;
    const job = jobs.find(job => job._id === jobId);
    job.applicants.push(req.body.userId);
    job.number_of_applicants = job.number_of_applicants + 1;
    console.log(job);
    res.json({jobId: jobId,userId: req.body.userId});
}

const addJob = (req,res) => {
    jobs.push(req.body);
    res.json(req.body);
}

const editJob = (req,res) => {
    const jobId = req.params.jobId;
    const job = jobs.find(job => job._id === jobId);
    job.title=req.body.title;
    job.company=req.body.company;
    job.location=req.body.location;
    job.experience=req.body.experience;
    job.description=req.body.description;
    job.employeeType=req.body.employeeType;
    job.skills=req.body.skills;
    job.Salary=req.body.Salary;
    job.company_icon=req.body.company_icon
    job.posting_date=req.body.posting_date;
    job.number_of_applicants=req.body.number_of_applicants;
    job.applicants=req.body.applicants;
    res.json(job)
}

const deleteJob = (req,res) => {
    const jobId = req.params.jobId;
    const job = jobs.find(job => job._id === jobId);
    jobs.splice(jobs.indexOf(job),1);
    res.json(jobId);
}

const hiredApplicant = (req,res) => {
    const jobId= req.params.jobId;
    const job = jobs.find(job => job._id === jobId);
    job["hiredApplicant"] = req.body.userId;
    res.json({jobId: jobId,userId: req.body.userId});
}

export default app =>{
    app.get("/api/jobs", findAllJobs);
    app.post("/api/jobs", addJob);
    app.put("/api/jobs/:jobId", editJob);
    app.delete("/api/jobs/:jobId", deleteJob);
    app.put("/api/jobs/:jobId/addApplicant", addApplicant);
    app.put("/api/jobs/:jobId/hiredApplicant", hiredApplicant);
}