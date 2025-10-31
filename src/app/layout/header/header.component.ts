import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../types/models/user';

@Component({
  selector: 'app-header',
  imports: [
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMobile: boolean = false;
  logoUrl = 'assets/logo.jpg';
  logoAlt = 'Logo';
  drawerOpen = output();
  private authService = inject(AuthService);
  user$ = this.authService.user$;
  user: User | null = null;
  onOpenDrawer() {
    this.drawerOpen.emit();
  }
  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
      this.user$.subscribe(user => this.user = user);
  }
  activePage = '';
  isLoading = false;

  onNavClick(page: string) {
    this.router.navigate([`/${page}`]);  
    this.activePage = page;
    this.isLoading = true;
    timer(2000).subscribe(() => {
      this.isLoading = false;
    });
  }
}
