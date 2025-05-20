import { roleModelMap } from "../../constants/roleModelMap.js";
import { Subscribe } from "../../shared/models/SubscribeModel.js";

export const updateUser = async (id, role, updateData) => {
  const Model = roleModelMap[role];
  return await Model.findByIdAndUpdate(id, updateData, { new: true });
};

export const isSubscribeEmailExist = async (email) => {
  return await Subscribe.findOne({ email: email.toLowerCase() });
};

export const addEmailToSubscribe = async (email) => {
  await Subscribe.create({ email: email.toLowerCase() });
};
