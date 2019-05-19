import {componentTestingSetup} from 'angular-unit-component-driver';
import {PageNotFoundComponent} from './page-not-found.component';
import {PageNotFoundComponentDriver} from './page-not-found.component.driver';

const componentSetup = (): PageNotFoundComponentDriver => {
  return componentTestingSetup({
    componentClass: PageNotFoundComponent,
    driver: PageNotFoundComponentDriver,
  });
};

describe('PageNotFoundComponent', () => {

  let driver: PageNotFoundComponentDriver;

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

    Then('should have page not found text', () => {
      expect(driver.pageNotFound.textContent.trim()).toEqual('Page Not Found 404');
    });
  });
});
