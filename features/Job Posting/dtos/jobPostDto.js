export const jobPostDto = (job) => {
  return {
    newJob: {
      _id: job._id,
      project_image: job.project_image ?? null,
      job_title: job.job_title,
      job_location: {
        coordinates: job.job_location.coordinates,
      },
      job_type: job.job_type,
      target_user: job.target_user,
      services: job.services.map((service) => ({
        _id: service._id,
        service_name: service.service_name,
        resource_count: service.resource_count ?? 0,
        number_of_days: service.number_of_days ?? 0,
      })),
      job_priority: job.job_priority ?? false,
      budget: job.budget ?? null,
      created_by: job.created_by,
      createdAt: job.createdAt,
      updatedAt: job.updatedAt,
      __v: job.__v,
    },
  };
};
