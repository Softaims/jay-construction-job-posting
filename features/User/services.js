import { roleModelMap } from "../../constants/roleModelMap.js";
export const updateUser = async (id, role, updateData) => {
  const Model = roleModelMap[role];
  return await Model.findByIdAndUpdate(id, updateData, { new: true });
};
