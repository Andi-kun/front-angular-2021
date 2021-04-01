import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http:HttpClient,public jwtHelper: JwtHelperService) {}

  login(login: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(environment.apiUri+'/auth', {login: login, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null && !this.jwtHelper.isTokenExpired());
  }

  isAdmin() : boolean{
    let token = localStorage.getItem('access_token');
    if(token){
      let user = this.jwtHelper.decodeToken(token);
      console.log(user.role);
      if(user.role === "admin") return true;
    }
    return false;
  }
}
