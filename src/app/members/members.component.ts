import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {
  memberForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    jobTitle: new FormControl(''),
    status: new FormControl(),
    team :new FormControl()
  });
  members = [];
  private subscription;
  editMember = false;
  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.getMembers();
    this.subscription = this.appService.membersListener.subscribe(members => {
      this.members = Object.keys(members).map(function(it) { 
        return members[it]
     })
     console.log(this.members);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  goToAddMemberForm() {
    this.router.navigate(['addmember']);
  }

  editMemberByID(id: number) {
    this.editMember = true;
  }

  deleteMemberById(id: number) {
    const confirmation = confirm("Are you sure you want to delete this member?");
    if(confirmation) {
      this.appService.removeMember(id);
    }
  }
  backToMembers() {
    this.editMember = false;
  }
}
