import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { path as chromedriverPath } from "chromedriver";

console.log("Use chromedriver:", chromedriverPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Login Logout STAGE", function () {
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log("Create folder...");
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log("Set up ChromeOptions...");

    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-debugging-port=9222");
    options.addArguments("--disable-blink-features=AutomationControlled");
    console.log("Launch WebDriver...");

    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      console.log("WebDriver launched!");
    } catch (error) {
      console.error("Failed to launch WebDriver:", error);
      console.error(error.stack);
      throw error;
    }
  });

  it("should log in successfully", async function () {
    this.timeout(40000);
    await driver.get("https://staging.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[contains(@class, "header-btn primary")]')
      ),
      20000
    );
    await driver
      .findElement(
        By.xpath('//*[contains(@class, "header-btn primary-button")]')
      )
      .click();

    await driver.wait(
      until.elementLocated(By.css('input[name="email"]')),
      20000
    );
    const userEmail = "anastasia.tereshko+32@solveit.dev";
    const userPassword = "Hejsan123!";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("/home");
    }, 30000);

    const finalUrl = await driver.getCurrentUrl();
    console.log("Redirected to:", finalUrl);

    if (!finalUrl.includes("/home")) {
      throw new Error(`Unexpected redirect URL after login: ${finalUrl}`);
    }

    await driver.wait(
      until.elementLocated(By.className("default_avatar_icon")),
      20000
    );

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Login Logout STAGE passed");
  });

  after(async function () {
    await driver.quit();
    setTimeout(() => {
      if (fs.existsSync(userDataDir)) {
        fs.rmSync(userDataDir, { recursive: true, force: true });
        console.log(`Deleted Chrome profile: ${userDataDir}`);
      }
    }, 5000);
  });
});

describe("Log in with invalid password STAGE", function () {
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log("Create folder...");
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log("Set up ChromeOptions...");

    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-debugging-port=9222");
    options.addArguments("--disable-blink-features=AutomationControlled");
    console.log("Launch WebDriver...");

    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      console.log("WebDriver launched!");
    } catch (error) {
      console.error("Failed to launch WebDriver:", error);
      console.error(error.stack);
      throw error;
    }
  });

  it("should show an error", async function () {
    this.timeout(40000);
    await driver.get("https://staging.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[contains(@class, "header-btn primary")]')
      ),
      20000
    );
    await driver
      .findElement(
        By.xpath('//*[contains(@class, "header-btn primary-button")]')
      )
      .click();

    await driver.wait(
      until.elementLocated(By.css('input[name="email"]')),
      20000
    );
    const userEmail = "anastasia.tereshko+32@solveit.dev";
    const userPassword = "Test123456";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "E-postadressen eller lösenordet är felaktigt. Var god försök igen.")]'
        )
      ),
      20000
    );

    console.log("Test Log in with invalid password STAGE passed");
  });

  after(async function () {
    await driver.quit();
    setTimeout(() => {
      if (fs.existsSync(userDataDir)) {
        fs.rmSync(userDataDir, { recursive: true, force: true });
        console.log(`Deleted Chrome profile: ${userDataDir}`);
      }
    }, 5000);
  });
});

describe("Log in with invalid email STAGE", function () {
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log("Create folder...");
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log("Set up ChromeOptions...");

    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-debugging-port=9222");
    options.addArguments("--disable-blink-features=AutomationControlled");
    console.log("Launch WebDriver...");

    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      console.log("WebDriver launched!");
    } catch (error) {
      console.error("Failed to launch WebDriver:", error);
      console.error(error.stack);
      throw error;
    }
  });

  it("should show an error", async function () {
    this.timeout(40000);
    await driver.get("https://staging.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[contains(@class, "header-btn primary")]')
      ),
      20000
    );
    await driver
      .findElement(
        By.xpath('//*[contains(@class, "header-btn primary-button")]')
      )
      .click();

    await driver.wait(
      until.elementLocated(By.css('input[name="email"]')),
      20000
    );
    const userEmail = "test";
    const userPassword = "Test123456";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Ange en giltig e-postadress.")]')
      ),
      20000
    );

    console.log("Test Log in with invalid email STAGE passed");
  });

  after(async function () {
    await driver.quit();
    setTimeout(() => {
      if (fs.existsSync(userDataDir)) {
        fs.rmSync(userDataDir, { recursive: true, force: true });
        console.log(`Deleted Chrome profile: ${userDataDir}`);
      }
    }, 5000);
  });
});

