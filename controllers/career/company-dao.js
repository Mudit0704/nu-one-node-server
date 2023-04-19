import companyModel from "./company-model.js";

export const findCompanies = () => companyModel.find();

export const findCompanyById = (companyId) => companyModel.findOne({_id:companyId});

export const createCompany = (company) => companyModel.create(company);

