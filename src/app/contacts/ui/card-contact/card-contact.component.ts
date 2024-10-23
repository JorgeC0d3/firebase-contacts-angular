import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../shared/interfaces/contacts.interface';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-card-contact',
  templateUrl: './card-contact.component.html',
  standalone: true,
  imports: [MenuComponent],
})
export class CardContactComponent {
  //Permite que el componente reciba datos desde su componente padre (en este caso, recibe un objeto Contact).
  //El signo de exclamación ! es un operador que le dice a TypeScript que contact no será null ni undefined al usarse
  @Input({ required: true }) contact!: Contact;
  //Permite que el componente emita eventos personalizados hacia el componente padre.
  @Output() editContact = new EventEmitter<Contact>();

  @Output() deleteContact = new EventEmitter<string>();

  //Recibe como parámetro el contacto completo y emite el evento editContact, enviando el objeto Contact 
  //al componente padre.
  onEditContact(contact: Contact) {
    this.editContact.emit(contact);
  }

  //Recibe el objeto contact, pero solo emite el id del contacto al componente padre.
  onDeleteContact(contact: Contact) {
    this.deleteContact.emit(contact.id);
  }
}