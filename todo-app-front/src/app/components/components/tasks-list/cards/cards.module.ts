import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

import { AddTaskModalComponent } from '../cards/add-task-modal/add-task-modal.component';
import { TasksComponent } from '../cards/tasks/tasks.component';
import { AddModalComponent } from '../cards/add-list-modal/add-list-modal.component';
import { CardsComponent } from '../cards/cards.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';
import { DeleteTaskModalComponent } from './delete-task-modal/delete-task-modal.component';
import { DeleteListModalComponent } from './delete-list-modal/delete-list-modal.component';
import { EditListModalComponent } from './edit-list-modal/edit-list-modal.component';

@NgModule({
  declarations: [
    CardsComponent,
    AddModalComponent,
    AddTaskModalComponent,
    TasksComponent,
    EditTaskModalComponent,
    DeleteTaskModalComponent,
    DeleteListModalComponent,
    EditListModalComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule
  ],
  exports:[
    CardsComponent,
    AddModalComponent,
    AddTaskModalComponent,
    TasksComponent
  ]
})
export class CardsModule { }
