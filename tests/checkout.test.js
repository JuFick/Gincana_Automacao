// checkout.test.js

import { Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "chai";
import { url } from "../utils/config.js";
import { validUsername, validPassword } from "../utils/credentials.js";

describe("Complete Checkout Flow", function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
  });

  after(async function () {
    await driver.quit();
  });

  it("Complete checkout", async function () {
    this.timeout(60000); // Aumenta o timeout para 60 segundos

    // Iniciar o teste
    await driver.get("https://www.saucedemo.com/");

    // Inserir credenciais
    await driver.findElement(By.id("user-name")).sendKeys("standard_user");
    await driver
      .findElement(By.id("password"))
      .sendKeys("secret_sauce", Key.RETURN);

    // Verifique o URL após o login
    await driver.wait(until.urlContains("inventory"), 10000);
    let currentUrl = await driver.getCurrentUrl();

    // Adicionar item ao carrinho
    await driver.findElement(By.css(".inventory_item button")).click();

    // Verifique se o item foi adicionado ao carrinho
    const cartBadge = await driver.wait(
      until.elementLocated(By.css(".shopping_cart_badge")),
      10000
    );

    const cartCount = await cartBadge.getText();

    // Ir para o carrinho
    await driver.findElement(By.css(".shopping_cart_link")).click();

    // Aguardar o botão de checkout estar presente e visível
    const checkoutButton = await driver.wait(
      until.elementLocated(By.css(".checkout_button")),
      10000
    );
    await checkoutButton.click(); // Iniciar checkout

    // Aguarde o carregamento da página de checkout
    await driver.wait(until.urlContains("checkout"), 10000); // Aguardar que a URL contenha "checkout"

    const firstNameField = await driver.wait(
      until.elementLocated(By.id("first-name")),
      10000
    );

    await firstNameField.sendKeys("Júlia");
    await driver.findElement(By.id("last-name")).sendKeys("Fick");
    await driver.findElement(By.id("postal-code")).sendKeys("12345");

    // Aguarde o botão de finalizar compra
    const continueButton = await driver.wait(
      until.elementLocated(By.id("continue")),
      10000
    );

    // Verifique se o botão está visível antes de clicar
    await driver.wait(until.elementIsVisible(continueButton), 5000);
    await continueButton.click(); // Finalizar compra
    // Aguarde o botão de finalizar compra
    const finishButton = await driver.wait(
      until.elementLocated(By.id("finish")),
      10000
    );

    // Verifique se o botão está visível antes de clicar
    await driver.wait(until.elementIsVisible(finishButton), 5000);
    await finishButton.click(); // Finalizar compra

    // Aumente o tempo de espera para o header de conclusão
    const backHomeButton = await driver.wait(
      until.elementLocated(By.id("back-to-products")),
      10000
    );

    // Verifique se o botão está visível antes de clicar
    await driver.wait(until.elementIsVisible(backHomeButton), 5000);
    await backHomeButton.click(); // Finalizar compra
  });
});
