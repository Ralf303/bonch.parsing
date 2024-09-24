import { chromium } from "playwright";
import { config } from "dotenv";
config();

export const start = async () => {
  if (!process.env.EMAIL || !process.env.PASSWORD) {
    return console.log("Нет данных для входа");
  }

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();

    await page.goto("https://lk.sut.ru/cabinet/?login=no", { timeout: 6000 });

    //Вводим почту
    await page.waitForLoadState();
    await page.getByTitle("Введите логин!").fill(process.env.EMAIL);
    console.log("Заполнили почту");

    //Вводим пароль
    await page.getByTitle("Введите пароль!").fill(process.env.PASSWORD);
    console.log("Заполнили пароль");

    //Регистрируемся
    await page.getByTitle("Нажмите для входа в приложение!").click();
    console.log("Нажали на кнопку");

    console.log("Ждем загрузку страницы");
    await page.waitForTimeout(3000);
    await page.waitForLoadState();

    //Открываем меню
    await page.getByTitle("Учеба...").click();

    console.log("Открываем расписание");
    await page.getByTitle("Расписание").click();

    await page.waitForTimeout(3000);
    await page.waitForLoadState();

    console.log("Ищем кнопку...");
    await page
      .getByRole("cell", { name: "Начать занятие" })
      .locator("a")
      .click();

    await page.waitForTimeout(3000);

    await page.close();
    await browser.close();
    console.log("Готово");
  } catch (error) {
    await browser.close();
    console.log(error);
  }
};
