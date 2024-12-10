import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  translocoService = inject(TranslocoService);

  language = signal(localStorage.getItem('IAMMICHAELPETER_LANGUAGE') || 'de');
  darkMode = signal<boolean>(JSON.parse(localStorage.getItem('IAMMICHAELPETER_DARKMODE') ?? 'false'));
  mobileSidenavOpen = signal(false);

  constructor(
  ) {
    effect(() => {
      const currentLang = this.language();
      localStorage.setItem('IAMMICHAELPETER_LANGUAGE', currentLang);
      this.translocoService.setActiveLang(currentLang);
    });

    effect(() => {
      localStorage.setItem('IAMMICHAELPETER_DARKMODE', JSON.stringify(this.darkMode()));
    });
  }

  setLanguage(language: string) {
    this.language.set(language);
  }

  toggleDarkMode() {
    this.darkMode.update(value => !value);
  }

  toggleMobileSidenav() {
    this.mobileSidenavOpen.update(state => !state);
  }

  closeMobileSidenav() {
    this.mobileSidenavOpen.set(false);
  }
}