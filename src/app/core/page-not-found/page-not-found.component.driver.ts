import {ComponentDriver} from 'angular-unit-component-driver';
import {PageNotFoundComponent} from './page-not-found.component';

export class PageNotFoundComponentDriver extends ComponentDriver<PageNotFoundComponent> {
  get pageNotFound(): HTMLHeadingElement {
    return this.querySelector('h3');
  }
}
