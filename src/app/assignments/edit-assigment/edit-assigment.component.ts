import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { observable, computed } from 'mobx-angular';
import { Eleve } from 'src/app/shared/eleve.model';
import { Matiere } from 'src/app/shared/matiere.model';
import { MatieresService } from 'src/app/shared/matieres.service';
import { ElevesService } from 'src/app/shared/eleves.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;
  matieres:Matiere[];
  eleves:Eleve[];

  // pour le formulaire
  nom = "";
  dateDeRendu = null;
  @observable eleveId = null;
  @observable matiereId = null;
  note = null;
  remarques = "";

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private assignmentsService: AssignmentsService,
    private matiereService:MatieresService,
    private elevesService:ElevesService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBarService :SnackBarService
  ) {}

  @computed get matiere() : Matiere {
    return this.matieres.find(m => m._id === this.matiereId);
  }

  @computed get eleve() : Eleve {
    return this.eleves.find(e => e._id === this.eleveId);
  }

  ngOnInit(): void {
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

    this.thirdFormGroup = this._formBuilder.group({
      note : ['', [Validators.min(0),Validators.max(20)]],
      remarques : [''],
    });

    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignmentById();
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

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;

      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.eleveId = assignment.auteur._id;
      this.matiereId = assignment.matiere._id;
      this.note = assignment.note;
      this.remarques = assignment.remarques;
    });
  }


  onSubmit(event) {
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu) || (!this.matiereId) || (!this.eleveId)) return;

    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignment.auteur = this.eleveId;
    this.assignment.matiere = this.matiereId;
    this.assignment.note = +this.note;
    this.assignment.remarques = this.remarques;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);
        this.snackBarService.openSuccessSnackBar("Devoir modifié !");
        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }
}
