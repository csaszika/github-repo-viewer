import {componentTestingSetup} from 'angular-unit-component-driver';
import {MainNavComponent} from './main-nav.component';
import {MainNavComponentDriver} from './main-nav.component.driver';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterTestingModule} from '@angular/router/testing';
import {LayoutModule} from '@angular/cdk/layout';

import {MainRoutes} from '../../shared/routes';

const componentSetup = (): MainNavComponentDriver => {
  return componentTestingSetup({
    componentClass: MainNavComponent,
    driver: MainNavComponentDriver,
    imports: [
      NoopAnimationsModule,
      RouterTestingModule,
      LayoutModule,
      MatButtonModule,
      MatIconModule,
      MatListModule,
      MatSidenavModule,
      MatToolbarModule,
    ]
  });
};

describe('MainNavComponent', () => {

  let driver: MainNavComponentDriver;

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

    Then('should have home nav item', () => {
      expect(driver.homeNavItem).toBeTruthy();
      expect(driver.homeNavItem.textContent.trim()).toEqual('Home');
      expect(driver.homeNavItem.getAttribute('href')).toEqual(`/${MainRoutes.HOME}`);
    });

    Then('should have github repos nav item', () => {
      expect(driver.githubReposNavItem).toBeTruthy();
      expect(driver.githubReposNavItem.textContent.trim()).toEqual('Github repos');
      expect(driver.githubReposNavItem.getAttribute('href')).toEqual(`/${MainRoutes.GITHUB_REPOS}`);
    });

    Then('should have menu toggle button', () => {
      expect(driver.menuToggleButton).toBeFalsy();
    });
  });
});
