import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //private url = "https://gestaoutilizadores.herokuapp.com/api/auth/login";
  private url = "http://localhost:8080/api/auth/login";

  constructor(private httpClient: HttpClient) {}

  loginUser(email:string, password:string): Observable<any> {
    const body = {"Email": email, "Password": password}

    return this.httpClient.post(this.url,body).pipe(catchError(error => {
      if (error.status == 401) {
        alert('Inválido Email ou Password;');
      }
      
      return error;
    }))
  }
}
