import companyModel from "./company-model.js";


export const findCompanyById = (companyId) => companyModel.findById(companyId);

export const findCompanyByUserId = userId => companyModel.find({userId: userId});

export const addJob = (jobId,companyId) => companyModel.updateOne({_id: companyId}, {$push: {jobs: jobId}});

export const deleteJob = (jobId,companyId) => companyModel.updateOne({_id: companyId}, {$pull: {jobs: jobId}});

export const createCompany = (company) => companyModel.create(company);

