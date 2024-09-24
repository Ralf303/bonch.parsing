import { CronJob } from "cron";
import { start } from "./src";

const job = new CronJob("0 */5 * * * *", async () => {
  await start();
});

job.start();
console.log("Парсер успешно запущен!");
