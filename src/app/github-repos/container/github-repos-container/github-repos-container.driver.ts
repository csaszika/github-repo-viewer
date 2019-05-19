import {ComponentDriver} from 'angular-unit-component-driver';
import {GithubReposContainerComponent} from './github-repos-container.component';
import {MatFormField} from '@angular/material';
import {GithubReposTableComponent} from '../../components/github-repos-table/github-repos-table.component';

export class GithubReposContainerDriver extends ComponentDriver<GithubReposContainerComponent>{

  get searchField(): MatFormField {
    return this.queryDirective(MatFormField);
  }

  get table(): GithubReposTableComponent {
    return this.queryDirective(GithubReposTableComponent);
  }
}
