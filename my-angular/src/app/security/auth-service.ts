import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import axios from 'axios';
import { Observable } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class AuthService {
  constructor(private http :HttpClient) {}

   authenticateUser = (username:string, password : string) => {
     return axios.post('http://localhost:8080/login', {username,password});
  }

  isLoggedIn = () => {
    return sessionStorage.getItem("token") !== null;
  }

  Logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }
}
