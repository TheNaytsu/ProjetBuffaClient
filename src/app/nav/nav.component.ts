import {Component, OnInit} from '@angular/core';
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
  //url = "http://localhost:8010/api
  url ="https://projetbuffaserv.herokuapp.com/api/auth"
  ngOnInit(): void {
  }
  logout(): void{
    this.http.post(this.url+"/logout",{},{withCredentials:true})
      .subscribe(() => this.connecter = false)
  }

}
