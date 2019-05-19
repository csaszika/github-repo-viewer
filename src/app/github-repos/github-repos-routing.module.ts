import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GithubReposContainerComponent} from './container/github-repos-container/github-repos-container.component';

const routes: Routes = [
  {
    path: '',
    component: GithubReposContainerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubReposRoutingModule { }
