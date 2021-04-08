import { Component, OnInit } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Matiere } from 'src/app/shared/matiere.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  matieres:Matiere[];
  // Pour les champs du formulaire
  nom = '';
  auteur = '';
  dateDeRendu = null;
  @observable matiereId = null;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  durationInSeconds = 3;

  constructor(private _formBuilder: FormBuilder,private assignmentsService:AssignmentsService,
    private matiereService:MatieresService,private router:Router,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getMatieres();
    this.firstFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      date: ['', Validators.required],
      matiereId: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      auteur: ['', Validators.required]
    });
  }

  @computed get matiere() : Matiere {
    return this.matieres.find(m => m.id === this.matiereId);
  }

  openSnackBar(message: string, action: string) {
    let snackbar = this._snackBar.open(message, action, {
       duration: this.durationInSeconds * 1000,
       verticalPosition: 'bottom',
       horizontalPosition: 'center',
       panelClass: ["snackbar-style"]
    });

    snackbar.onAction().subscribe(() => {
      snackbar.dismiss();
    });
 }

  onSubmit(event) {
    if((!this.nom) || (!this.dateDeRendu) || (!this.matiereId)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.auteur = this.auteur;
    nouvelAssignment.rendu = false;
    nouvelAssignment.matiere = this.matieres.find(m => m.id === this.matiereId);

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
        this.openSnackBar("Devoir crée !","Fermer");
         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
  }

  getMatieres(){
    this.matiereService.getMatieres().subscribe(data => {
      console.log(data);
      this.matieres = data;
      console.log("données reçues");
    });

  }

}
