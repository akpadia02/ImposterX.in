// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';

// puppeteer.use(StealthPlugin());

// const scrapper = async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();

//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
//     await page.setViewport({ width: 1280, height: 800 });

//     await page.goto('https://www.instagram.com/imposterx.in', { waitUntil: 'networkidle2' });

//     await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds


//     await page.screenshot({ path: 'screenshot.png' });
//     await browser.close();
// };

// scrapper();
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import fs from 'fs';

puppeteer.use(StealthPlugin());

const username = 'imposterx.in';
const password = 'imposter';

const scrapper = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto('https://www.instagram.com/accounts/login/', { waitUntil: 'networkidle2' });

    // Login to Instagram
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for the page to load after login
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Now go to the target profile
    const url = 'https://www.instagram.com/celebface/';
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the profile page to load
    await page.waitForSelector('body');

    // Retrieve the HTML content
    const htmlContent = await page.content();

    // Save the HTML content to a file
    fs.writeFileSync('instagram_profile.html', htmlContent);
    console.log(htmlContent);

    await browser.close();
};

scrapper();
