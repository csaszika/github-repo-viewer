import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GithubRepositories} from '../types/github-repos.response';
import {AsyncSpyable} from 'jasmine-auto-spies';

@Injectable({
  providedIn: 'root'
})
export class GithubHttpService {

  readonly url = 'https://api.github.com/';
  private QUERY_PARAM = 'q';

  constructor(private http: HttpClient) { }

  @AsyncSpyable()
  getRepositoriesByName(name: string): Observable<GithubRepositories> {
    const options = { params: new HttpParams().set(this.QUERY_PARAM, name) };
    return this.http.get<GithubRepositories>(this.url + 'search/repositories', options);
  }
}
