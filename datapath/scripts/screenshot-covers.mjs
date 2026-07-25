import { chromium } from 'playwright';

async function takeScreenshot(projectId, projectPath) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 固定视口大小
  await page.setViewportSize({ width: 1200, height: 675 });

  const filePath = 'file:///' + projectPath.replace(/\\/g, '/');
  console.log('Opening:', filePath);

  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 截取时往上偏移50px（y从-50开始，但实际会从0开始）
  // 通过设置更大的高度然后裁剪
  await page.screenshot({
    path: 'public/projects/' + projectId + '/cover.png',
    clip: { x: 0, y: 0, width: 1200, height: 675 }
  });

  console.log(projectId + ' Screenshot saved!');

  await browser.close();
}

// 让页面滚动到顶部，然后截取
async function takeScreenshotScrolled(projectId, projectPath, scrollUp = 50) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1200, height: 675 });

  const filePath = 'file:///' + projectPath.replace(/\\/g, '/');
  console.log('Opening:', filePath);

  await page.goto(filePath, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 先滚动到页面底部，再往上滚动scrollUp像素
  await page.evaluate((up) => {
    window.scrollTo(0, up);
  }, scrollUp);

  await page.waitForTimeout(500);

  await page.screenshot({
    path: 'public/projects/' + projectId + '/cover.png',
    clip: { x: 0, y: 0, width: 1200, height: 675 }
  });

  console.log(projectId + ' Screenshot saved!');

  await browser.close();
}

async function main() {
  // 使用scrollUp参数，截取位置往上50px
  await takeScreenshotScrolled('rfm_analysis', 'C:\\Users\\666\\Documents\\Claude_code_projects\\data_assitant_web\\data_project\\rfm_analysis\\ppt\\index.html', 50);
  await takeScreenshotScrolled('aarrr_analysis', 'C:\\Users\\666\\Documents\\Claude_code_projects\\data_assitant_web\\data_project\\aarrr_analysis\\ppt\\index.html', 50);
  await takeScreenshotScrolled('ltv_cac_analysis', 'C:\\Users\\666\\Documents\\Claude_code_projects\\data_assitant_web\\data_project\\ltv_cac_analysis\\ppt\\index.html', 50);
  console.log('All screenshots done!');
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});