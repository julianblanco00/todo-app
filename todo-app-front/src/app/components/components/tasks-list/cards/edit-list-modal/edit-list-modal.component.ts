import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Socket } from 'ngx-socket-io';
import { CardsService } from '../../cards.service';

@Component({
  selector: 'app-edit-list-modal',
  templateUrl: './edit-list-modal.component.html',
  styleUrls: ['./edit-list-modal.component.css']
})
export class EditListModalComponent implements OnInit {

  editError:any
  oldName:any

  @ViewChild('inputName') inputName:ElementRef
  @ViewChild('textDescription') textDescription:ElementRef

  constructor(
              public dialogRef: MatDialogRef<EditListModalComponent>, @Inject(MAT_DIALOG_DATA) public listData:any,
              private service: CardsService, private socket: Socket
            ) {}

  ngOnInit(): void {
    this.oldName = this.listData.title
  }
  
  updateList(){

    const listName = this.inputName.nativeElement.value
    const listDescription = this.textDescription.nativeElement.value;

    if(listName.trim() == ''){

      this.editError = true

    }else{

      const obj = {
        title: listName.trim(),
        comment: listDescription,
        id: this.listData.id,
        oldName: this.oldName,
        tasks: this.listData.tasks
      }
      
      this.onNoClick()
  
      this.service.openSnackBar(`Updating list ${this.oldName}...`, '')
  
      this.socket.emit('updateList', obj, (cb:any) => {
  
        const updateList = new CustomEvent('updateList', {detail: cb})
        dispatchEvent(updateList)
  
      })

    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
