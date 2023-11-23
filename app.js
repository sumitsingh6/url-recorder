const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const recorder = new PuppeteerScreenRecorder(page);
  await recorder.start('./report/video/simple.mp4'); // supports extension - mp4, avi, webm and mov
  await page.goto('https://interactly.video/');
  await autoScroll(page);

  //await page.goto('https://test.com');
  await recorder.stop();
  await browser.close();
})();

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const scrollInterval = setInterval(() => {
        const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
        const scrollableHeight = scrollHeight - clientHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollableHeight) {
          clearInterval(scrollInterval);
          resolve();
        }
      }, 100);
    });
  });
}