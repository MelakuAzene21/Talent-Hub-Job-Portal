import { env } from "./config/env";
import { connectDB } from "./db/connect";
import app from "./app";
connectDB().then(() => {
  app.listen(env.PORT, () =>
    console.log(`API on http://localhost:${env.PORT}`)
  );
});
