import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatDrawerContainer,
    MatDrawer,
    MatMenuModule,
    MatBottomSheetModule,
    MatNavList,
    MatListItem,
    RouterLink,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
