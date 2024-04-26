import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarRow } from '@angular/material/toolbar';


@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    MatToolbar,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarRow
  ],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss'
})
export class TopMenuComponent {
  sidenavOpened = false;

  toggleSidenav(): void {
    this.sidenavOpened = !this.sidenavOpened;
  }

  closeSidenav(): void {
    this.sidenavOpened = false;
  }
}