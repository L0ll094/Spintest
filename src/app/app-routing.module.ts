import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { NavigatorPageComponent } from './navigator-page/navigator-page.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {FindQComponent} from './find-q/find-q.component';
import {MeetCriteriaComponent} from './meet-criteria/meet-criteria.component';
import {FindCapacityComponent} from './find-capacity/find-capacity.component';
import {FindSpintimesComponent} from './find-spintimes/find-spintimes.component';


const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'input-form', component: InputFormComponent},
  {path: 'navigator-page', component: NavigatorPageComponent},
  {path: 'find-q',component: FindQComponent},
  {path: 'meet-criteria',component: MeetCriteriaComponent},
  {path: 'find-capacity', component: FindCapacityComponent},
  {path: 'find-spintimes', component: FindSpintimesComponent},
  {path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
