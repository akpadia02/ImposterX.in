import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import * as cheerio from "cheerio";

puppeteer.use(StealthPlugin());

const username = "imposterx.com.in";
const password = "imposter@15#12";

const scrapper = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto("https://www.instagram.com/accounts/login/", {
    waitUntil: "networkidle2",
  });

  // Login to Instagram
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');

  // Wait for navigation
  await page.waitForNavigation({ waitUntil: "networkidle2" });

  // Now go to the target profile
  const url = "https://www.instagram.com/gdg_rbu/";
  await page.goto(url, { waitUntil: "networkidle2" });

  // Wait for the profile page to load
  await page.waitForSelector("body");

  // Retrieve the HTML content
  const htmlContent = await page.content();

  // Load the HTML into Cheerio
  const $ = cheerio.load(htmlContent);

  // Extract followers count using the title attribute
  const followers = $("span.x5n08af.x1s688f").text();

  // Extract following count from nested span
  const following = $(
    "span.x5n08af.x1s688f span.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1hl2dhg.x16tdsg8.x1vvkbs"
  ).text();

  console.log(`Followers: ${followers}`);
  console.log(`Following: ${following}`);

  await browser.close();
  scrapeFromHtml(htmlContent);
};

scrapper();
