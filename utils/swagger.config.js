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
    },
    apis: ["./app.js", "./features/**/*.js"],
  };
  