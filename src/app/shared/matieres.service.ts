import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Matiere } from '../shared/matiere.model';
import { LoggingService } from './logging.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MatieresService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }
  
  uri = environment.apiUri+"/matieres";

  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }
}
