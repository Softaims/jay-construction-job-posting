export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description: "Simple Express API documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:" + (process.env.PORT || 9000),
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        MainContractorSignup: {
          type: "object",
          required: ["email", "password", "role", "company_name", "company_number"],
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["main_contractor", "subcontractor", "job_seeker"],
            },
            company_name: {
              type: "string",
            },
            company_number: {
              type: "string",
            },
          },
        },
        SubcontractorSignup: {
          type: "object",
          required: ["email", "password", "role", "company_name", "company_number", "services_offered"],
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["main_contractor", "subcontractor", "job_seeker"],
            },
            company_name: {
              type: "string",
            },
            company_number: {
              type: "string",
            },
            services_offered: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        JobSeekerSignup: {
          type: "object",
          required: ["email", "password", "role", "full_name", "phone_number", "trade", "travel_radius_km"],
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
            role: {
              type: "string",
              enum: ["main_contractor", "subcontractor", "job_seeker"],
            },
            full_name: {
              type: "string",
            },
            phone_number: {
              type: "string",
            },
            trade: {
              type: "string",
            },
            travel_radius_km: {
              type: "number",
            },
            profile_picture: {
              type: "string",
              format: "uri",
            },
            id_document: {
              type: "string",
              format: "uri",
            },
          },
        },
      },
    },
  },
  apis: ["./app.js", "./features/**/*.js"],
};
