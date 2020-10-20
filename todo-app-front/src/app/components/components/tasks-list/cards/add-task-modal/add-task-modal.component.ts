import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css']
})
export class AddTaskModalComponent implements OnInit {

  @ViewChild('inputName') inputName:ElementRef
  @ViewChild('textDescription') textDescription:ElementRef
  @ViewChild('taskDate', {static: true}) taskDate:ElementRef

  addError:boolean

  constructor(public dialogRef: MatDialogRef<AddTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public listData:any,
    private service: CardsService,
    private socket: Socket) { }

  ngOnInit(): void {
  }

  async newTask(){

    const taskName = this.inputName.nativeElement.value;
    const taskDescription = this.textDescription.nativeElement.value;
    const taskDate = this.taskDate.nativeElement.value

    if(taskName.trim() == ''){

      this.addError = true

    }else{

      const obj = {
        name: taskName.trim(),
        description: taskDescription,
        date: taskDate,
        listId: this.listData.data.id
      }
  
      this.service.openSnackBar('Adding new task...', '')
      this.addTask(obj)
      
      this.onNoClick()
  
    }
    
  }

  addTask(data:any){

    this.socket.emit('addTask', data, (cb:any) => {

      this.service.closeSnackBar()
      this.service.openSnackBar(`New task created: ${data.name}`, 'Close')

      setTimeout(() => {
        this.service.closeSnackBar()
      }, 5000);
      
      const newTask = new CustomEvent('newTask', {detail: cb})
      dispatchEvent(newTask)
      
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

}


