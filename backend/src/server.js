import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import { gracefulShutdown } from "./utils/shutdown.js";

connectDB();

const server = app.listen(env.port, () => {
  console.log(
    `Fixora backend running in ${env.nodeEnv} mode on port ${env.port}`
  );
});

gracefulShutdown(server);
