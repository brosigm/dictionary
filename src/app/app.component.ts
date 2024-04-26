import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './top-menu/top-menu.component';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopMenuComponent,
    MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'dictionary-application';
}
