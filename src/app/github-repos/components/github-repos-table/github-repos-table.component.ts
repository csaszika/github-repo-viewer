import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';

import {GithubReposTableDataSource} from './github-repos-table-datasource';
import {GithubRepoItem} from '../../types/github-repo-item';
import {fadeInAnimation} from '../../../shared/animations';

@Component({
  selector: 'app-github-repos-table',
  templateUrl: './github-repos-table.component.html',
  styleUrls: ['./github-repos-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInAnimation],
})
export class GithubReposTableComponent implements OnChanges {
  @Input() githubRepos: GithubRepoItem[] = [];

  @Output() rowClick = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: GithubReposTableDataSource;

  displayedColumns = ['name', 'description', 'language', 'stargazers_count', 'open_issues', 'url'];

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new GithubReposTableDataSource(this.githubRepos, this.paginator);
  }


  onRowClick(rowId: number): void {
    this.rowClick.emit(rowId);
  }
}
