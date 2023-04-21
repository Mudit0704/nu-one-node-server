import userModel from './user-model.js';

export const findUserById = userId => userModel.find({_id: userId});

export const findAllUsers = () => userModel.find();

export const findApplicantByUserId = userId => userModel.find({userId: userId});

export const createApplicant = applicant => userModel.create(applicant);

export const getApplications = userId => userModel.find({_id: userId}, {applications: 1, _id: 0});

export const addApplication = (userId, application) => userModel.updateOne({_id: userId}, {$push: {applications: application}});

export const editProfile = async (userId, key, editObj,school, company) => {
    if (key === 'education') {
        await userModel.updateOne({_id: userId}, {$pull: {education: {school: school}}} );
        return userModel.updateOne({_id: userId},{$push: {education: editObj}});
    } else if (key === 'experience') {
        await userModel.updateOne({_id: userId}, {$pull: {experience: {company: company}}});
        return userModel.updateOne({_id: userId}, {$push: {experience: editObj}});
    } else {
        console.log(key,editObj);
        return userModel.updateOne({_id: userId}, {$set: {[key]: editObj}});
    }
}

export const gotJob = (userId, jobId) => userModel.updateOne({_id: userId}, {$set: {"hired": true, "hiredJob": jobId}});