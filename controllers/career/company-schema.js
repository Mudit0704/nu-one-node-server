import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: String,
    description: String,
    companyHiring: String,
    contactN0: String,
    companyLogo: {
        data: Buffer,
        contentType: String
    },
    recruiter: {
        recruiterName: String,
        recruiterEmail: String,
        role: String,
        password: String
    },
    jobs: [String],
    userId: String
}, {collection: "companies"});

export default schema;