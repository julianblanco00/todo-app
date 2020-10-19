import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksListComponent } from './tasks-list.component';

import { CardsService } from './cards.service';
import { CardsModule } from './cards/cards.module';

@NgModule({
  declarations: [
    TasksListComponent,
  ],
  imports: [
    CommonModule,
    CardsModule
  ],
  providers:[
    CardsService,
  ],
  exports: [
    TasksListComponent
  ]
})
export class TasksListModule { }
