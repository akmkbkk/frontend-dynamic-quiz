import { Injectable } from '@angular/core';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  logout() :void {    
    localStorage.setItem('isLoggedIn','false');    
    localStorage.removeItem('token');  
    localStorage.removeItem('fname');
    localStorage.removeItem('lname');
    localStorage.removeItem('role');  
  }  
}
