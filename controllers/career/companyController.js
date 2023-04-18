import companies from './company.js';

const findCompany = (req,res) => {
    //TODO : change the user based on the session
    const company = companies[0];
    res.json(company);
}

const addCompany = (req,res) => {
    companies.push(req.body);
    res.json(req.body);
}

export default app => {
    app.get("/api/companies", findCompany);
    app.post("/api/companies", addCompany);
}