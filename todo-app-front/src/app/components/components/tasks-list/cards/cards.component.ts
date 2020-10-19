import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { AddModalComponent } from './add-list-modal/add-list-modal.component'
import { AddTaskModalComponent } from './add-task-modal/add-task-modal.component'
import { MatDialog } from '@angular/material/dialog';
import { CardsService } from '../cards.service';
import { DeleteListModalComponent } from './delete-list-modal/delete-list-modal.component';

export interface DialogData {
  id: string;
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit{

  @ViewChild(AddModalComponent) modalElem: AddModalComponent

  lists:any = []
  tasks:any = {}

  noLists:any

  selectedList:any
  
  constructor(private socket: Socket, public dialog: MatDialog, private service: CardsService) {
    this.addList()
  }

  ngOnInit(){
    this.getLists()
  }

  getLists(){
    this.socket.emit('getLists', (response:any) => {

      if (!response.lists.length){
        this.noLists = 'true'
      }else{
        this.noLists = 'false'
        this.lists = response.lists
        this.tasks = response.tasks
      }     
    })
  }

  openAddTaskModal(list:any){
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '250px',
      data: {data: list}
    })

    dialogRef.afterClosed().subscribe();
  }

  openAddListModal(): void {
    const dialogRef = this.dialog.open(AddModalComponent, {
      width: '250px',
      data: {type: 'addList'}
    })

    dialogRef.afterClosed().subscribe();
  }

  addList(){
    addEventListener('newList', (evt:any) => {
      this.noLists = 'false'

      this.socket.emit('addList', evt.detail, (cb:any) => {
        
        this.service.closeSnackBar()
        this.service.openSnackBar(`New list created: ${cb.title}`, 'Close')

        setTimeout(() => {
          this.service.closeSnackBar()
        }, 5000)

        this.lists.push(cb)
      })

    })
  }

  editList(){

  }

  deleteList(){
    this.service.openModal(DeleteListModalComponent, this.selectedList)

    addEventListener('deletedList', (data:any) => {

      const list = this.lists.map((e:any) => {
        return e.id
      }).indexOf(data.detail.id)

      list !== -1 && this.lists.splice( list, 1);
      
      if(!this.lists.length) this.noLists = 'true'

      this.service.closeSnackBar()
      this.service.openSnackBar(`Task ${data.detail.title} deleted`, 'Close')

      setTimeout(() => {
        this.service.closeSnackBar()
      }, 5000)

    })
  }

}