describe("Log in from Sign up form STAGE", function () {
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log("Create folder...");
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log("Set up ChromeOptions...");

    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-debugging-port=9222");
    options.addArguments("--disable-blink-features=AutomationControlled");
    console.log("Launch WebDriver...");

    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      console.log("WebDriver launched!");
    } catch (error) {
      console.error("Failed to launch WebDriver:", error);
      console.error(error.stack);
      throw error;
    }
  });

  it("should log in successfully from sign up form", async function () {
    this.timeout(40000);
    await driver.get("https://staging.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Kom igång gratis")]')
      ),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Kom igång gratis")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Hur vill du bo?")]')
      ),
      5000
    );
    await driver.findElement(By.xpath('//div[contains(text(), "1")]')).click();
    await driver
      .findElement(By.xpath('//div[contains(text(), "5000")]'))
      .click();
    await driver
      .findElement(By.className("ant-select-selection-overflow"))
      .click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      20000
    );

    const areaSelect = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );
    await driver.executeScript("arguments[0].click();", areaSelect);
    await driver.findElement(By.css("body")).click();

    await driver
      .findElement(By.xpath('//span[contains(text(), "Gå vidare")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h1[contains(text(), "Välkommen till Hemie!")]')
      ),
      20000
    );
    await driver.wait(
      until.elementLocated(By.xpath('//p[contains(text(), "2/5")]')),
      2000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Har du redan ett konto hos oss?")]')
      ),
      2000
    );

    await driver
      .findElement(By.xpath('//a[contains(text(), "Logga in")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.css('input[name="email"]')),
      20000
    );
    const userEmail = "anastasia.tereshko+32@solveit.dev";
    const userPassword = "Hejsan123!";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("/home");
    }, 30000);

    const finalUrl = await driver.getCurrentUrl();
    console.log("Redirected to:", finalUrl);

    if (!finalUrl.includes("/home")) {
      throw new Error(`Unexpected redirect URL after login: ${finalUrl}`);
    }

    await driver.wait(
      until.elementLocated(By.className("default_avatar_icon")),
      20000
    );

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Log in from Sign up form STAGE passed");
  });

  after(async function () {
    await driver.quit();
    setTimeout(() => {
      if (fs.existsSync(userDataDir)) {
        fs.rmSync(userDataDir, { recursive: true, force: true });
        console.log(`Deleted Chrome profile: ${userDataDir}`);
      }
    }, 5000);
  });
});

describe("Log in from Utforska page STAGE", function () {
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log("Create folder...");
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log("Set up ChromeOptions...");

    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-debugging-port=9222");
    options.addArguments("--disable-blink-features=AutomationControlled");
    console.log("Launch WebDriver...");

    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      console.log("WebDriver launched!");
    } catch (error) {
      console.error("Failed to launch WebDriver:", error);
      console.error(error.stack);
      throw error;
    }
  });

  it("should log in successfully from Utforska page", async function () {
    this.timeout(40000);
    await driver.get("https://staging.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Kom igång gratis")]')
      ),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.css('input[placeholder="Sök på stad eller område"]')
      ),
      10000
    );

    await driver
      .findElement(By.css('input[placeholder="Sök på stad eller område"]'))
      .sendKeys("red");

    await driver.wait(
      until.elementLocated(By.className("dropdown-container")),
      10000
    );
    this.timeout(10000);

    await driver.findElement(By.className("dropdown-container")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//h1[contains(text(), "Alla annonser")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga in")]'))
      .click();

    await driver.wait(
      until.elementLocated(By.css('input[name="email"]')),
      20000
    );
    const userEmail = "anastasia.tereshko+32@solveit.dev";
    const userPassword = "Hejsan123!";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("/home");
    }, 30000);

    const finalUrl = await driver.getCurrentUrl();
    console.log("Redirected to:", finalUrl);

    if (!finalUrl.includes("/home")) {
      throw new Error(`Unexpected redirect URL after login: ${finalUrl}`);
    }

    await driver.wait(
      until.elementLocated(By.className("default_avatar_icon")),
      20000
    );

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Log in from Utforska page STAGE passed");
  });

  after(async function () {
    await driver.quit();
    setTimeout(() => {
      if (fs.existsSync(userDataDir)) {
        fs.rmSync(userDataDir, { recursive: true, force: true });
        console.log(`Deleted Chrome profile: ${userDataDir}`);
      }
    }, 5000);
  });
});

