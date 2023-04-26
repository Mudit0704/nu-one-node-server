import indeedJobModel from "./indeedJob-model.js";
import companyModel from "./company-model.js";

export const findAllIndeedJobs = () => indeedJobModel.find();

export const saveIndeedJob = (job) => indeedJobModel.create(job);

export const findIndeedJobsByUserId = userId => indeedJobModel.find({applicants: userId});

export const findJobById = jobId => indeedJobModel.find({"unique_id": jobId});

export const addApplicant = (jobId, userId) => indeedJobModel.updateOne({"unique_id": jobId}, {$push: {applicants: userId}});