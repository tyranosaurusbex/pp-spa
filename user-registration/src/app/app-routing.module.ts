import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [ { path: '', component: LandingComponent }, {path:'users', component: UserListComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
