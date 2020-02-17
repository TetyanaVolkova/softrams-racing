import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  api = 'http://localhost:3000';
  username: string;
  membersListener = new Subject();
  teamsListener = new Subject();

  constructor(private http: HttpClient) {}

  // Listener for members on change
  getMembersListener() {
    return this.membersListener.asObservable();
  }
    // Listener for teams
    getTeamssListener() {
      return this.teamsListener.asObservable();
    }

  // Returns all members
  getMembers() {
    this.http
    .get(`${this.api}/members`)
    .pipe(catchError(this.handleError))
    .subscribe(members => {
      this.membersListener.next(members);
    });
  }
  
    getTeams() {
      this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError)).subscribe(data => {
          this.teamsListener.next(data);
        });
    }

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm) {
    //Adding new member to database
    this.http
    .post('http://localhost:3000/members', memberForm)
    .subscribe(response => {
      this.membersListener.next(response);
    });
  }

  removeMember(memberId) {
    //Adding new member to database
    this.http
    .delete('http://localhost:3000/members/' + memberId)
    .subscribe(response => {
      this.membersListener.next(response);
    });
  }

  editMember( member, editingId) {
    this.http
    .put('http://localhost:3000/members/' + editingId, member)
    .subscribe(response => {
      this.membersListener.next(response);
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
