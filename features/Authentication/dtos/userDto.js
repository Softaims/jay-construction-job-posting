

export const userDto = (user) => {
  const base = {
    id: user._id,
    email: user.email,
    role: user.role,
    verifyEmail:user.verifyEmail
  };

  if (user.role === "main_contractor") {
    return {
      ...base,
      company_name: user.company_name,
      company_number: user.company_number,
    };
  }

  if (user.role === "subcontractor") {
    return {
      ...base,
      company_name: user.company_name,
      company_number: user.company_number,
      services_offered: user.services_offered,
    };
  }

  if (user.role === "job_seeker") {
    return {
      ...base,
      full_name: user.full_name,
      trade: user.trade,
      travel_radius_km: user.travel_radius_km,
      profile_picture: user.profile_picture,
      id_document: user.id_document,
    };
  }

  return base;
};
