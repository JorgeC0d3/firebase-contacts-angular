import { Component, Input, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

import { IconRocket } from '../../../shared/ui/icons/rocket';
import { IconBack } from '../../../shared/ui/icons/back';
import { ContactsService } from '../../data-access/contacts.service';
//ContactForm: Es una interfaz que define la estructura de los datos del formulario para un contacto.
import { ContactForm } from '../../shared/interfaces/contacts.interface';

//CreateForm: Esta interfaz define la estructura del formulario de contacto. 
//Cada campo es un FormControl que contiene un valor específico:

export interface CreateForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
  description?: FormControl<string | undefined>;
}

@Component({
  selector: 'app-contact-create',
  templateUrl: './contact-create.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, IconRocket, IconBack, RouterLink],
})
export default class ContactCreateComponent {
  //inject(FormBuilder): Inyecta el servicio FormBuilder que se utiliza para crear el formulario reactivo.
  private _formBuilder = inject(FormBuilder).nonNullable;

  private _router = inject(Router);

  //inject(ContactsService): Inyecta el servicio que se encarga de gestionar los contactos (creación, actualización, etc.).
  private _contactsService = inject(ContactsService);

  private _contactId = '';

  //Propiedad privada que almacena el ID del contacto. Se utiliza para diferenciar si estamos creando un nuevo contacto o 
  //editando uno existente.
  get contactId(): string {
    return this._contactId;
  }

  // Este es un setter que permite recibir un contactId desde el componente padre. Cuando se establece un valor, se llama a 
  //setFormValues() para llenar el formulario con los datos del contacto (si estamos en modo de edición).
  @Input() set contactId(value: string) {
    this._contactId = value;
    this.setFormValues(this._contactId);
  }

  //form: Es el formulario reactivo del componente. Utiliza FormBuilder para definir un grupo de controles (FormGroup), 
  //y se asegura de que todos los campos, excepto description, sean obligatorios.
  //Validaciones: Los campos fullName, email y phoneNumber son requeridos. Además, el campo email tiene una validación 
  //adicional para asegurarse de que el valor sea una dirección de correo válida (usando Validators.email).

  form = this._formBuilder.group<CreateForm>({
    fullName: this._formBuilder.control('', Validators.required),
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    phoneNumber: this._formBuilder.control('', Validators.required),
    description: this._formBuilder.control(''),
  });

  //Este método se llama cuando el usuario envía el formulario para crear o actualizar un contacto.
  async createContact() {
    if (this.form.invalid) return;
    //Si contactId está vacío (!this.contactId), el componente está en modo de creación, por lo que 
    //llama a createContact() del servicio de contactos.
    //Si contactId tiene un valor, el componente está en modo de edición y se llama a updateContact() 
    //del servicio de contactos con el ID del contacto.
    try {
      const contact = this.form.value as ContactForm;
      !this.contactId
        ? await this._contactsService.createContact(contact)
        : await this._contactsService.updateContact(this.contactId, contact);
      this._router.navigate(['/dashboard']);
    } catch (error) {
      // call some toast service to handle the error
    }
  }

  //Este método se usa para llenar el formulario con los valores de un contacto existente 
  //cuando estamos en modo de edición.
  //Obtención del contacto: Llama al método getContact(id) del servicio ContactsService para 
  //obtener los datos del contacto dado su ID.

  async setFormValues(id: string) {
    try {
      const contact = await this._contactsService.getContact(id);
      if (!contact) return;
      this.form.setValue({
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        description: contact.description,
      });
    } catch (error) {}
  }
}