import { TestBed } from '@angular/core/testing';

import { GithubHttpService } from './github-http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('GithubHttpService', () => {
  let service: GithubHttpService;
  let httpMock: HttpTestingController;

  Given(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubHttpService]
    });
    service = TestBed.get(GithubHttpService);
    httpMock = TestBed.get(HttpTestingController);
  });

  Then('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getRepositoriesByName', () => {
    const mockResponse = {
      incomplete_results: false,
      items: [{} as any, {} as any],
      total_count: 2
    };

    When(() => {
      service.getRepositoriesByName('mock').subscribe(data => {
        expect(data).toEqual(mockResponse);
      });
    });

    Then('should call search endpoint', () => {
      // there is a nicer solution but there is a bug https://github.com/angular/angular/issues/19974#issuecomment-342827258
      const request = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === `${service.url}search/repositories`;
      });
      request.flush(mockResponse);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
