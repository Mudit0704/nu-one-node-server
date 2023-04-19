import companies from './company.js';
import * as companyDao from './company-dao.js';
import * as foodOrderDao from "../food/food-orders-dao.js";

const findCompany = async (req,res) => {
    //TODO : change the user based on the session
    // const company = companies[0];
    // res.json(company);
    const companies = await companyDao.findCompanies();
    const company = companies[0];
    res.json(company);
}

const addCompany = async (req,res) => {
    // companies.push(req.body);
    // res.json(req.body);
    const insertedCompany = await companyDao.createCompany(req.body);
    res.json(insertedCompany);
}

export default app => {
    app.get("/api/companies", findCompany);
    app.post("/api/companies", addCompany);
}