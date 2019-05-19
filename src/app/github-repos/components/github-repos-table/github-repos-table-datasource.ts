import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material';
import {map} from 'rxjs/operators';
import {merge, Observable, of as observableOf} from 'rxjs';

import {GithubRepoItem} from '../../types/github-repo-item';

export interface GithubReposTableItem {
  name: string;
  id: number;
}

export class GithubReposTableDataSource extends DataSource<GithubReposTableItem> {

  constructor(public data: GithubRepoItem[],
              private paginator: MatPaginator) {
    super();
  }

  connect(): Observable<GithubRepoItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page
    ];

    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData([...this.data]);
    }));
  }

  disconnect() {}

  private getPagedData(data: GithubRepoItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
}
