import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';


@Injectable({
  providedIn: 'root'
})

export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private loggingService:LoggingService,
              private http:HttpClient) { }

  url = "http://localhost:8080/api/assignments";
  //url = "https://projetbuffaserv.herokuapp.com/api/assignments";

  getAssignmentsPagine(page:number, limit:number, filtrerR:String, champs:string):Observable<any> {
    if(filtrerR == "nonrendu") {
      return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}&filtrerR=${filtrerR}&champs=${champs}`)
    }
    else if(filtrerR=="rendu"){
      return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}&filtrerR=${filtrerR}&champs=${champs}`);
    }
    else{
      return this.http.get<any>(`${this.url}?page=${page}&limit=${limit}&champs=${champs}`);
    }
  }

  getAssignment(id:any):Observable<Assignment|undefined> {
    //let assignment = this.assignments.find(elem => elem.id === id);

    //return of(assignment);
    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment:Assignment):Observable<any>{
    //this.assignments.push(assignment);

    this.loggingService.log(assignment.nom, "ajouté");

    //return of(`Assignment ${assignment.nom} ajouté`);

    return this.http.post<Assignment>(this.url, assignment);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    // pour le moment rien de spécial à faire
    // mais plus tard -> requête PUT sur un web service
    // pour mettre à jour une BD distante...

    //return of(`Assignment ${assignment.nom} modifié`);
    return this.http.put<Assignment>(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {

    //const pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);

    //return of(`Assignment ${assignment.nom} supprimé`);
    console.log(assignment.id)
    return this.http.delete(this.url + "/" + assignment.id);
  }

  // version naive qui ne renvoie rien
  // on en peut pas savoir quand tous les add auront été faits

  // version non naïve

}
