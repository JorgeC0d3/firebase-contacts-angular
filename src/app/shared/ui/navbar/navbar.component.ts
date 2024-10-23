import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconContact } from '../icons/contact';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [IconContact, RouterLink],
})
export class NavbarComponent {}