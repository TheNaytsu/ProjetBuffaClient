import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment?:Assignment;
  // champs du formulaire
  nomAssignment?:string;
  dateDeRendu?:Date;
  noteAssignment!:number;
  auteurAssignment?:string;
  remarquesAssignment?:string;
  matiereAssignment?:any;
  notealert = false;

  constructor(private route:ActivatedRoute,
              private router:Router,
              private assignmentService:AssignmentsService) { }

  ngOnInit(): void {
    // exemple de récupération de "query params" et "fragment"
    // exemple d'URL : /assignment/1/edit?nom=Buffa&prenom=Michel#edit
    console.log("QUERY PARAMS : ");
    console.log(this.route.snapshot.queryParams);
    console.log("FRAGMENT : ");
    console.log(this.route.snapshot.fragment);

    this.getAssignment();
  }

  getAssignment() {
    // récupère l'id dans l'URL
    const id:number = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id)
    .subscribe(assignment => {
      // Pour que la "vue" affiche les informations
      // de l'assignment qu'on édite....
      this.assignment = assignment;
      // pré-remplit le formulaire dès l'affichage
      this.nomAssignment = assignment?.nom;
      this.dateDeRendu = assignment?.dateDeRendu;
      this.noteAssignment = assignment!.note;
      this.auteurAssignment = assignment?.auteur;
      this.remarquesAssignment = assignment?.remarques;
      this.matiereAssignment = assignment?.matiere.nom;
    })
  }

  onSaveAssignment() {
    if (!this.assignment) return;

    if (this.nomAssignment) {
      this.assignment.nom = this.nomAssignment;
    }
    if (this.dateDeRendu) {
      this.assignment.dateDeRendu = this.dateDeRendu;
    }
    if (this.noteAssignment) {
      if(this.noteAssignment <=20 && this.noteAssignment >=0) {
        this.assignment.note = this.noteAssignment;
      }
    }
    if (this.auteurAssignment) {
      this.assignment.auteur = this.auteurAssignment;
    }
    if (this.remarquesAssignment) {
      this.assignment.remarques = this.remarquesAssignment;
    }
    if (this.matiereAssignment) {
      if(this.matiereAssignment == "Base de données"){
        this.assignment.matiere.nom = this.matiereAssignment;
        this.assignment.matiere.prof ="assets/ProfBDD.jpg";
        this.assignment.matiere.imagematiere = "assets/BDD.png";
      }
      else if(this.matiereAssignment == "Technologies Web"){
        this.assignment.matiere.nom = this.matiereAssignment;
        this.assignment.matiere.prof ="assets/Buffa.jpg";
        this.assignment.matiere.imagematiere = "assets/angular.png";
      }
      else{
        this.assignment.matiere.nom = this.matiereAssignment;
        this.assignment.matiere.prof ="assets/profGrails.jpg";
        this.assignment.matiere.imagematiere = "assets/Grails.png";
      }
    }
    this.assignmentService
      .updateAssignment(this.assignment)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // navigation vers la home page
        this.router.navigate(['/home']);
      });

  }
  note() {
    console.log(this.noteAssignment)
    if (0>this.noteAssignment|| this.noteAssignment>20) {
      this.notealert = true;
    }
  }
 }
