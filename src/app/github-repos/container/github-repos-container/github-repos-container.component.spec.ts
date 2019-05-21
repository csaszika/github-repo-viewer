import {componentTestingSetup} from 'angular-unit-component-driver';
import {GithubReposContainerComponent} from './github-repos-container.component';
import {GithubReposContainerDriver} from './github-repos-container.driver';
import {MockComponent} from 'ng-mocks';
import {MatFormField, MatInput, MatLabel, MatSpinner} from '@angular/material';
import {GithubReposTableComponent} from '../../components/github-repos-table/github-repos-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {GithubHttpService} from '../../services/github-http.service';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {fakeAsync, tick} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';

const componentSetup = (httpService: Spy<GithubHttpService>, mockRouter: any, mockRoute: any): GithubReposContainerDriver => {
  return componentTestingSetup({
    componentClass: GithubReposContainerComponent,
    driver: GithubReposContainerDriver,
    declarations: [
      MockComponent(MatFormField),
      MockComponent(MatInput),
      MockComponent(MatLabel),
      MockComponent(MatSpinner),
      MockComponent(GithubReposTableComponent),
    ],
    imports: [ReactiveFormsModule],
    providers: [
      { provide: GithubHttpService, useValue: httpService },
      { provide: Router, useValue: mockRouter },
      { provide: ActivatedRoute, useValue: mockRoute },
    ],
  });
};

describe('Component', () => {

  let driver: GithubReposContainerDriver;
  const httpService: Spy<GithubHttpService> = createSpyFromClass(GithubHttpService);
  const mockRouter = { navigate: jasmine.createSpy('navigate') };
  const mockRoute = { url: 'mock' };

  Given(() => {
    driver = componentSetup(httpService, mockRouter, mockRoute);
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

    Then('should call backend and update list', () => {
      expect(httpService.getRepositoriesByName).toHaveBeenCalledTimes(1);
      expect(driver.componentInstance.githubRepos).toEqual([mockResponse as any]);
    });
  });

  describe('On row click catching', () => {
    const githubRepo1 = { id: 'mock1'} as any;

    Given(() => {
      driver.componentInstance.githubRepos = [githubRepo1];
    });

    When(() => {
      driver.detectChanges();
      driver.componentInstance.onRowClick(githubRepo1.id);
    });

    Then(() => {
      expect(mockRouter.navigate).toHaveBeenCalledWith([`./${githubRepo1.id}`], { relativeTo: mockRoute });
    });
  });
});
