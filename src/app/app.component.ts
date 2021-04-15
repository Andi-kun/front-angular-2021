import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Spinkit } from 'ng-http-loader';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu = true;
  spinnerStyle = Spinkit;
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)  
    ).subscribe((event: NavigationStart) => {
      this.showMenu = event.url !== '/login' && event.url !== '/';
    });
  }

}
