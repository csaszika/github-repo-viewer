import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ShellComponent} from './frame/shell/shell.component';
import {PageNotFoundComponent} from './frame/page-not-found/page-not-found.component';
import {HomeComponent} from './frame/home/home.component';
import {MainRoutes} from './shared/routes';

const routes: Routes = [
  { path: '', component: ShellComponent,
    children: [
      { path: MainRoutes.HOME, component: HomeComponent},
      { path: MainRoutes.GITHUB_REPOS, loadChildren: './github-repos/github-repos.module#GithubReposModule'},
      { path: '', pathMatch: 'full', redirectTo: 'home'}
    ]
  },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
