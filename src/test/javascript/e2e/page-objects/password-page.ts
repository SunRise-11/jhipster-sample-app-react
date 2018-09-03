import { ElementFinder, browser, $ } from 'protractor';

import BasePage from './base-component';

const selector: ElementFinder = $('#password-form');
export default class PasswordPage extends BasePage {
  selector: ElementFinder;
  currentPassword: ElementFinder = this.selector.$('#currentPassword');
  newPassword: ElementFinder = this.selector.$('#newPassword');
  confirmPassword: ElementFinder = this.selector.$('#confirmPassword');
  saveButton: ElementFinder = this.selector.$('button[type=submit]');
  title: ElementFinder = $('#password-title');

  constructor() {
    super(selector);
    this.selector = selector;
  }

  get() {
    browser.get('#/account/password');
    this.waitUntilDisplayed();
  }

  getTitle() {
    return this.title.getAttribute('id');
  }

  setCurrentPassword(password: string) {
    return this.currentPassword.sendKeys(password);
  }

  clearCurrentPassword() {
    return this.currentPassword.clear();
  }

  setNewPassword(newPassword: string) {
    return this.newPassword.sendKeys(newPassword);
  }

  clearNewPassword() {
    return this.newPassword.clear();
  }

  setConfirmPassword(confirmPassword: string) {
    return this.confirmPassword.sendKeys(confirmPassword);
  }

  clearConfirmPassword() {
    return this.confirmPassword.clear();
  }

  autoChangePassword(currentPassword: string, newPassword: string, confirmPassword: string) {
    this.setCurrentPassword(currentPassword);
    this.setNewPassword(newPassword);
    this.setConfirmPassword(confirmPassword);
    return this.save();
  }

  save() {
    return this.saveButton.click();
  }
}
