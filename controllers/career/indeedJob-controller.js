import * as indeedJobDao from './indeedJob-dao.js';

const getIndeedJobs = async (req,res) => {
    const jobs = await indeedJobDao.findAllIndeedJobs();
    res.json(jobs);
}

const saveIndeedJob = async (req,res) => {
    const job = req.body;
    const jobs = await indeedJobDao.findJobById(job.unique_id);
    if(jobs.length===0){
        console.log("if job not exists",job);
        const addedJob = await indeedJobDao.saveIndeedJob(job);
        res.json(addedJob);
    }
    else{
        console.log("job exists");
        res.json(job);
    }


}

const getIndeedJobsByUserId = async (req,res) => {
    const userId = req.params.userId;
    console.log("userId",userId);
    const jobs = await indeedJobDao.findIndeedJobsByUserId(userId);
    res.json(jobs);
}

const getIndeedJobById = async (req,res) => {
    const jobId = req.params.jobId;
    const job = await indeedJobDao.findJobById(jobId);
    res.json(job);
}

const addApplicant = async (req,res) => {
    const jobId = req.body.jobId;
    const userId = req.body.userId;
    const job = await indeedJobDao.addApplicant(jobId,userId);
    res.json(userId);
}

export default app => {
    app.get('/api/indeedJobs/:jobId',getIndeedJobById);
    app.get('/api/indeedJobs/user/:userId',getIndeedJobsByUserId);
    app.get('/api/indeedJobs',getIndeedJobs);
    app.post('/api/indeedJobs',saveIndeedJob);
    app.put('/api/indeedJobs',addApplicant);
}