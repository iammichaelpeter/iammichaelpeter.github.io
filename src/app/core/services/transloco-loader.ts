import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader, TranslocoService } from '@jsverse/transloco';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export function preloadTranslations(translocoService: TranslocoService) {
  return () => {
    const languages = ['de', 'en'];
    
    const translations = languages.map(lang => 
      firstValueFrom(translocoService.load(lang))
    );
    
    return Promise.all(translations);
  };
}