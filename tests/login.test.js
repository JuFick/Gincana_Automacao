import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { url } from '../utils/config.js';
import { validUsername, validPassword } from '../utils/credentials.js';

describe('Login Test', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async function() {
    await driver.quit();
  });

  it('should log in with valid credentials', async function() {
    await driver.get(url);
    await driver.findElement(By.id('user-name')).sendKeys(validUsername);
    await driver.findElement(By.id('password')).sendKeys(validPassword);
    await driver.findElement(By.id('login-button')).click();

    const inventoryTitle = await driver.wait(until.elementLocated(By.css('.title')), 5000).getText();
    expect(inventoryTitle).to.equal('Products');
  });

  it('should fail to log in with invalid credentials', async function() {
    await driver.get(url);
    await driver.findElement(By.id('user-name')).sendKeys('invalid_user');
    await driver.findElement(By.id('password')).sendKeys('invalid_password');
    await driver.findElement(By.id('login-button')).click();

    const errorMessage = await driver.findElement(By.css('.error-message-container')).isDisplayed();
    expect(errorMessage).to.be.true;
  });
});
