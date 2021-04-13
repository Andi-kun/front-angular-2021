import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import { NoteRemarqueDialogComponent} from './note-remarque-dialog.component'
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment;
  userForm: FormGroup;
  note: string;
  remarques: string;

  constructor(
    private formBuilder: FormBuilder,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAssignmentById();
    // this.initForm();

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NoteRemarqueDialogComponent, {
      width: '250px',
      data: {name: this.note, animal: this.remarques}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Le dialog d\'ajout de note se ferme !');
      // this.note = result;
      if(result) {
        console.log(result);
        this.assignmentTransmis.note = result.note;
        this.assignmentTransmis.remarques = result.remarques;
        this.assignmentsService
          .updateAssignment(this.assignmentTransmis)
          .subscribe((reponse) => {
            console.log(reponse.message);
            this.assignmentTransmis.rendu = true;
            const message = "Assingnement rendu!";
            const action = "Fermer";
            this.openSnackBar(message, action);
            // et on navigue vers la page d'accueil qui affiche la liste
            // this.router.navigate(['/home']);
          });

        // this.assignmentTransmis = null;
      }
      else{
        this.assignmentTransmis.rendu = false;
      }
    
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu(event) {
    // console.log(event)
    // this.assignmentTransmis.rendu = true;
    this.openDialog()
    // this.assignmentsService
    //   .updateAssignment(this.assignmentTransmis)
    //   .subscribe((reponse) => {
    //     console.log(reponse.message);
    //     // et on navigue vers la page d'accueil qui affiche la liste
    //     // this.router.navigate(['/home']);
    //   });

    //this.assignmentTransmis = null;
  }

  onDelete() {
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.assignmentTransmis = null;

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: {
        nom:'Michel Buffa',
        metier:"Professeur",
        responsable:"MIAGE"
      },
      fragment:"edition"
    });
  }

  isAdmin() {
    return this.authService.isAdmin();
  }
}

