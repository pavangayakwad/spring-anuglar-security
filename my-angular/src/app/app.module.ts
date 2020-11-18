import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthPolice} from './security/auth-police';
import {AuthGuard} from './security/auth.guard';
import { WorkAreaComponent } from './work-area/work-area.component';
import { AuthService } from './security/auth-service';

// const routes : Routes = [
//   {path: '', pathMatch:'full',redirectTo:'home'},
//   {path: 'home', component:HomeComponentComponent},
//   {path:'login', component: LoginComponentComponent}
// ];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    LoginComponentComponent,
    WorkAreaComponent
  ],
  imports: [
    //RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{provide : HTTP_INTERCEPTORS, useClass:AuthPolice, multi:true}, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
