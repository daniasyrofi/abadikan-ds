const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:6006', { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => {
    const tab = document.querySelector('button[role="tab"]');
    const badge = tab ? tab.innerHTML : 'No tab';
    const sidebar = document.querySelector('#storybook-explorer-tree');
    return {
      tabHTML: badge,
      sidebarItem: sidebar ? sidebar.innerHTML.substring(0, 1000) : 'No sidebar'
    };
  });
  console.log(JSON.stringify(html, null, 2));
  await browser.close();
})();
