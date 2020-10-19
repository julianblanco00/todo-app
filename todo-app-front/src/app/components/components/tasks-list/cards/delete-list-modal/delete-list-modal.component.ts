import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-delete-list-modal',
  templateUrl: './delete-list-modal.component.html',
  styleUrls: ['./delete-list-modal.component.css']
})
export class DeleteListModalComponent implements OnInit {

  constructor(
              public dialogRef: MatDialogRef<DeleteListModalComponent>,
              @Inject(MAT_DIALOG_DATA) public list: any,
              private socket:Socket, 
              private service: CardsService
            ) {}

  ngOnInit(): void {
  }

  deleteList(){

    this.onNoClick()
    this.service.openSnackBar(`Deleting task ${this.list.title}`, '')

    this.socket.emit('deleteList', this.list, (cb:any) => {
      const deletedListEvent = new CustomEvent('deletedList', {detail: cb})
      dispatchEvent(deletedListEvent)
    })

  }

  onNoClick(){
    this.dialogRef.close();
  }

}
