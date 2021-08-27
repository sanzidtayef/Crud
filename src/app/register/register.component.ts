import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from '../Services/api.service';
import { AuthService } from '../Services/auth.service';
import { Users } from '../Services/users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isLogin: boolean = false
  errorMessage: any
  signinModelObj : Users = new Users();
  signinData !: any;

  get f()
  {
      return this.signinForm.controls;
  }

  signinForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(6)])
    // confirmpassword : new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private formbuilder: FormBuilder, private api : ApiService, private auth : AuthService, private router : Router) { }

  ngOnInit(): void {
    // this.isUserLogin();
  }
  clickSignin(){
    this.signinForm.reset();
  }

  // registerUser() {
  //   this.auth.signUp(this.signinForm.value).subscribe((users) => {
  //     if (users.result) {
  //       this.signinForm.reset()
  //       this.router.navigate(['']);
  //     }
  //   })
  // }
  // onSubmit() {
  //   console.log('Your form data : ', this.signinForm.value);
  //   this.api.postTypeRequest('user/register', this.signinForm.value).subscribe((res: any) => {
  //   if (res.status) {
  //   console.log(res)
  //   this.auth.setDataInLocalStorage('users', JSON.stringify(res.data));
  //   this.auth.setDataInLocalStorage('token', res.token);
  //   this.router.navigate(['']);
  //   } else {
  //   console.log(res)
  //   alert(res.msg)
  //   }
  //   }, err => {
  //   this.errorMessage = err['error'].message;
  //   });
  //   }
  //   isUserLogin(){
  //   if(this.auth.getUserDetails() != null){
  //   this.isLogin = true;
  //   }
  //   }

  onSignin(){
    if(this.signinForm.invalid){
      return;
    }
    console.log(this.signinForm.value);
    this.api.postUser(this.signinForm.value).pipe(
      map(event => this.router.navigate(['/']))
      ).subscribe(event=>{
      console.log(event);
      alert("User Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.signinForm.reset();
      this.router.navigate([""])
        .then(() => {
        window.location.reload();
      });
    },
    err=>{
      alert("Somehing went wrong")
    })
  }

}