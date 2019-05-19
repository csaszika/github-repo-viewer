import {componentTestingSetup} from 'angular-unit-component-driver';
import {HomeComponent} from './home.component';
import {HomeComponentDriver} from './home.component.driver';

const componentSetup = (): HomeComponentDriver => {
  return componentTestingSetup({
    componentClass: HomeComponent,
    driver: HomeComponentDriver,
  });
};

describe('HomeComponent', () => {

  let driver: HomeComponentDriver;

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

    Then('should have welcome text', () => {
      expect(driver.home.textContent.trim()).toEqual('Hello Cloudera!');
    });
  });
});
