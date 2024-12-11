import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './layout/header/header.component';
import { MobileSidenavComponent } from './layout/mobile-sidenav/mobile-sidenav.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule,
    MobileSidenavComponent,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <mat-sidenav-container
      [hasBackdrop]="true"
      (backdropClick)="collapsed.set(false)"
    >
      <mat-sidenav
        mode="over"
        [opened]="collapsed()"
        position="start"
      >
        <app-mobile-sidenav
          (closeNav)="collapsed.set(false)"
        ></app-mobile-sidenav>
      </mat-sidenav>
      
      <mat-sidenav-content>
        <div class="flex flex-col min-h-screen">
          <app-header
            [(collapsed)]="collapsed"
          ></app-header>
          
          @if (loading()) {
            <div
              class="flex-1 animate-pulse"
              role="progressbar"
              aria-label="Loading content"
            >
              <div class="h-screen bg-surface-variant/20"></div>
            </div>
          }
          
          <main
            class="flex-1"
            [class.opacity-0]="loading()"
            [attr.aria-hidden]="loading()"
            role="main"
          >
            <router-outlet></router-outlet>
          </main>
          
          <app-footer></app-footer>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100%;
    }

    mat-sidenav-container {
      height: 100%;
      transform: translateZ(0);
      will-change: transform;
    }

    mat-sidenav {
      width: 280px;
    }
  `]
})
export class AppComponent {
  private readonly settingsService = inject(SettingsService);
  
  protected readonly collapsed = signal(false);
  protected readonly loading = signal(true);

  constructor() {
    queueMicrotask(() => this.loading.set(false));
  }

  private readonly _darkModeEffect = effect(() => {
    document.documentElement.classList.toggle(
      'dark',
      this.settingsService.darkMode()
    );
  });
}