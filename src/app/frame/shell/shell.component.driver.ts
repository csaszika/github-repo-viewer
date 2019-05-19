import {ComponentDriver} from 'angular-unit-component-driver';
import {ShellComponent} from './shell.component';
import {MainNavComponent} from '../main-nav/main-nav.component';

export class ShellComponentDriver extends ComponentDriver<ShellComponent> {
  get mainNav(): MainNavComponent {
    return this.queryDirective(MainNavComponent);
  }
}
