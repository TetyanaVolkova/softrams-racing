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

  constructor(private http: HttpClient) {}

  // Listener for members on change
  getMembersListener() {
    return this.membersListener.asObservable();
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

  setUsername(name: string): void {
    this.username = name;
  }

  addMember(memberForm) {}

  getTeams() {
    return this.http
      .get(`${this.api}/teams`)
      .pipe(catchError(this.handleError));
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
