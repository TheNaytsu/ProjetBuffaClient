import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatStepperModule} from '@angular/material/stepper';

import { AssignmentsComponent } from './assignments/assignments.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { Routes, RouterModule } from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav/nav.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

const routes:Routes = [
  {
    path:"",
    component: AssignmentsComponent
  },
  {
    path: 'login', component : LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path:"home",
    component: AssignmentsComponent
  },
  {
    path:"add",
    component: AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component: AssignmentDetailComponent
  },
  {
    path:"assignment/:id/edit",
    component: EditAssignmentComponent,
  },
];
@NgModule({
  declarations: [
    AppComponent,
    AssignmentsComponent,
    RenduDirective,
    AssignmentDetailComponent,
    AddAssignmentComponent,
    EditAssignmentComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule, MatIconModule, MatDividerModule,
        FormsModule, ReactiveFormsModule, MatInputModule, MatDatepickerModule,
        MatNativeDateModule, MatListModule, MatCardModule,
        MatCheckboxModule, MatSlideToggleModule, HttpClientModule,
        RouterModule.forRoot(routes), MatButtonToggleModule,MatTableModule,MatPaginatorModule,MatSortModule,MatStepperModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
