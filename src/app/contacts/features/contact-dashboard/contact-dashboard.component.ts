//El componente se marca con el decorador @Component y utiliza inject para obtener instancias 
//de servicios sin usar el constructor (una nueva característica en Angular).
import { Component, inject } from '@angular/core';
//Router: Angular Router se inyecta para manejar la navegación entre páginas (por ejemplo, 
//para editar un contacto).
import { Router } from '@angular/router';
//AsyncPipe: Se usa para gestionar observables de manera eficiente en las plantillas Angular.
import { AsyncPipe } from '@angular/common';

import { CardContactComponent } from '../../ui/card-contact/card-contact.component';
//ContactsService: Es el servicio que maneja las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para los contactos.
import { ContactsService } from '../../data-access/contacts.service';
import { Contact } from '../../shared/interfaces/contacts.interface';
import { SearchBarComponent } from '../../ui/search-bar/search-bar.component';
//Un operador de RxJS que crea un observable a partir de un valor.
import { of } from 'rxjs';

@Component({
  selector: 'app-contact-dashboard',
  templateUrl: './contact-dashboard.component.html',
  standalone: true,
  imports: [CardContactComponent, SearchBarComponent, AsyncPipe],
})

export default class ContactDashboardComponent {
  //Injección a contacts.service para poder acceder a sus métodos
  private _contactsService = inject(ContactsService);

  private _router = inject(Router);

  //contacts$: Es un observable que contiene la lista de contactos. Inicialmente, se asigna llamando 
  //a getContacts() desde ContactsService, lo que significa que está suscrito a los datos de la base 
  //de datos y los actualiza dinámicamente.
  contacts$ = this._contactsService.getContacts();

  /*
  Función: Este método elimina un contacto dado su id.
  Llamada asíncrona: Utiliza await para esperar la finalización de la llamada a deleteContact() 
  del servicio ContactsService.
  Manejo de errores: Usa un bloque try-catch para capturar y manejar posibles errores al eliminar 
  el contacto (aunque el catch está vacío en este caso, podría ser útil para manejar el error).
  */
  async deleteContact(id: string) {
    try {
      await this._contactsService.deleteContact(id);
    } catch (error) {}
  }

  /*
  Función: Este método navega a la ruta de edición de contacto, pasando el id del contacto como parte de la URL.
  Navegación: Usa el enrutador (_router) para redirigir al usuario a la ruta /dashboard/edit/:id, donde el 
  contacto será editado.
  */
  editContact(contact: Contact) {
    this._router.navigate(['/dashboard/edit', contact.id]);
  }

  /*
  Función: Permite buscar contactos filtrados por el nombre (query) y actualiza la lista de contactos mostrada.
  Llamada asíncrona: Utiliza await para esperar el resultado de searchContactByQuery() del servicio ContactsService.
  Actualizar la lista de contactos: La lista de contactos que se muestra (observable contacts$) se actualiza con 
  el resultado de la búsqueda. Se usa el operador of para convertir el resultado en un nuevo observable.
  */
  async changeQuery(query: string) {
    try {
      const contacts = await this._contactsService.searchContactByQuery(query);
      this.contacts$ = of(contacts);
    } catch (error) {}
  }
}