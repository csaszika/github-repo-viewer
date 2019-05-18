import {componentTestingSetup} from 'angular-unit-component-driver';
import {AppComponentDriver} from './app.component.driver';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';

const componentSetup = (): AppComponentDriver => {
  return componentTestingSetup({
    componentClass: AppComponent,
    driver: AppComponentDriver,
    imports: [RouterTestingModule],
  });
};

describe('AppComponent', () => {

  let driver: AppComponentDriver;

  Given(() => {
    driver = componentSetup();
  });

  describe('Initializing', () => {
    When(() => {
      driver.detectChanges();
    });

    Then('should be created', () => {
      expect(driver.componentInstance).toBeTruthy();
    });

    Then('should have router outlet', () => {
      expect(driver.routerOutlet).toBeTruthy();
    });
  });
});
