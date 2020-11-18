import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth-service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styles: [
  ]
})
export class LoginComponentComponent implements OnInit {

  constructor(private auth : AuthService,
    private route : Router) { }

  ngOnInit(): void {
  }

  login() {
    let username = "admin";
    this.auth.authenticateUser(username,"check").then((res)=>{
      if(res.headers["authorization"]){
       let tokenStr = "Bearer " + res.headers["authorization"];
       sessionStorage.setItem("token",tokenStr);
       sessionStorage.setItem("user",username);
       this.route.navigateByUrl('/work');
      }
    }).catch((err)=>{
     console.log("error : " +JSON.stringify(err,null,3));
     this.route.navigateByUrl("/login");
    });
  }

}
