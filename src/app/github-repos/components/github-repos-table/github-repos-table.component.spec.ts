import {componentTestingSetup} from 'angular-unit-component-driver';
import {GithubReposTableComponent} from './github-repos-table.component';
import {GithubReposTableComponentDriver} from './github-repos-table.component.driver';
import {MockComponent} from 'ng-mocks';
import {MatPaginator, MatTableModule} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SimpleChange} from '@angular/core';

const componentSetup = (): GithubReposTableComponentDriver => {
  return componentTestingSetup({
    componentClass: GithubReposTableComponent,
    driver: GithubReposTableComponentDriver,
    declarations: [
      MockComponent(MatPaginator),
    ],
    imports: [NoopAnimationsModule, MatTableModule]
  });
};

describe('GithubReposTableComponent', () => {

  let driver: GithubReposTableComponentDriver;

  Given(() => {
    driver = componentSetup();
  });

  describe('Initializing', () => {
    When(() => {
      expect(driver.componentInstance.dataSource).toBeUndefined();
      driver.detectChanges();
    });

    Then('should be created', () => {
      expect(driver.componentInstance).toBeTruthy();
    });
  });

  describe('Input changes', () => {
    const firstValue = [{ test: 'mock' } as any];
    const secondValue = [{ test: 'mock2' } as any];

    When(() => {
      expect(driver.componentInstance.dataSource).toBeUndefined();
      driver.detectChanges();
      const previousValue = null;
      const firstChange = true;
      driver.componentInstance.ngOnChanges({
        githubRepos: new SimpleChange(previousValue, firstValue, firstChange)
      });
    });

    Then('should create the datasource', () => {
      expect(driver.componentInstance.dataSource).toBeTruthy();
    });

    Then('should update the datasource on input change', () => {
      const firstChange = false;
      const previousDatasource = driver.componentInstance.dataSource;
      driver.componentInstance.ngOnChanges({
        githubRepos: new SimpleChange(firstValue, secondValue, firstChange)
      });
      expect(driver.componentInstance.dataSource).toBeTruthy();
      expect(previousDatasource).toEqual(driver.componentInstance.dataSource);
    });

  });
});
