import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { assignmentsGeneres } from './data';
import { environment } from '../../environments/environment';
import { ElevesService } from './eleves.service';
import { MatieresService } from './matieres.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[];

  constructor(private loggingService:LoggingService, private http:HttpClient, private elevesService : ElevesService, private matieresService: MatieresService) { }

  uri = environment.apiUri+"/assignments";

  getAssignments():Observable<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri+"?page="+page + "&limit="+limit);
  }

  getAssignmentsRenduPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri+"?rendu=true&page="+page + "&limit="+limit);
  }

  getAssignmentsNonRenduPagine(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri+"?rendu=false&page="+page + "&limit="+limit);
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise():Promise<Assignment[]> {
    console.log("Dans le service de gestion des assignments...")
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id:number):Observable<Assignment> {
    //let assignementCherche = this.assignments.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Assignment>(this.uri + "/" + id)
    .pipe(
      tap(a => {
        console.log("TRACE DANS TAP : j'ai re??u " + a.nom);
      }),
      /*
      filter(a => {
        return (a.rendu)
      })
      */
      catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
    );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a ??chou?? ' + error.message);

      return of(result as T);
    };
  }

  generateRandomNumber(max : number):number {
    return Math.floor(Math.random()*max);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    assignment.id = this.generateRandomNumber(100000);
    //this.loggingService.log(assignment.nom, " a ??t?? ajout??");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajout?? !");*/

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // besoin de ne rien faire puisque l'assignment pass?? en param??tre
    // est d??j?? un ??l??ment du tableau

    //let index = this.assignments.indexOf(assignment);

    //console.log("updateAssignment l'assignment pass?? en param est ?? la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, " a ??t?? modifi??");

    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */


    this.loggingService.log(assignment.nom, " a ??t?? supprim??");

    return this.http.delete(this.uri + "/" + assignment._id);

  }

  peuplerBD() {
    assignmentsGeneres.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      if(a.rendu){
        nouvelAssignment.note = this.generateRandomNumber(21);
      }

      this.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);
      })
    })
  }

  // autre version qui permet de r??cup??rer un subscribe une fois que tous les inserts
  // ont ??t?? effectu??s
  async peuplerBDAvecForkJoin(): Promise<Observable<any>> {
    const appelsVersAddAssignment = [];
    let eleves = await this.elevesService.getEleves().toPromise();
    let matieres = await this.matieresService.getMatieres().toPromise();
    assignmentsGeneres.forEach((a) => {
      let eleveId = eleves[this.generateRandomNumber(eleves.length)]._id;
      let matiereId = matieres[this.generateRandomNumber(matieres.length)]._id;
      const nouvelAssignment = new Assignment();

      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.auteur = eleveId;
      nouvelAssignment.matiere = matiereId;
      if(a.rendu){
        nouvelAssignment.note = this.generateRandomNumber(21);
        nouvelAssignment.remarques = nouvelAssignment.note < 15 ? "Vous devez encore faire quelques efforts" : "Tr??s bon travail !";
      }
      
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }
}
