import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { Login } from '../interfaces/login';
import { AuthService } from '../services/auth.service' ;
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthGuard } from '../guards/auth.guard';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  model: Login = {
    userid:"admin",password:"admin",
    role:"ADMIN",firstname:"ADMIN",lastname:"NIMDA"
  };
  loginFound: Login
  loginForm: FormGroup;  
  returnUrl:string;
  hideLogoutButtonOnHeader:boolean = true;
  errorMessage:string;

  constructor(
    private dataService:DataService,
    private formBuilder: FormBuilder,
    private router:Router,
    private authService:AuthService,
    private authGuard:AuthGuard) { 

  }

  ngOnInit(): void {


   this.loginForm = this.formBuilder.group({  
      userid: ['', Validators.required],  
      password: ['', Validators.required]  
   });

   if(this.authGuard.isLoggedIn()){
    this.router.navigate(['/home']); 
   }else{
    this.returnUrl = '/home';  
    this.authService.logout();  
   }



  }

  get f() { return this.loginForm.controls; }  

  login() {

        // stop here if form is invalid  
        if (this.loginForm.invalid) {  
          console.log("Form is Invalid");
          return;  
        } else {  

            this.dataService.doLoginCheck("checkLogin",this.f['userid'].value,this.f['password'].value).subscribe((data) => {
                var jsonData = JSON.stringify(data);
                var jsonObj = JSON.parse(jsonData);
                this.loginFound = jsonObj;
                if(this.loginFound === null){
                  this.errorMessage = "Invalid User Id or Password!";
                  console.log(this.errorMessage);
                  return;
                }else if(this.loginFound.userid == this.f['userid'].value){
                  console.log("Login successful");  
                  this.errorMessage = "";
                  //this.authService.authLogin(this.model);  
                  localStorage.setItem('isLoggedIn', "true");
                  localStorage.setItem('fname', this.loginFound.firstname);
                  localStorage.setItem('lname', this.loginFound.lastname);
                  localStorage.setItem('role',this.loginFound.role)
                  localStorage.setItem('token', this.f['userid'].value);  
                  this.router.navigate([this.returnUrl]);  
                }
          });
        }  
   } 

}