describe("Login by clicking on Like icon STAGE", function () {
  let driver;
  let userDataDir;

  before(async function () {
    this.timeout(60000);
    console.log("Create folder...");
    userDataDir = path.join(__dirname, `chrome-profile-${Date.now()}`);
    fs.mkdirSync(userDataDir, { recursive: true });
    console.log("Set up ChromeOptions...");

    const options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments(`--user-data-dir=${userDataDir}`);
    options.addArguments("--window-size=1920,1080");
    options.addArguments("--remote-debugging-port=9222");
    options.addArguments("--disable-blink-features=AutomationControlled");
    console.log("Launch WebDriver...");

    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
      console.log("WebDriver launched!");
    } catch (error) {
      console.error("Failed to launch WebDriver:", error);
      console.error(error.stack);
      throw error;
    }
  });

  it("should log in successfully", async function () {
    this.timeout(40000);
    await driver.get("https://staging.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Kom igång gratis")]')
      ),
      20000
    );

    await driver.executeScript("window.scrollBy(0, window.innerHeight);");
    await driver.sleep(1000);

    const titleEl = await driver.wait(
      until.elementLocated(By.xpath('//h2[contains(text(), "Lägenheter")]')),
      10000
    );
    await driver.wait(until.elementIsVisible(titleEl), 5000);

    await driver.executeScript(
      "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
      titleEl
    );

    await driver.findElement(By.className("like-container ")).click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//p[contains(text(), "Nyfiken på den här lägenheten?")]')
      ),
      4000
    );
    await driver.findElement(By.css("button.log-in-btn")).click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h2[contains(text(), "Välkommen till Hemie!")]')
      ),
      5000
    );

    await driver.wait(
      until.elementLocated(By.css('input[name="email"]')),
      20000
    );
    const userEmail = "anastasia.tereshko+32@solveit.dev";
    const userPassword = "Hejsan123!";
    await driver.findElement(By.css('input[name="email"]')).sendKeys(userEmail);
    await driver
      .findElement(By.css('input[name="password"]'))
      .sendKeys(userPassword);
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(async () => {
      const url = await driver.getCurrentUrl();
      return url.includes("/home");
    }, 30000);

    const finalUrl = await driver.getCurrentUrl();
    console.log("Redirected to:", finalUrl);

    if (!finalUrl.includes("/home")) {
      throw new Error(`Unexpected redirect URL after login: ${finalUrl}`);
    }

    await driver.wait(
      until.elementLocated(By.className("default_avatar_icon")),
      20000
    );

    await driver.findElement(By.className("default_avatar_icon")).click();

    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Logga ut")]')),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga ut")]'))
      .click();

    console.log("Test Login by clicking on Like icon STAGE passed");
  });

  after(async function () {
    await driver.quit();
    setTimeout(() => {
      if (fs.existsSync(userDataDir)) {
        fs.rmSync(userDataDir, { recursive: true, force: true });
        console.log(`Deleted Chrome profile: ${userDataDir}`);
      }
    }, 5000);
  });
});
