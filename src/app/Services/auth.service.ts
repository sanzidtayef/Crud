import { Injectable } from '@angular/core';
import { Users } from './users';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = {};
  currentUserSubject: any;
  selectedUser: any;
  userData: any;
  endpoint: any;

  constructor(private http: HttpClient, private router: Router, private tokenStorage: TokenStorageService,) { }
  ngOnInit() {
  }
    //Sign-in
    signIn(data: any, id: number) {      
      this.http.get('http://localhost:3000/users/').subscribe(
        userData => {
          // console.log(userData);
          let email = data["email"];
          let password = data["password"];
          this.userData = userData;
          this.selectedUser = this.userData.filter((userPerson: { [x: string]: any; }) => userPerson["email"] === email && userPerson["password"] === password)

          console.log(this.selectedUser);

          if (this.selectedUser.length > 0) {
            // console.log("Hello");
            this.router.navigate(["/emp"])
            .then(() => {
              window.location.reload();
            });
          } else {
            // console.log("Not Hello");
            alert("email or password not found")
            this.router.navigate(['']);
          }
      })
    }
}
