import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponentComponent} from './home-component/home-component.component';
import {AuthGuard} from './security/auth.guard';
import {LoginComponentComponent} from './login-component/login-component.component';
import { WorkAreaComponent } from './work-area/work-area.component';

const routes: Routes = [
  { path : '', component: HomeComponentComponent},
  { path : 'login', component : LoginComponentComponent },
  { path : 'work', component : WorkAreaComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
