import { Component, EventEmitter, Output } from '@angular/core';
import { IconSettings } from '../../../shared/ui/icons/settings';
import { IconEdit } from '../../../shared/ui/icons/edit';
import { IconDelete } from '../../../shared/ui/icons/delete';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [IconSettings, IconDelete, IconEdit],
})
export class MenuComponent {
  @Output() onEditContact = new EventEmitter<void>();

  @Output() onDeleteContact = new EventEmitter<void>();

  isOpen = false;

  openMenu() {
    this.isOpen = !this.isOpen;
  }
}