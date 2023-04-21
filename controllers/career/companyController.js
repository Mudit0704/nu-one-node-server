import companies from './company.js';
import * as companyDao from './company-dao.js';
import * as foodOrderDao from "../food/food-orders-dao.js";
import {findCompanyById} from "./company-dao.js";

const findCompany = async (req,res) => {
    const companyId = req.params.companyId;
    const company = await companyDao.findCompanyById(companyId);
    res.json(company);
}

const findCompanyByUserId = async (req,res) => {
    const companies = await companyDao.findCompanyByUserId(req.params.userId);
    res.json(companies);
}

const addCompany = async (req,res) => {
    // companies.push(req.body);
    // res.json(req.body);
    const insertedCompany = await companyDao.createCompany(req.body);
    res.json(insertedCompany);
}

const addJob = async (req,res) => {
    const jobId = req.body.jobId;
    const companyId = req.body.companyId;
    await companyDao.addJob(jobId,companyId);
    res.json(jobId);
}

const deleteJob = async (req,res) => {
    const jobId = req.body.jobId;
    const companyId = req.body.companyId;
    console.log(jobId,companyId);
    await companyDao.deleteJob(jobId,companyId);
    res.json(jobId);
}

export default app => {
    app.get("/api/companies/:companyId", findCompany);
    app.get("/api/companies/user/:userId", findCompanyByUserId);
    app.put("/api/companies/job/add", addJob);
    app.put("/api/companies/job/delete",deleteJob);
    app.post("/api/companies", addCompany);
}