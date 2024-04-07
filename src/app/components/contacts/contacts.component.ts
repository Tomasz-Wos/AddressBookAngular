import { MatDialog } from '@angular/material/dialog';
import { Contact } from '../../interfaces/contact';
import { ContactsService } from './../../services/contacts.service';
import { Component, inject } from '@angular/core';
import { UpdateDialogComponent } from '../../dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  private route = inject(ActivatedRoute)
  protected id!: string
  private contactsService = inject(ContactsService)

  contactsDataArray: Contact[] = []
  dataSource = new MatTableDataSource<Contact>()

  columnsToDisplay = ['FirstName', 'LastName', 'PhoneNumber', 'Address', 'Update', 'Delete'];

  constructor(private dialog: MatDialog){
  }

  ngOnInit(): void {
    this.contactsDataArray= this.contactsService.getContacts()
    this.dataSource = new MatTableDataSource<Contact>(this.contactsDataArray)
  }

  onUpdate(contact: Contact) {
    let dialogRef = this.dialog.open(UpdateDialogComponent, {
      height: '500px',
      width: '500px',
      data: contact
    });
  }

  onDelete(contact: Contact){
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '500px',
      width: '500px',
      data: contact
    })
    dialogRef.afterClosed().subscribe(result => {
      this.updateDataSource(this.contactsDataArray)
    });
  }

  updateDataSource(dataArray: Contact[]){
    this.dataSource.connect().next(dataArray)
  }
}
