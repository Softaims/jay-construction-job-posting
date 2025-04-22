import { createServer } from "http";
import { app } from "./app.js";
import { logger } from "./utils/logger.js";
import { Server } from "socket.io";
import { initiateSocketServer } from "./socket/initiateSocketServer.js";

const PORT = process.env.PORT || 9000;
const NODE_ENV = process.env.NODE_ENV || "development";

const httpServer = createServer(app);
initiateSocketServer(httpServer)

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
  httpServer.close(() => {
    process.exit(0);
  });
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully");
  httpServer.close(() => {
    logger.info("Process terminated");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode at port ${PORT}`);
});
