import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';

export type NotificationType = 'success' | 'error';

export interface NotificationData {
  message: string;
  description?: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  show(data: NotificationData) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data,
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: 'notification-panel',
      politeness: 'assertive',
      announcementMessage: data.message,
    });
  }

  success(message: string, description?: string) {
    this.show({ message, description, type: 'success' });
  }

  error(message: string, description?: string) {
    this.show({ message, description, type: 'error' });
  }
}