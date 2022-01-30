import {Matiere} from 'src/app/shared/matiere'
export class Assignment {
  nom!:string;
  dateDeRendu!:Date;
  rendu!:boolean;
  auteur!:string;
  note!:number;
  remarques!:string;
  matiere!:Matiere;
  id!:number;
  _id!:string
}
