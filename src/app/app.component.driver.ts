import {ComponentDriver} from 'angular-unit-component-driver';
import {AppComponent} from './app.component';
import {RouterOutlet} from '@angular/router';

export class AppComponentDriver extends ComponentDriver<AppComponent> {
  get routerOutlet(): RouterOutlet {
    return this.queryDirective(RouterOutlet);
  }
}
