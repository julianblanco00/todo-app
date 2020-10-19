import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from '../components/components/components.component';
import { TasksListComponent } from '../components/components/tasks-list/tasks-list.component';

const routes: Routes = [
  { 
    path: 'components', 
    component: ComponentsComponent, 
    children:[
      { path: 'tasks-list', component: TasksListComponent},
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
