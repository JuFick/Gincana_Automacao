// logout.test.js

import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { url } from '../utils/config.js';
import { validUsername, validPassword } from '../utils/credentials.js';

describe('Logout Test', function() {
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get(url);
    await driver.findElement(By.id('user-name')).sendKeys(validUsername);
    await driver.findElement(By.id('password')).sendKeys(validPassword);
    await driver.findElement(By.id('login-button')).click();
    await driver.wait(until.urlContains('inventory'), 5000);
  });

  after(async function() {
    await driver.quit();
  });

  it('should log out the user', async function() {
    await driver.findElement(By.id('react-burger-menu-btn')).click();

    // Espera até que o botão de logout esteja visível e interagível
    const logoutButton = await driver.wait(until.elementLocated(By.id('logout_sidebar_link')), 5000);
    await driver.wait(until.elementIsVisible(logoutButton), 5000);
    await logoutButton.click();

    const loginButton = await driver.wait(until.elementLocated(By.id('login-button')), 5000);
    expect(await loginButton.isDisplayed()).to.be.true;
  });
});
