let page;

beforeEach(async () => {
  page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);
}, 150000);

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {

  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 150000);

  test("The h1 header content'", async () => {
    
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1', {

      timeout: 200000
    });

    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Let’s build from here · GitHub');
  }, 400000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 400000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {

      timeout: 90000,
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 400000);
});


describe("Expore other Github project pages", () => {

  test("Check title for Github skills page", async () => {
    
    await page.goto("https://skills.github.com/");
    await page.waitForSelector('h1', {

      timeout: 90000
    });

    const pageTitle = await page.title();
    expect(pageTitle).toEqual('GitHub Skills');
  }, 400000);

  test("Check title for Github premium-support page", async () => {
    
    await page.goto("https://github.com/enterprise/premium-support");
    await page.waitForSelector('h1', {

      timeout: 90000
    });

    const pageTitle = await page.title();
    expect(pageTitle).toEqual('GitHub Premium Support · GitHub');

  }, 400000);

  test("Check title for Github sponsors page", async () => {

    await page.goto("https://github.com/sponsors");
    await page.waitForSelector('h1', {

      timeout: 90000    
    });

    const pageTitle = await page.title();
    expect(pageTitle).toEqual('GitHub Sponsors · GitHub');
  }, 400000);
});
