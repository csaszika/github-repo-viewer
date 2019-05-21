import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GithubReposRoutingModule} from './github-repos-routing.module';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule} from '@angular/material';
import {GithubReposContainerComponent} from './container/github-repos-container/github-repos-container.component';
import {GithubReposTableComponent} from './components/github-repos-table/github-repos-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [GithubReposTableComponent, GithubReposContainerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GithubReposRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class GithubReposModule { }
