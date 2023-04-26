import mongoose from "mongoose";

const schema = mongoose.Schema({
    resume: String,
    contact: {
        firstName: String,
        lastName: String,
        email: String,
        location: String,
        phone: String
    },
    education: [{
        school: String,
        degree: String,
        field: String,
        GPA: String,
        start_date: Date
    }],
    links:{
        linkedin: String,
        github: String,
        twitter: String
    },
    experience: [{
        title: String,
        company: String,
        location: String,
        start_date: Date,
        end_date: Date,
        description: String
    }],
    applications: [{
        jobId: String,
        why: String
    }],
    skills: [String],
    hired: Boolean,
    hiredJob: String,
    userId: String,
    resumeString: String
}, {collection: "applicants"});

export default schema;