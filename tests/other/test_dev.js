import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { path as chromedriverPath } from "chromedriver";

console.log("Use chromedriver:", chromedriverPath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("Accept cookies DEV", function () {
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

  it("should accept cookies successfully", async function () {
    this.timeout(40000);
    await driver.get("https://dev.hemie.org/");

    await driver.wait(
      until.elementLocated(By.className("manager-cookie__wrapper")),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Godkänn alla")]'))
      .click();

    let elements = await driver.findElements(
      By.className("manager-cookie__wrapper")
    );
    if (elements.length === 0) {
      console.log("Pop up is gone");
    }

    await driver.navigate().refresh();

    if (elements.length === 0) {
      console.log("Pop up is gone");
    }

    console.log("Test Accept cookies DEV passed");
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

describe("Decline cookies DEV", function () {
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

  it("should decline cookies successfully", async function () {
    this.timeout(40000);
    await driver.get("https://dev.hemie.org/");

    await driver.wait(
      until.elementLocated(By.className("manager-cookie__wrapper")),
      20000
    );

    await driver
      .findElement(By.xpath('//span[contains(text(), "Hantera cookies")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//h2[contains(text(), "Anpassa dina samtyckesinställningar")]'
        )
      ),
      20000
    );

    const btn = await driver.findElement(
      By.xpath('//span[contains(text(), "Bekräfta val")]')
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });",
      btn
    );

    const visible = await btn.isDisplayed();
    console.log("Is'Bekräfta val' visible?", visible);

    if (visible) {
      await btn.click();
    } else {
      console.log("The button is not visible, use JS click");
      await driver.executeScript("arguments[0].click();", btn);
    }

    let elements = await driver.findElements(
      By.className("manager-cookie__wrapper")
    );
    if (elements.length === 0) {
      console.log("Pop up is gone");
    }

    await driver.navigate().refresh();

    await driver.wait(
      until.elementLocated(By.className("manager-cookie__wrapper")),
      20000
    );

    console.log("Test Decline cookies DEV passed");
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

describe("Forgot password DEV", function () {
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

  it("should show forgot password pop up", async function () {
    this.timeout(40000);
    await driver.get("https://dev.hemie.org/");

    await driver.wait(
      until.elementLocated(
        By.xpath('//*[contains(@class, "header-btn primary")]')
      ),
      20000
    );
    await driver
      .findElement(By.xpath('//span[contains(text(), "Logga in")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//button[contains(text(), "Glömt lösenord?")]')
      ),
      10000
    );

    const forgotPasswordBtn = await driver.findElement(
      By.xpath('//button[contains(text(), "Glömt lösenord?")]')
    );
    await driver.executeScript("arguments[0].click();", forgotPasswordBtn);

    await driver.wait(
      until.elementLocated(
        By.xpath('//h2[contains(text(), "Återställ lösenord")]')
      ),
      5000
    );

    await driver
      .findElement(By.id("email"))
      .sendKeys("veronika.malahovskaya@solveit.dev");

    await driver
      .findElement(By.xpath('//span[contains(text(), "Återställ lösenord")]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.xpath('//h2[contains(text(), "Återställ lösenord!")]')
      ),
      5000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath(
          '//p[contains(text(), "Ett e-postmeddelande har skickats till den angivna e-postadressen. Det kan ta några minuter innan meddelandet når fram.")]'
        )
      ),
      2000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//span[contains(text(), "Tillbaka till login")]')
      ),
      2000
    );

    console.log("Test Forgot password DEV passed");
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

describe("Terms and privacy check DEV", function () {
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

  it("should show terms & privacy pages", async function () {
    this.timeout(40000);
    await driver.get("https://dev.hemie.org/");

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
    const firstList = await driver.findElement(
      By.xpath(
        "(//div[contains(@class,'ant-select-selection-overflow-item ant-select-selection-overflow-item-rest')])[1]"
      )
    );
    await firstList.click();
    await driver.wait(
      until.elementLocated(By.xpath('//span[contains(text(), "Vaxholm")]')),
      5000
    );

    const vaxholmOption = await driver.findElement(
      By.xpath('//span[contains(text(), "Vaxholm")]')
    );

    await driver.wait(until.elementIsVisible(vaxholmOption), 5000);

    await vaxholmOption.click();
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
        By.xpath(
          '//p[contains(text(), "Genom att registrera dig godkänner du vår")]'
        )
      ),
      20000
    );

    await driver.wait(
      until.elementLocated(By.xpath('//a[contains(text(), "Villkor")]')),
      20000
    );

    await driver.wait(
      until.elementLocated(
        By.xpath('//a[contains(text(), "Integritetspolicy.")]')
      ),
      20000
    );

    const originalTabs = await driver.getAllWindowHandles();

    const terms = await driver.findElement(
      By.xpath('//a[contains(text(), "Villkor")]')
    );
    await terms.click();

    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > originalTabs.length;
    }, 5000);

    const newTabs = await driver.getAllWindowHandles();
    const newTabTerms = newTabs.find((h) => !originalTabs.includes(h));

    await driver.switchTo().window(newTabTerms);

    const newUrlTerms = await driver.getCurrentUrl();
    console.log("Redirected to:", newUrlTerms);

    if (
      !newUrlTerms.includes(
        "https://support.hemie.se/hc/sv/articles/23897647360018-Allm%C3%A4nna-villkor"
      )
    ) {
      throw new Error(`Unexpected redirect URL after login: ${newUrlTerms}`);
    }

    await driver.close();
    await driver.switchTo().window(originalTabs[0]);

    const privacy = await driver.findElement(
      By.xpath('//a[contains(text(), "Villkor")]')
    );
    await privacy.click();

    await driver.wait(async () => {
      const handles = await driver.getAllWindowHandles();
      return handles.length > originalTabs.length;
    }, 5000);

    const newTabsPrivacy = await driver.getAllWindowHandles();
    const newTabPrivacy = newTabsPrivacy.find((h) => !originalTabs.includes(h));

    await driver.switchTo().window(newTabPrivacy);

    const newUrlPrivacy = await driver.getCurrentUrl();
    console.log("Redirected to:", newUrlPrivacy);

    if (
      !newUrlPrivacy.includes(
        "https://support.hemie.se/hc/sv/articles/23897647360018-Allm%C3%A4nna-villkor"
      )
    ) {
      throw new Error(`Unexpected redirect URL after login: ${newUrlPrivacy}`);
    }

    await driver.close();
    await driver.switchTo().window(originalTabs[0]);

    console.log("Test Terms and privacy check DEV passed");
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
