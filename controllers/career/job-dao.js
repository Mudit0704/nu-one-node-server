import jobModel from "./job-model.js";

export const findAllJobs = () => jobModel.find();

export const findJob = jobId => jobModel.findById(jobId);

export const addJob = (job) => jobModel.create(job);

export const editJob = (jobId, job) => jobModel.updateOne({_id: jobId}, {$set: job});

export const deleteJob = jobId => jobModel.deleteOne({_id: jobId});

export const addApplicant = async (jobId, userId) =>{
    await jobModel.updateOne({_id: jobId}, {$push: {applicants: userId}});
    return jobModel.updateOne({_id: jobId}, {$inc: {number_of_applicants: 1}});
}

export const hiredApplicant = (jobId, userId) => jobModel.updateOne({_id: jobId}, {$set: {hiredApplicant: userId}});

