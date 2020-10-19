import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.css']
})
export class DeleteTaskModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTaskModalComponent>,
              @Inject(MAT_DIALOG_DATA) public task: any,
              private socket:Socket, private service: CardsService) {}

  ngOnInit(): void {
  }

  deleteTask(){

    this.onNoClick()
    this.service.openSnackBar(`Deleting task ${this.task.name}`, '')

    this.socket.emit('deleteTask', this.task, (cb:any) => {
      const deletedTaskEvent = new CustomEvent('deletedTask', {detail: cb})
      dispatchEvent(deletedTaskEvent)
    })
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
