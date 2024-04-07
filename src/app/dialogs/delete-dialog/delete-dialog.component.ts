import { Component, Inject } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { FormGroup, FormControl} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  contactToDelete!: Contact
  idToDelete!: number

  deleteForm = new FormGroup({
    firstName: new FormControl({value: '', disabled: true}),
    lastName: new FormControl({value: '', disabled: true}),
    phoneNumber: new FormControl({value: '', disabled: true}),
    address: new FormControl({value: '', disabled: true}),
  });

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Contact, private contactService: ContactsService){
    this.contactToDelete = data
  }

  ngOnInit(): void {
    this.deleteForm.controls['firstName'].setValue(this.contactToDelete.firstName)
    this.deleteForm.controls['lastName'].setValue(this.contactToDelete.lastName)
    this.deleteForm.controls['phoneNumber'].setValue(this.contactToDelete.phoneNumber)
    this.deleteForm.controls['address'].setValue(this.contactToDelete.address)
  }

  onSubmit(){
    let contactId = this.contactToDelete.id
    this.contactService.deleteContact(contactId)
    console.log(this.contactService.getContacts())
    this.dialogRef.close()
  }
}
