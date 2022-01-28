import {Component, OnInit} from '@angular/core';
import {Emitters} from "../emitters/emitters";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  connecter = false;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) =>{
        this.connecter = auth;
      });

  }
  logout(): void{
    this.http.post('http://localhost:8010/api/auth/logout',{},{withCredentials:true})
      .subscribe(() => this.connecter = false)
  }

}
