import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { NonRenduDirective } from './shared/non-rendu.directive';
import { FormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssigmentComponent } from './assignments/edit-assigment/edit-assigment.component';
import { AuthGuard } from './shared/auth.guard';
import {AdminGuard } from './shared/admin.guard';
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { LoginComponent } from './authentication/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"",
    component:LoginComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    // idem avec  http://localhost:4200/home
    path:"home",
    component:AssignmentsComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"add",
    component:AddAssignmentComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent,
    canActivate : [AuthGuard]
  },
  {
    path:"assignment/:id/edit",
    component:EditAssigmentComponent,
    canActivate : [AuthGuard,AdminGuard]
  },
  { path: '**', redirectTo: 'home'}
]
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    NonRenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssigmentComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule, MatDividerModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatNativeDateModule, MatListModule, MatCardModule, MatCheckboxModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes), HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [environment.apiDomain],
        disallowedRoutes: [environment.apiUri+'/auth']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
