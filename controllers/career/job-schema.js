import mongoose from "mongoose";

const schema = mongoose.Schema({
    title: String,
    company: String,
    experience: String,
    employeeType: String,
    Salary: String,
    location: String,
    description: String,
    company_icon: String,
    skills: [String],
    posting_date: Date,
    number_of_applicants: Number,
    applicants: [String],
    hiredApplicant: String
}, {collection: "jobs"});

export default schema;