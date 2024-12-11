import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslocoPipe } from '@jsverse/transloco';
import { NotificationData } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslocoPipe],
  template: `
    <div class="flex items-center p-4 bg-white dark:bg-gray-900 border border-outline rounded-lg">
      <div class="px-2">
        <mat-icon [class.text-tertiary]="data.type === 'success'"
                  [class.text-error]="data.type === 'error'">
          {{data.type === 'success' ? 'check_circle' : 'error'}}
        </mat-icon>
      </div>
      
      <span class="ml-4 mr-2">
        <span class="text-on-surface font-medium">{{ data.message | transloco }}</span>
        @if (data.description) {
          <span class="block mt-1 text-on-surface-variant">
            {{ data.description | transloco }}
          </span>
        }
      </span>

      <button mat-icon-button (click)="snackBarRef.dismiss()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 28rem;
      border-radius: var(--mat-snack-bar-container-shape);
    }
  `]
})
export class NotificationComponent {
  readonly data = inject(MAT_SNACK_BAR_DATA) as NotificationData;
  readonly snackBarRef = inject(MatSnackBarRef);
}