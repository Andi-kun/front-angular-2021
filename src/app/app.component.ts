import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
    if (this.router.url === '/login' || this.router.url === '/') {
        this.showMenu = false;
    }
  }

}
