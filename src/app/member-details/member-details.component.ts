import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
// Import Member interface
import { Member } from './member.model';


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberModel: Member;
  submitted = false;
  alertType: String;
  alertMessage: String;
  private subscription;
  private membersCount: number;
  teams = [];
  memberForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    jobTitle: new FormControl(''),
    status: new FormControl(),
    team :new FormControl()
  });

  constructor(private fb: FormBuilder,
              private appService: AppService,
              private router: Router,
              private http: HttpClient
            ) {}

  ngOnInit() {
    this.appService.getTeams().subscribe(teams => (this.teams = teams));
    this.appService.getMembers();
    this.subscription = this.appService.membersListener.subscribe(members => {
      const membersArr = Object.keys(members).map(function(it) { 
        return members[it].length;
     })
     this.membersCount = membersArr.length;
     console.log(this.membersCount);
    });
  }

  //Redirecting back to members
  backToMembers() {
    this.router.navigate(['/members']);
  }

  // TODO: Add member to members
  onSubmit() {
    console.log(this.memberForm.value);
    
    this.memberModel = {
      id: +this.membersCount + 1,
      firstName: this.memberForm.value.firstName,
      lastName: this.memberForm.value.lastName,
      jobTitle: this.memberForm.value.jobTitle,
      team: this.memberForm.value.team,
      status: this.memberForm.value.status
    };
    //Posting new member to database
    this.http
    .post('http://localhost:3000/members', this.memberModel)
    .subscribe(response => {
      this.appService.membersListener.next(response);
    });
    this.router.navigate(['/members']);
  }
}
