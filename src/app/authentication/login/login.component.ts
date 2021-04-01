import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.authService.isAdmin());
    if(this.authService.loggedIn) this.router.navigate(["/home"]);
  }

  login(){
    this.authService.login(this.username,this.password).subscribe(
      result => this.router.navigate(["/home"]),
      err => this.error = "Login ou mot de passe incorrecte"
    );
  }

}
