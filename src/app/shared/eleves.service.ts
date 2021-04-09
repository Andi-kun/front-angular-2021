import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';
import { Eleve } from './eleve.model';
import { forkJoin, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElevesService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }
  
  uri = environment.apiUri+"/eleves";

  getEleves():Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.uri);
  }
}
