import { AppService } from './../app.service';
import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

import { MembersComponent } from './members.component';

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Router } from '@angular/router';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('MembersComponent', () => {
  let router: Router;
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembersComponent],
      imports: [HttpClientModule, HttpClientTestingModule, RouterModule],
      providers: [
        {
          AppService,
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  }));

  it('should create', () => {
      expect(component).toBeTruthy();
  });
  
  it('should navigate to /addmember after user calling goToAddMemberForm() to add new member', fakeAsync(() => {
    component.goToAddMemberForm();
    tick();
    expect(router.navigate).toHaveBeenCalledWith(['addmember']);
  }));
  
  it('editMemeber should be true after calling editMemberByID method', fakeAsync(() => {
    component.editMemberByID({}, 1);
    tick();
    expect(component.editMember).toBe(true);
  }));
  
  it('editMemeber should be false after calling backToMembers method', () => {
    component.backToMembers();
    expect(component.editMember).toBe(false);
  });
  
  it('editMemeber should be false after calling onSubmit method', fakeAsync(() => {
    component.onSubmit(1);
    tick();
    expect(component.editMember).toBe(false);
  }));
});
