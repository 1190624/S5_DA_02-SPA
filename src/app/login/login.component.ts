import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpClient: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  LogUser(): void {
    this.document.location.href = "https://gestaoutilizadores.herokuapp.com/"
  }
}
