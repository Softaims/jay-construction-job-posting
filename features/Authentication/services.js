export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
  };