import {componentTestingSetup} from 'angular-unit-component-driver';
import {GithubReposTableComponent} from './github-repos-table.component';
import {GithubReposTableComponentDriver} from './github-repos-table.component.driver';
import {MockComponent} from 'ng-mocks';
import {
  MatCell,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatPaginator,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from '@angular/material';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

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
    Given(() => {

    });

    When(() => {
      driver.detectChanges();
    });

    Then(() => {
      expect(driver.componentInstance).toBeTruthy();
    });
  });
});
