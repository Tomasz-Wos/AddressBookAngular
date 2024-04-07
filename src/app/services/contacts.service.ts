import { Injectable, inject } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { HttpClient } from '@angular/common/http';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private apiUrl = "https://localhost:7067/Contacts/"
  private http = inject(HttpClient)
  
  contacts: Contact[] = [
    {id: 1, firstName: 'John', lastName: 'Johnson', phoneNumber: '111-111-1111', address: '111 Main St, Minneapolis, MN 55001'},
    {id: 2, firstName: 'Jack', lastName: 'Jackson', phoneNumber: '222-222-2222', address: '222 Main St, Minneapolis, MN 55001'},
    {id: 3, firstName: 'Mary', lastName: 'Erickson', phoneNumber: '333-333-3333', address: '333 Main St, Minneapolis, MN 55001'}
  ]

  APIContacts!: any

  constructor() { }

  getContacts(){
    // return this.contacts
    const url = this.apiUrl + 'AllContacts'
    
      this.http.get(url).subscribe({
        next: value => this.APIContacts = value,
        error: err => console.error('Observable emitted an error: ' + err),
        complete: () => console.log('Observable emitted the complete notification')
      })
      return this.APIContacts
  }

  createContact(newContact: Contact){
    
    // Finding highest Id
    let highestId = 0
    this.contacts.forEach(contactObject=>{
      if (contactObject.id > highestId)
       highestId = contactObject.id
    })

    this.contacts.push({
      id: highestId+1,
      firstName: newContact.firstName,
      lastName: newContact.lastName,
      phoneNumber: newContact.phoneNumber,
      address: newContact.address,
    })
  }

  updateContact(updateContact: Contact){
    const index = this.contacts.findIndex(contact => contact.id == updateContact.id )
    this.contacts[index].firstName=updateContact.firstName
    this.contacts[index].lastName=updateContact.lastName
    this.contacts[index].phoneNumber=updateContact.phoneNumber
    this.contacts[index].address=updateContact.address
  }

  deleteContact(contactId: number){
    const index = this.contacts.findIndex(contact => contact.id == contactId )
    this.contacts.splice(index, 1)
  }
}
