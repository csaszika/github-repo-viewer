import {componentTestingSetup} from 'angular-unit-component-driver';
import {GithubReposContainerComponent} from './github-repos-container.component';
import {GithubReposContainerDriver} from './github-repos-container.driver';
import {MockComponent} from 'ng-mocks';
import {MatFormField, MatInput, MatLabel} from '@angular/material';
import {GithubReposTableComponent} from '../../components/github-repos-table/github-repos-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GithubHttpService} from '../../services/github-http.service';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {fakeAsync, tick} from '@angular/core/testing';

const componentSetup = (httpService: Spy<GithubHttpService>): GithubReposContainerDriver => {
  return componentTestingSetup({
    componentClass: GithubReposContainerComponent,
    driver: GithubReposContainerDriver,
    declarations: [
      MockComponent(MatFormField),
      MockComponent(MatInput),
      MockComponent(MatLabel),
      MockComponent(GithubReposTableComponent),
    ],
    imports: [ReactiveFormsModule],
    providers: [{ provide: GithubHttpService, useValue: httpService }]
  });
};

describe('Component', () => {

  let driver: GithubReposContainerDriver;
  const httpService: Spy<GithubHttpService> = createSpyFromClass(GithubHttpService);

  Given(() => {
    driver = componentSetup(httpService);
  });

  describe('Initializing', () => {
    When(() => {
      driver.detectChanges();
    });

    Then('should be created', () => {
      expect(driver.componentInstance).toBeTruthy();
    });

    Then('should initialize list items', () => {
      expect(driver.componentInstance.githubRepos).toEqual([]);
    });

    Then('should have search field', () => {
      expect(driver.searchField).toBeTruthy();
    });

    Then('should initialize list items', () => {
      expect(driver.table).toBeTruthy();
    });
  });

  describe('Search happy path', () => {
    const mockResponse = { name: 'mockName' };

    Given(() => {
      httpService.getRepositoriesByName.and.nextOneTimeWith({
        total_count: 1,
        incomplete_results: true,
        items: [ mockResponse as any]
      });
    });

    When(fakeAsync(() => {
      driver.detectChanges();
      driver.componentInstance.search.setValue('angular');
      tick(300);
    }));

    Then('should call backend', () => {
      expect(httpService.getRepositoriesByName).toHaveBeenCalledTimes(1);
    });

    Then('should update the list', () => {
      expect(driver.componentInstance.githubRepos).toEqual([mockResponse as any]);
    });
  });
});
