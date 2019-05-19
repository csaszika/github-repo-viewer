import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, takeUntil} from 'rxjs/operators';
import {of, Subject} from 'rxjs';

import {GithubRepoItem} from '../../types/github-repo-item';
import {GithubRepositories} from '../../types/github-repos.response';
import {GithubHttpService} from '../../services/github-http.service';

@Component({
  selector: 'app-github-repos-container',
  templateUrl: './github-repos-container.component.html',
  styleUrls: ['./github-repos-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GithubReposContainerComponent implements OnInit, OnDestroy {

  search = new FormControl();
  githubRepos: GithubRepoItem[] = [];
  private readonly destroySubject$ = new Subject();

  constructor(private readonly service: GithubHttpService,
              private readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.search.valueChanges.pipe(
      filter((value: string) => !!value),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((search: string) => {
        return this.service.getRepositoriesByName(search).pipe(
          map((response: GithubRepositories) => response),
          catchError(() => of(null))
        );
      }),
      takeUntil(this.destroySubject$)
    ).subscribe((data: GithubRepositories) => {
      this.githubRepos = data.items;
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next();
    this.destroySubject$.complete();
  }
}
