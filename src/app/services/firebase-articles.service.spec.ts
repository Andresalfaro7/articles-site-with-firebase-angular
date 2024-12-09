import { TestBed } from '@angular/core/testing';

import { FirebaseArticlesService } from './firebase-articles.service';

describe('FirebaseArticlesService', () => {
  let service: FirebaseArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
