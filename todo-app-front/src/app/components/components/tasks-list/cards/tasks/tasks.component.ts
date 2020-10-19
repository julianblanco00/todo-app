import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardsService } from '../../cards.service';
import { DeleteTaskModalComponent } from '../delete-task-modal/delete-task-modal.component';
import { EditTaskModalComponent } from '../edit-task-modal/edit-task-modal.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  noTasksInList:boolean
  selectedTask:any

  @Input('list') list:any 
  @Input('tasks') tasks:any

  constructor(public dialog: MatDialog, private service: CardsService){ 
    this.addTask()
    this.updateTask()
  }

  ngOnInit(): void {
    if(!this.list.tasks.length) this.noTasksInList = true
  }

  editTask(){
    this.service.openModal(EditTaskModalComponent, this.tasks[this.selectedTask])
  }

  deleteTask(){
    this.service.openModal(DeleteTaskModalComponent, this.tasks[this.selectedTask])

    addEventListener('deletedTask', (data:any) => {
      const iList = this.list.tasks.indexOf(data.detail.id)
      iList !== -1 && this.list.tasks.splice( iList, 1);

      if(!this.list.tasks.length) this.noTasksInList = true

      delete this.tasks[data.detail.id] 

      this.service.closeSnackBar()

      this.service.openSnackBar(`Task ${data.detail.name} deleted`, 'Close')

      setTimeout(() => {
        this.service.closeSnackBar()
      }, 5000)

    })
  }

  addTask(){

    addEventListener('newTask', (data:any) => {
      
      const id = data.detail.id
      const task = data.detail.addedTask[id]

      this.list.tasks.push(id)
      this.tasks[id] = task
      
      this.noTasksInList = false
    })

  }

  updateTask(){

    addEventListener('updateTask', (data:any) => {

      this.service.closeSnackBar()
      this.service.openSnackBar(`Task ${data.detail.oldName} updated`, 'Close')

      setTimeout(() => {
        this.service.closeSnackBar()
      }, 5000);

      const id = data.detail.id;

      this.tasks[id] = data.detail
    })

  }

}
