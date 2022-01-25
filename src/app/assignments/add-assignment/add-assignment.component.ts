import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from 'src/app/shared/matiere';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {

  // associées au champs input du formulaire
  nomDevoir = "";
  dateDeRendu!:Date;
  nomAuteur ="";
  noteRecu =0;
  remarquesRecu ="";
  matiereAssignment = "";

  constructor(private assignmentService:AssignmentsService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random()*100000000000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur=this.nomAuteur;
    if(this.noteRecu <=20 && this.noteRecu >=0) {
      newAssignment.note = this.noteRecu;
    }
    newAssignment.remarques = this.remarquesRecu;
    newAssignment.matiere = new Matiere;
  if (this.matiereAssignment == "Base de données") {
    newAssignment.matiere.nom = this.matiereAssignment;
    newAssignment.matiere.prof = "assets/ProfBDD.jpg";
    newAssignment.matiere.imagematiere = "assets/BDD.png";
  } else if (this.matiereAssignment == "Technologies Web") {
    newAssignment.matiere.nom = this.matiereAssignment;
    newAssignment.matiere.prof = "assets/Buffa.jpg";
    newAssignment.matiere.imagematiere = "assets/angular.png";
  } else {
    newAssignment.matiere.nom = this.matiereAssignment;
    newAssignment.matiere.prof = "assets/profGrails.jpg";
    newAssignment.matiere.imagematiere = "assets/Grails.png";
  }
    console.log("ID = " + newAssignment.id);
    console.log("NOM = " + newAssignment.nom);
    console.log("DATE = " + newAssignment.dateDeRendu);
    console.log("AUTEUR = " + newAssignment.auteur);
    console.log("REMARQUES = " + newAssignment.remarques);
    console.log("NOTE = " + newAssignment.note);
    console.log("Matiere = " + newAssignment.matiere);
this.assignmentService.addAssignment(newAssignment)
.subscribe(reponse => {
  console.log(reponse.message);
  // maintenant il faut qu'on affiche la liste !!!
  this.router.navigate(["/home"]);
});
}
}
