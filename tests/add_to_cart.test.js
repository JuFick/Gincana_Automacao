import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { url } from '../utils/config.js';
import { validUsername, validPassword } from '../utils/credentials.js';

describe('Add to Cart Test', function() {
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

  it('should add an item to the cart', async function() {
    await driver.findElement(By.css('.inventory_item button')).click();
    await driver.findElement(By.css('.shopping_cart_link')).click();

    const cartItem = await driver.findElement(By.css('.cart_item')).isDisplayed();
    expect(cartItem).to.be.true;
  });
});
