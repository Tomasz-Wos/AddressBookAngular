import { Contact } from '../../interfaces/contact';
import { ContactsService } from './../../services/contacts.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

  contactsDataArray: Contact[] = []
  columnsToDisplay = ['FirstName', 'LastName', 'PhoneNumber', 'Address', 'Update', 'Delete'];

  constructor(private contactsService: ContactsService){

  }

  ngOnInit(): void {
    this.contactsDataArray = this.contactsService.getContacts()
    console.log(this.contactsDataArray)
  }
}
