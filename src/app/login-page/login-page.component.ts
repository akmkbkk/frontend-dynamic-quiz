import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { Login } from '../interfaces/login';
import { AuthService } from '../services/auth.service' ;
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  model: Login = {
    userid:"admin",password:"admin"
  };
  loginForm: FormGroup;  
  message: string;
  returnUrl:string;
  hideLogoutButtonOnHeader:boolean = true;

  constructor(private formBuilder: FormBuilder,private router:Router,private authService:AuthService) { 

  }

  ngOnInit(): void {

   this.loginForm = this.formBuilder.group({  
      userid: ['', Validators.required],  
      password: ['', Validators.required]  
   });

   this.returnUrl = '/home';  
   this.authService.logout();  

  }

  get f() { return this.loginForm.controls; }  

  login() {  
  
        // stop here if form is invalid  
        if (this.loginForm.invalid) {  
          console.log("Form is Invalid");
          return;  
        } else {  
          
          if (this.f['userid'].value == this.model.userid && this.f['password'].value == this.model.password) {  
              console.log("Login successful");  
              //this.authService.authLogin(this.model);  
              localStorage.setItem('isLoggedIn', "true");  
              localStorage.setItem('token', this.f['userid'].value);  
              this.router.navigate([this.returnUrl]);  
          }else {  
              this.message = "Please check your userid and password";  
          }  
        }  
   } 

}
