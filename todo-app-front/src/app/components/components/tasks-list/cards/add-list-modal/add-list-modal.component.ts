import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CardsService } from '../../cards.service';
import { DialogData } from '../cards.component';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-list-modal.component.html',
  styleUrls: ['./add-list-modal.component.css']
})
export class AddModalComponent implements OnInit{

  @ViewChild('inputName', {static:false}) input: ElementRef
  @ViewChild('textComment', {static:false}) comment: ElementRef

  title:any
  info:any
  name:any
  commentPH:any

  addError:boolean

  constructor(
    public dialogRef: MatDialogRef<AddModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: CardsService) {
    }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  validateData(){

    let name = this.input.nativeElement.value
    let comment = this.comment.nativeElement.value

    name = name.trim()

    if(name == ''){

      this.addError = true

    }else{

      this.onNoClick()

      const obj = {
        title: name,
        comment: comment,
        tasks: []
      }

      this.service.openSnackBar('Adding new list...', '')

      const newListEvt = new CustomEvent('newList', {detail: obj})
      dispatchEvent(newListEvt)
    }

  }

}
