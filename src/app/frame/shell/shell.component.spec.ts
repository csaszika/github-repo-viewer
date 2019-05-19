import {componentTestingSetup} from 'angular-unit-component-driver';
import {ShellComponent} from './shell.component';
import {ShellComponentDriver} from './shell.component.driver';
import {MockComponent} from 'ng-mocks';
import {MainNavComponent} from '../main-nav/main-nav.component';

const componentSetup = (): ShellComponentDriver => {
  return componentTestingSetup({
    componentClass: ShellComponent,
    driver: ShellComponentDriver,
    declarations: [
      MockComponent(MainNavComponent),
    ]
  });
};

describe('ShellComponent', () => {

  let driver: ShellComponentDriver;

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

    Then('should contain main nav bar', () => {
      expect(driver.mainNav).toBeTruthy();
    });
  });
});
