import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';

import { AppService } from './app.service';

import { HttpClientModule } from '@angular/common/http';

describe("Service: AppService", () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [AppService]
      });
      // Returns a service with the MockBackend so we can test with dummy responses
      service = TestBed.get(AppService);
      // Inject the http service and test controller for each test
      httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
  });

  it('should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));
  
  it('expects service to fetch data', fakeAsync(() => {
      service.getTeams();
        // Expect a call to this URL
        const req = httpTestingController.expectOne(
          "http://localhost:3000/teams"
      );
      // // Assert that the request is a GET.
      expect(req.request.method).toEqual("GET");
      tick();
    }));

});
