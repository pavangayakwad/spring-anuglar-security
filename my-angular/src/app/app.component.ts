import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './security/auth-service';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular';
  greeting :any = {"id":7, "content": 'hello world'};

  constructor(private http : HttpClient,
              private router : Router,
              private authSvc : AuthService) {
    http.get('http://localhost:8080/api/home/data').subscribe(data=> this.greeting = data);
  }

  logout(){
  this.authSvc.Logout();
  this.router.navigateByUrl('/');
    // axios.post('http://localhost:8080/logout',{})
    // .then(res => this.router.navigateByUrl('/login'));
  }

}
