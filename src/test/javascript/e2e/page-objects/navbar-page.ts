import { $, ElementFinder } from 'protractor';

import BasePage from './base-component';
import SignInPage from './signin-page';
import RegisterPage from './register-page';
import PasswordPage from './password-page';
import SettingsPage from './settings-page';

const selector: ElementFinder = $('#app-header');
export default class NavBarPage extends BasePage {
  selector: ElementFinder;
  signInPage: SignInPage;
  adminMenu: ElementFinder;
  accountMenu: ElementFinder = this.selector.$('#account-menu');
  entityMenu: ElementFinder = this.selector.$('#entity-menu');

  constructor(asAdmin?: Boolean) {
    super(selector);
    this.selector = selector;
    if (asAdmin) {
      this.adminMenu = this.selector.$('#admin-menu');
    }
    this.signInPage = new SignInPage();
  }

  getPasswordPage() {
    this.clickOnAccountMenuItem('password');
    return new PasswordPage();
  }

  getSettingsPage() {
    this.clickOnAccountMenuItem('settings');
    return new SettingsPage();
  }

  getRegisterPage() {
    this.clickOnAccountMenu();
    this.clickOnTabMenu('#/register');
    return new RegisterPage();
  }

  getSignInPage() {
    this.clickOnAccountMenu();
    this.clickOnTabMenu('#/login');
    return new SignInPage();
  }

  getEntityPage(entityName: string) {
    this.clickOnEntityMenu();
    return this.clickOnEntity(entityName);
  }

  clickOnTabMenu(item: string) {
    return this.selector
      .$('#header-tabs')
      .$(`.dropdown-item[href="${item}"]`)
      .click();
  }

  clickOnAccountMenu() {
    return this.accountMenu.click();
  }

  clickOnAccountMenuItem(item: string) {
    this.accountMenu.click();
    return this.selector.$(`.dropdown-item[href="#/account/${item}"`).click();
  }

  clickOnAdminMenuItem(item: string) {
    this.adminMenu.click();
    return this.selector.$(`.dropdown-item[href="#/admin/${item}"]`).click();
  }

  clickOnEntityMenu() {
    return this.entityMenu.click();
  }

  clickOnEntity(entityName: string) {
    return this.selector.$(`.dropdown-item[href="#/entity/${entityName}"]`).click();
  }

  autoSignIn() {
    this.signInPage.get();
    this.signInPage.autoSignInUsing('admin', 'admin');
    return this.signInPage.waitUntilHidden();
  }

  autoSignOut() {
    this.signInPage.autoSignOut();
  }
}
