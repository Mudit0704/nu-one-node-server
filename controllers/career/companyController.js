import companies from './company.js';
import * as companyDao from './company-dao.js';
import * as foodOrderDao from "../food/food-orders-dao.js";
import {findCompanyById} from "./company-dao.js";
import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/careerImages")
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});

const upload = multer({storage: storage});

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


    const data = fs.readFileSync("./public/careerImages/" + req.file.originalname);
    const contentType = "image/png";

    const newCompany = {
        name: req.body.name,
        description: req.body.description,
        companyLogo: {
            data: data,
            contentType: contentType
        },
        userId: req.body.userId,
        companyDescription: req.body.companyDescription,
        companyHiring: req.body.companyHiring,
        contactN0: req.body.contactN0,
        recruiter: JSON.parse(req.body.recruiter),
        jobs: req.body.jobs
    };

    // console.log(JSON.parse(req.body.recruiter));
    //
    // // companies.push(req.body);
    // // res.json(req.body);
    const insertedCompany = await companyDao.createCompany(newCompany);
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
    await companyDao.deleteJob(jobId,companyId);
    res.json(jobId);
}

export default app => {
    app.get("/api/companies/:companyId", findCompany);
    app.get("/api/companies/user/:userId", findCompanyByUserId);
    app.put("/api/companies/job/add", addJob);
    app.put("/api/companies/job/delete",deleteJob);
    app.post("/api/companies", upload.single('companyLogo') , addCompany);
}