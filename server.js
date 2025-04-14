import { createServer } from "http";
import { app } from "./app.js";
const server = createServer(app);
import { logger } from "./utils/logger.js";
const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Uncaught exception handler
process.on("uncaughtException", (err) => {
  logger.error(`UNCAUGHT EXCEPTION: ${err.message}`);
  logger.error(err.stack);
  process.exit(0);
});

// Unhandled rejection handler
process.on("unhandledRejection", (err) => {
  logger.error(`UNHANDLED REJECTION: ${err.message}`);
  logger.error(err.stack);
  server.close(() => {
    process.exit(0);
  });
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    logger.info("Process terminated");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode at port ${PORT}`);
});
