import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const logError = (message) => {
  const log = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(path.join(logDir, "error.log"), log);
};

export const logInfo = (message) => {
  const log = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(path.join(logDir, "info.log"), log);
};
