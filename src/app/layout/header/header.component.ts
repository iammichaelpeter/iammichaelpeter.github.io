import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, inject, computed } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UpperCasePipe } from '@angular/common';
import { SettingsService } from '../../core/services/settings.service';
import { TranslocoPipe } from '@jsverse/transloco';

export type SupportedLanguage = typeof HEADER_CONFIG.supportedLanguages[number];
export type NavigationItem = typeof HEADER_CONFIG.navigationItems[number];

export const HEADER_CONFIG = {
  supportedLanguages: [
    { code: 'de', flag: '🇩🇪' },
    { code: 'en', flag: '🇺🇸' }
  ],
  githubUrl: 'https://github.com/iammichaelpeter/iammichaelpeter.github.io',
  navigationItems: [
    { route: '', icon: 'face', label: 'About' },
    { route: 'projects', icon: 'work', label: 'Projects' }
  ]
} as const;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatMenuModule, 
    MatIcon, 
    MatButtonModule, 
    RouterLink, 
    MatToolbarModule, 
    UpperCasePipe,
    TranslocoPipe
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected readonly config = HEADER_CONFIG;
  
  @Input() collapsed = false;
  @Output() collapsedChange = new EventEmitter<boolean>();
  
  #settingsService = inject(SettingsService);
  
  protected readonly darkMode = computed(() => this.#settingsService.darkMode());
  protected readonly currentLanguage = computed(() => this.#settingsService.language());

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  onDarkModeToggle(): void {
    this.#settingsService.toggleDarkMode();
  }

  onLanguageChange(language: string): void {
    this.#settingsService.setLanguage(language);
  }
}