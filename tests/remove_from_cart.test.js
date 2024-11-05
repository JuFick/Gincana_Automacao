import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';
import { url } from '../utils/config.js';
import { validUsername, validPassword } from '../utils/credentials.js';

describe('Remove from Cart Test', function() {
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

  it('should add and then remove an item from the cart', async function() {
    await driver.findElement(By.css('.inventory_item button')).click();
    await driver.findElement(By.css('.shopping_cart_link')).click();

    // Verifica se o item foi adicionado ao carrinho
    let cartItem = await driver.findElement(By.css('.cart_item')).isDisplayed();
    expect(cartItem).to.be.true;

    // Remove o item do carrinho
    await driver.findElement(By.css('.cart_button')).click();

    // Verifica se o item foi removido
    const cartItems = await driver.findElements(By.css('.cart_item'));
    expect(cartItems.length).to.equal(0);
  });
});
