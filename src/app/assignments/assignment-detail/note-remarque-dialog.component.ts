import { OnInit } from "@angular/core";
import { Component, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
    note: string;
    remarques: string;
  }

@Component({
    selector: 'note-remarque-dialog',
    templateUrl: './note-remarque-dialog.component.html',
  })
  
export class NoteRemarqueDialogComponent implements OnInit {
    userForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        public dialogRef: MatDialogRef<NoteRemarqueDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(): void {
        this.initForm();
    }

    onNoClick(): void {
        this.dialogRef.close(this.userForm.value);
    }

    initForm() {
        this.userForm = this.formBuilder.group({
          note: ['', [Validators.required, Validators.min(0), Validators.max(20) ]],
          remarques: ['', Validators.required]
        });
      }
}
