import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ShellComponent} from './frame/shell/shell.component';
import {PageNotFoundComponent} from './frame/page-not-found/page-not-found.component';
import {HomeComponent} from './frame/home/home.component';

const routes: Routes = [
  { path: '', component: ShellComponent,
    children: [
      { path: 'home', component: HomeComponent},
      { path: 'github-repos', loadChildren: './github-repos/github-repos.module#GithubReposModule'},
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
