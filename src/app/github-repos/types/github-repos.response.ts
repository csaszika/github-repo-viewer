import {GithubRepoItem} from './github-repo-item';

export interface GithubRepositories {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepoItem[];
}
