import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = 'Application de gestion des assignments';

  constructor(private authService:AuthService, 
              private router:Router,
              private assignmentsService:AssignmentsService,
              private snackBarService :SnackBarService) { }

  ngOnInit(): void {
  }

  async peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    let peuplerDBPromise = await this.assignmentsService.peuplerBDAvecForkJoin();
    peuplerDBPromise.subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        this.snackBarService.openSuccessSnackBar("Base de données peuplée !");
        this.router.navigate(["/home"], {replaceUrl:true});
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
