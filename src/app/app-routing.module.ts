import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ShellComponent} from './core/shell/shell.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {HomeComponent} from './core/home/home.component';

const routes: Routes = [
  { path: '', component: ShellComponent,
    children: [
      { path: 'home', component: HomeComponent},
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
