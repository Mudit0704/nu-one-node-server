import usersModel from "../users/users-model.js";

export const findAllMarketAdmins = () => usersModel.find({role: "marketAdmin"});

export const deleteMarketAdmin = (adminId) => usersModel.deleteOne({_id: adminId});