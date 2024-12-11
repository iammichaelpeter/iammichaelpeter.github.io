import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [TranslocoPipe, MatIconModule],
  template: `
    <div class="mt-16 min-h-screen">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <h2 class="text-4xl font-semibold tracking-tight sm:text-5xl">
          {{ 'legalNotice.title' | transloco }}
        </h2>
        
        <div class="mt-16 min-h-[100px] border-t border-gray-900/10 dark:border-gray-100/10 pt-8">
          <a 
            href="/pdf/datenschutzerklaerung_mp.pdf"
            target="_blank"
            class="group block p-8 rounded-xl border border-gray-900/10 dark:border-gray-100/10 shadow-lg hover:shadow-md transition-all duration-300"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-6 py-4">
                <div class="flex items-center justify-center w-8 h-8">
                  <mat-icon class="!w-8 !h-8 !flex !items-center !justify-center">picture_as_pdf</mat-icon>
                </div>
                <div class="min-w-[200px]">
                  <h3 class="text-lg font-semibold">{{ 'legalNotice.cardTitle' | transloco }}</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ 'legalNotice.cardSubtitle' | transloco }}</p>
                </div>
              </div>
              <div class="flex items-center justify-center w-8 h-8">
                <mat-icon class="text-gray-400 group-hover:translate-x-1 transition-transform !w-8 !h-8 !flex !items-center !justify-center">
                  arrow_forward
                </mat-icon>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
    }

    mat-icon {
      display: inline-flex !important;
      align-items: center;
      justify-content: center;
    }
  `]
})
export class LegalComponent {}