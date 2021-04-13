import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';
import { Eleve } from './eleve.model';
import { forkJoin, Observable, of } from 'rxjs';
import { elevesData } from './elevesdata';



@Injectable({
  providedIn: 'root'
})
export class ElevesService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }
  
  uri = environment.apiUri+"/eleves";

  getEleves():Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.uri);
  }

  addEleve(eleve:Eleve):Observable<any> {
    return this.http.post(this.uri,eleve);
  }

  peuplerEleves() : Observable<any>{
    let appelsversAddEleve = [];
    elevesData.forEach((e) => {
      const nouvelEleve = new Eleve();
      nouvelEleve.id = e.id;
      nouvelEleve.nom = e.nom;

      appelsversAddEleve.push(this.addEleve(nouvelEleve));
    });
    return forkJoin(appelsversAddEleve);
  }

}
