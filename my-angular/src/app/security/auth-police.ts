import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class AuthPolice implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (next) {
      if (req.headers.get("No-Auth") === "True") return next.handle(req.clone());

      if (localStorage.getItem("token") != null) {
        const clnReq = req.clone({
          headers: req.headers.set(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
          )
        });

        return next.handle(clnReq).pipe(catchError(err => {
          if (err.status === 401) {
            this.router.navigate(['/']);
          }
          return throwError(err.error.message || err.statusText);
        }));
      } else {
        this.router.navigate(["/"]);
      }
    }
  }
}
