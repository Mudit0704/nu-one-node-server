import mongoose from "mongoose";

const schema = mongoose.Schema({
    company_logo_url: String,
    company_name: String,
    date: String,
    job_location: String,
    job_title: String,
    job_url: String,
    position: Number,
    salary: String,
    urgently_hiring: String,
    applicants: [String],
    unique_id: String
}, {collection: "indeedJobs"});


export default schema;