import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit, OnDestroy {
  members = [];
  private subscription;
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

  editMemberByID(id: number) {}

  deleteMemberById(id: number) {}
}
