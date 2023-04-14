import adminsModel from "./admins-model.js";

export const findAllMarketAdmins = () => adminsModel.find({sub_type: "MARKET_ADMIN", type: "Admin"});

export const deleteMarketAdmin = (adminId) => adminsModel.deleteOne({_id: adminId});