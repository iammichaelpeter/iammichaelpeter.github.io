import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslocoPipe, MatIconModule],
  template: `
    <footer class="w-full bg-background py-6 md:py-8">
      <nav 
        class="container mx-auto px-4 pt-8 border-t border-gray-900/10 dark:border-white/10"
        aria-label="Footer navigation"
      >
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start md:items-center">
          <div class="flex flex-col gap-4 sm:gap-3 md:flex-row md:gap-6">
            <a 
              routerLink=""
              class="text-base transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              [attr.aria-label]="'common.footer.aboutButtonLabel' | transloco"
            >
              <mat-icon>face</mat-icon>
            </a>
            <a 
              routerLink="projects"
              class="text-base transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              [attr.aria-label]="'common.footer.projectButtonLabel' | transloco"
            >
              <mat-icon>work</mat-icon>
            </a>
          </div>
          <div class="flex flex-col items-end gap-4 md:flex-row md:items-center">
            <a 
              routerLink="legal/imprint"
              class="text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {{ 'common.footer.imprintButtonLabel' | transloco }}
            </a>
            
            <span class="hidden md:block text-gray-400" aria-hidden="true">•</span>
            
            <a 
              routerLink="legal/privacy-policy"
              class="text-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {{ 'common.footer.legalNoticeButtonLabel' | transloco }}
            </a>
            
            <span class="hidden md:block text-gray-400" aria-hidden="true">•</span>
            
            <small class="text-sm">
              © {{ currentYear }} Michael Peter
            </small>
          </div>
        </div>
      </nav>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}