import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {PageEvent} from "@angular/material/paginator";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "../_services/token-storage.service";

export interface PeriodicElement {
  nom: string;
  id: number;
  dateDeRendu: Date;
  detail:any;

}

const ELEMENT_DATA: PeriodicElement[] = [

];

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  // pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  filtrerR : String = "lesdeux";
  totalPages: number = 0;
  prevPage: number = 0;
  nextPage: number = 0;
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu','detail'];
  champs: string = '';
  isLoggedIn = false;

  constructor(
    private assignmentService: AssignmentsService,
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {

  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.getAssignments()
  }

  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.filtrerR, this.champs).subscribe((data) => {
      this.assignments = data.docs;
      this.page=data.page;
      this.limit =data.limit;
      this.totalPages=data.totalPages;
      this.totalDocs=data.totalDocs;
    });

  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage;
      this.getAssignments();
  }

  paginationChange(pe:PageEvent){
    this.page = pe.pageIndex+1
    this.limit =pe.pageSize
    this.getAssignments()
  }

}
