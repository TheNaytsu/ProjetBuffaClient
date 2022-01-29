import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import {TokenStorageService} from "../../_services/token-storage.service";

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  assignmentTransmis?:Assignment;
  isLoggedIn = false;
  constructor(private assignmentService:AssignmentsService,
              private route:ActivatedRoute,
              private router:Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    console.log("DANS COMPOSANT DETAIL")
    this.getAssignment();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }

  getAssignment() {
    // on récupère l'id dans l'URL
    // le + force la conversion de string à number
    const id:number = +this.route.snapshot.params['id'];
    console.log("ID = " + id);
    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      this.assignmentTransmis = assignment;
      console.log(assignment)
    })

  }
  onAssignmentRendu() {
    this.assignmentTransmis!.rendu = true;
    if (this.assignmentTransmis) {
      this.assignmentService.updateAssignment(this.assignmentTransmis)
        .subscribe(reponse => {
          console.log(reponse.message);
          // on est dans le subscribe, on est sur que la base de données a été
          // mise à jour....
          this.router.navigate(["/home"]);
        })
      // PAS BON SI ICI car on n'a pas la garantie que les données ont été updatées
      // this.router.navigate(["/home"]);
    }
  }

  onDeleteAssignment() {
    if(this.assignmentTransmis) {
      this.assignmentService.deleteAssignment(this.assignmentTransmis)
      .subscribe(reponse => {
        console.log(reponse.message);

        // pour faire disparaitre la boite qui affiche le détail
        this.assignmentTransmis = undefined;

        // on affiche liste. Comme on est dans le subscribe, on est sur
        // que les données sont à jour et que l'assignment a été supprimé !
        this.router.navigate(["/home"]);
      })
    }
  }

  onClickEdit() {
    // correspond à /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    this.router.navigate(['/assignment', this.assignmentTransmis?.id, 'edit'],
                        {
                          queryParams: {
                            nom:'Soca',
                            prenom:'Yann'
                        },
                          fragment:'edit'
                      });
  }

  isAdmin() {
    var roles: string[] = [];
    var isAdmin = false;
    var user = this.tokenStorageService.getUser();
    roles = user.roles;
    isAdmin = roles.includes('ROLE_ADMIN');
    return isAdmin
  }
}
