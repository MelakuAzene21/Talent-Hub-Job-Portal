import { env } from "./config/env";
import { connectDB } from "./db/connect";
import { createServer } from "http";
import app from "./app";
import { SocketService } from "./socket/socket";
// bot.ts
import TelegramBot from "node-telegram-bot-api";
import axios from "axios";

const BOT_TOKEN = process.env.BOT_TOKEN as string;
const API_URL = "http://localhost:5000/jobs"; // your backend jobs endpoint

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

connectDB().then(() => {
  const server = createServer(app);

  // Initialize Socket.io
  const socketService = new SocketService(server);

  // Make socket service available globally
  (global as any).socketService = socketService;

  // ✅ /start command
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(
      chatId,
      `👋 Welcome to *Job Finder Bot*!\n\nFind your next opportunity right here 🚀`,
      {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "📂 Browse Jobs", callback_data: "browse_jobs" }],
            [{ text: "🔍 Search Jobs", switch_inline_query_current_chat: "" }],
          ],
        },
      }
    );
  });

  // ✅ Handle Browse Jobs
  bot.on("callback_query", async (query) => {
    if (!query.message) return;

    const chatId = query.message.chat.id;

    if (query.data === "browse_jobs") {
      try {
        const { data: jobs } = await axios.get(API_URL);

        if (!jobs.length) {
          return bot.sendMessage(chatId, "⚠️ No jobs found right now.");
        }

        // Limit to first 5 jobs
        const jobList = jobs.slice(0, 5);

        for (const job of jobList) {
          const jobMessage = `
💼 *${job.title}*
🏢 ${job.createdBy?.name || "Unknown Company"}
📍 ${job.location || "Not specified"}
💰 ${job.salary || "Negotiable"}
📝 ${job.description.substring(0, 100)}...
        `;

          bot.sendMessage(chatId, jobMessage, {
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "📄 View Details",
                    url: `https://talent-hub-job-portal.vercel.app/jobs/${job._id}`,
                  },
                ],
              ],
            },
          });
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        bot.sendMessage(chatId, "❌ Failed to fetch jobs. Try again later.");
      }
    }
  });
  server.listen(env.PORT, () => {
    console.log(`API on http://localhost:${env.PORT}`);
    console.log(`Socket.io initialized`);
  });
});
