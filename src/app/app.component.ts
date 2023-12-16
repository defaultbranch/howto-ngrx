import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { SimpleEntityComponent } from "./simple-entity/simple-entity.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SimpleEntityComponent
  ],
  template: `
    <app-simple-entity></app-simple-entity>
  `,
  styles: [],
})
export class AppComponent {
}
