import { Component, OnInit ,Input} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:boolean;
  fname:any;
  lname:any;
  role:any;

  constructor(private router:Router,private authService: AuthService) { 
  }

  ngOnInit(): void {


    this.isLoggedIn = localStorage.getItem('isLoggedIn')=="true"? true:false;
    this.fname = localStorage.getItem('fname')?.toString();
    this.lname = localStorage.getItem('lname')?.toString();
    this.role = localStorage.getItem('role')?.toString();



    
  }

  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['']);  
  } 

}
