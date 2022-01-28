import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  //url = "http://localhost:8010/api
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:"",
      password:""
    })
  }

    submit(): void{
    this.http.post("https://projetbuffaserv.herokuapp.com/api/auth/login",this.form.getRawValue(),{
      withCredentials: true})
      .subscribe(() =>
      this.router.navigate(['/']));
    }
}
