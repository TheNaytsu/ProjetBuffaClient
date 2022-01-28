import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from 'src/app/shared/matiere';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Emitters} from "../../emitters/emitters";
import {HttpClient} from "@angular/common/http";

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
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  fourthFormGroup!: FormGroup;
  nomevent!: string;
  connecter = false;

  constructor(
    private assignmentService:AssignmentsService,
    private router:Router,
    private _formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8010/api/auth/user',{withCredentials: true}).subscribe(
      res =>{
        Emitters.authEmitter.emit(true);
        this.connecter = true;
      },
      err=>{
        Emitters.authEmitter.emit(false);
        this.connecter = false;
      }
    );
    this.firstFormGroup = this._formBuilder.group({
      nomDevoir: ["",Validators.required],
      nomAuteur: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      dateDeRendu: [Date,Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      matiere: ["",Validators.required]
    });
  }


  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.id = Math.round(Math.random()*100000000000);
    newAssignment.nom = this.firstFormGroup.value.nomDevoir
    newAssignment.dateDeRendu = this.secondFormGroup.value.dateDeRendu;
    newAssignment.rendu = false;
    newAssignment.auteur = this.firstFormGroup.value.nomAuteur
    newAssignment.matiere = new Matiere;
  if (this.thirdFormGroup.value.matiere == "Base de données") {
    newAssignment.matiere.nom = this.thirdFormGroup.value.matiere;
    newAssignment.matiere.prof = "assets/ProfBDD.jpg";
    newAssignment.matiere.imagematiere = "assets/BDD.png";
  } else if (this.thirdFormGroup.value.matiere == "Technologies Web") {
    newAssignment.matiere.nom = this.thirdFormGroup.value.matiere;
    newAssignment.matiere.prof = "assets/Buffa.jpg";
    newAssignment.matiere.imagematiere = "assets/angular.png";
  } else {
    newAssignment.matiere.nom = this.thirdFormGroup.value.matiere;
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
