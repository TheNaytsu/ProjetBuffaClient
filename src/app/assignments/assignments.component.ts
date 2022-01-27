import { Component, OnInit,AfterViewInit,ViewChild } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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
export class AssignmentsComponent implements OnInit, AfterViewInit {
  assignments: Assignment[] = [];
  // pour la pagination
  page: number = 1;
  limit: number = 10;
  totalDocs: number = 0;
  filtrerR : String = "lesdeux";
  totalPages: number = 0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean = false;
  nextPage: number = 0;
  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu','detail'];
  dataSource: MatTableDataSource<Assignment>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private assignmentService: AssignmentsService) {
    const data = this.assignments
    this.dataSource = new MatTableDataSource(data);
  }

  ngOnInit(): void {
    this.getAssignments();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filterPredicate)

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAssignments() {
    this.assignmentService.getAssignmentsPagine(this.page, this.limit, this.filtrerR).subscribe((data) => {
      this.assignments = data.docs;
      this.dataSource = new MatTableDataSource(this.assignments);
    });
  }

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  // pagination
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

  changeLimit() {
    this.getAssignments();
  }

}
