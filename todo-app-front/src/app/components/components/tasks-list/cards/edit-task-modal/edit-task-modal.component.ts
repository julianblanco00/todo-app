import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html',
  styleUrls: ['./edit-task-modal.component.css']
})
export class EditTaskModalComponent implements OnInit {

  addError:any

  taskName:any
  taskDesc:any
  taskDate:any

  oldName:any

  @ViewChild('inputName') inputName:ElementRef
  @ViewChild('textDescription') textDescription:ElementRef
  @ViewChild('taskDate', {static: true}) taskDateEl:ElementRef

  constructor(public dialogRef: MatDialogRef<EditTaskModalComponent>, @Inject(MAT_DIALOG_DATA) public taskData:any,
              private service: CardsService, private socket: Socket) { }

  ngOnInit(): void {
    this.taskName = this.taskData.name;
    this.oldName = this.taskName
    this.taskDesc = this.taskData.description;
    this.taskDate = this.taskData.date;
  }

  updateTask(){
    
    const taskName = this.inputName.nativeElement.value;
    const taskDescription = this.textDescription.nativeElement.value;
    let taskDate:any;

    (this.taskDateEl.nativeElement.value != '') ? taskDate = this.taskDateEl.nativeElement.value : taskDate = this.taskDate

    const obj = {
      name: taskName,
      description: taskDescription,
      date: taskDate,
      id: this.taskData.id,
      listId: this.taskData.listId,
      oldName: this.oldName
    }

    this.onNoClick()

    this.service.openSnackBar(`Updating task ${this.oldName}...`, '')

    this.socket.emit('updateTask', obj, (cb:any) => {

      const updateTask = new CustomEvent('updateTask', {detail: cb})
      dispatchEvent(updateTask)

    })
    
    return
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
