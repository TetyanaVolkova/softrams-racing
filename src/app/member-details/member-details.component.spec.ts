import { AppService } from './../app.service';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { Location } from "@angular/common";

import { MemberDetailsComponent } from './member-details.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Bonus points!
describe('MemberDetailsComponent', () => {
  let location: Location;
  let router: Router;
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule
      ],
      providers: [
        HttpClient,
        FormBuilder,
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get teams from database', async(() => {
    let appService = fixture.debugElement.injector.get(AppService);
    let expectedResult = [
      {id: 1, teamName: "Formula 1 - Car 77"},
      {id: 2, teamName: "Formula 1 - Car 8"},
      {id: 3, teamName: "Formula 2 - Car 54"},
      {id: 4, teamName: "Formula 2 - Car 63"},
      {id: 5, teamName: "Deutsche Tourenwagen Masters - Car 117"},
      {id: 6, teamName: "Deutsche Tourenwagen Masters - Car 118"},
      {id: 7, teamName: "World Endurance Championship - Car 99"},
      {id: 8, teamName: "World Endurance Championship - Car 5"},
      {id: 9, teamName: "World Rally Championship - Car 77"},
      {id: 10, teamName: "World Rally Championship - Car 90"}
    ];
    appService.getTeams().subscribe((result) => {
      expect(result).toEqual(expectedResult);
    });
  }));
  
  it('should navigate to /members after user call to backToMembers()', fakeAsync(() => {
    component.backToMembers();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['/members']);
  }));
  
  it('should navigate to /members after submiting form', () => {
    component.onSubmit();
    setTimeout(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/members']);
    }, 200);
  });
});
