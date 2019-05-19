import {ComponentDriver} from 'angular-unit-component-driver';
import {MainNavComponent} from './main-nav.component';

export class MainNavComponentDriver extends ComponentDriver<MainNavComponent> {

  get homeNavItem(): HTMLElement {
    return this.querySelectorAll('mat-nav-list > a')[0];
  }

  get menuToggleButton(): HTMLButtonElement {
    return this.querySelector('button[toggle-menu]');
  }
}
