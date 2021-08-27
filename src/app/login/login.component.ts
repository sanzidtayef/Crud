import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { Users } from '../Services/users';
import { TokenStorageService } from '../Services/token-storage.service';
import { EmpDashboardComponent } from '../emp-dashboard/emp-dashboard.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = false
  // loginForm!: FormGroup;
  loginModelObj : Users = new Users();
  loginData !: any;


  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  loading!: boolean;
  submitted!: boolean;
  userData: any;
  errorMessage: any
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];


  get f()
  {
      return this.loginForm.controls;
  }

  constructor(private api : ApiService, private router: Router, private auth : AuthService, private formbuilder: FormBuilder,) { }
  ngOnInit(): void {
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }

  clickLogin(){ 
    this.loginForm.reset();
  }

  loginUser(): void {
    if(this.loginForm.invalid){
      return;
    }
    this.auth.signIn(this.loginForm.value, this.loginModelObj.id)
    
  //   .subscribe(
  //     (userData: { accessToken: string; }) => {
  //     this.tokenStorage.saveToken(userData.accessToken);

  //     this.isLoginFailed = false;
  //     this.isLoggedIn = true;
  //     this.roles = this.tokenStorage.getUser().roles;
  //     this.reloadPage();
  // })
}
}