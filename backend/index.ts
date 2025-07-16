import express from "express";
import mainRouter from "./router/router";
import {prisma} from "./db";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express(); 

app.use(express.json())
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true
}))
app.use('/api/v1',mainRouter)

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

async function shutdown(signal: string) {
  console.log(`Received signal ${signal}. Closing server & disconnecting from DB...`);
  
  server.close(async (err) => {
    if (err) {
      console.error('Error during server close:', err);
      process.exit(1);
    }
    await prisma.$disconnect();
    console.log('✅ Prisma disconnected, server shut down gracefully.');
    process.exit(0);
  });

  // Force shutdown after a timeout (e.g., 10s)
  setTimeout(() => {
    console.error('🔶 Forced shutdown due to timeout');
    process.exit(1);
  }, 10_000);
}

['SIGINT', 'SIGTERM', 'SIGQUIT'].forEach(sig => {
  process.on(sig, () => shutdown(sig));
});
