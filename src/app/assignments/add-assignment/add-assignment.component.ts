import { Component, OnInit } from '@angular/core';
import { observable, computed } from 'mobx-angular';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Matiere } from 'src/app/shared/matiere.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { ElevesService } from 'src/app/shared/eleves.service';
import { Eleve } from 'src/app/shared/eleve.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  matieres:Matiere[];
  eleves:Eleve[];
  // Pour les champs du formulaire
  nom = '';
  @observable eleveId = null;
  dateDeRendu = null;
  @observable matiereId = null;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,private assignmentsService:AssignmentsService,
    private matiereService:MatieresService,private snackBarService : SnackBarService, private elevesService:ElevesService,private router:Router) {}

  ngOnInit() {
    this.getMatieres();
    this.getEleves();
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
    return this.matieres.find(m => m._id === this.matiereId);
  }

  @computed get eleve() : Eleve {
    return this.eleves.find(e => e._id === this.eleveId);
  }


  onSubmit(event) {
    if((!this.nom) || (!this.dateDeRendu) || (!this.matiereId) || (!this.eleveId)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.auteur = this.eleveId;
    nouvelAssignment.rendu = false;
    nouvelAssignment.matiere = this.matiereId;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
        this.snackBarService.openSuccessSnackBar("Devoir créé !");
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

  getEleves(){
    this.elevesService.getEleves().subscribe(data => {
      console.log(data);
      this.eleves = data;
      console.log("données reçues");
    });
  }

}
