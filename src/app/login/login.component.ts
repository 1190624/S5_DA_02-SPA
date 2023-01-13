import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  email: string;
  password: string;

  constructor(private httpClient: HttpClient,
    @Inject(DOCUMENT) private document: Document, 
    private service: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    this.service.loginUser(this.email, this.password).subscribe(val => {
      sessionStorage.setItem("Email", val.Email);
      sessionStorage.setItem("FirstName", val['First Name']);
      sessionStorage.setItem("Surname", val.Surname);
      sessionStorage.setItem("Role", val.roleDTO.Designation);

      this.router.navigate(['/dashboard']);
    });
  }


  showHidePassword() {
    this.hide = !this.hide;
  }
}
