import { CronJob } from "cron";
import { start } from "./src";

const job = new CronJob("*/5 10-17 * * 1-6", async () => {
  await start();
});

job.start();
console.log("Парсер успешно запущен!");
