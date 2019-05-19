import {ComponentDriver} from 'angular-unit-component-driver';
import {HomeComponent} from './home.component';

export class HomeComponentDriver extends ComponentDriver<HomeComponent> {

  get home(): HTMLElement {
    return this.querySelector('p.hello');
  }
}
