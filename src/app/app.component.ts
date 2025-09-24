import { Component } from '@angular/core';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  imports: [NavbarComponent, RouterOutlet]
})
export class AppComponent {}
