import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksListModule } from './tasks-list/tasks-list.module';
import { ComponentsComponent } from './components.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TasksListModule,
    RouterModule
  ],
  exports: [
    TasksListModule,
    NavbarComponent
  ]
})
export class ComponentsModule { }
