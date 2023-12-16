import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { SimpleEntity } from './simple-entity';
import { allEntities } from './simple-entity.state';
import { addSimpleEntity } from './simple-entity.actions';

@Component({
  selector: 'app-simple-entity',
  standalone: true,
  imports: [ CommonModule ],
  template: `
    <table>
      <tr *ngFor="let entity of simpleEntities$ | async">
        <td>{{ entity.name }}</td>
        <td>{{ entity.description }}</td>
      </tr>
    </table>
  `,
  styles: ``
})
export class SimpleEntityComponent {

  simpleEntities$: Observable<SimpleEntity[]>;

  constructor(store: Store) {
    this.simpleEntities$ = store.select(allEntities);
    store.dispatch(addSimpleEntity({ name: 'The_Name', description: 'The_Description'}));
  }
}
