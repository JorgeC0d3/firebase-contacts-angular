import {
  Component,
  EventEmitter,
  Output,
  computed,
  effect,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { IconPlus } from '../../../shared/ui/icons/plus';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html' ,
  standalone: true,
  imports: [IconPlus, ReactiveFormsModule, RouterLink],
})
export class SearchBarComponent {
  @Output() changeQuery = new EventEmitter<string>();

  control = new FormControl('');

  query = toSignal(
    this.control.valueChanges.pipe(debounceTime(500), distinctUntilChanged()),
  );

  newQuery = computed(() => this.query());

  constructor() {
    effect(() => {
      this.changeQuery.emit(this.newQuery()!);
    });
  }
}