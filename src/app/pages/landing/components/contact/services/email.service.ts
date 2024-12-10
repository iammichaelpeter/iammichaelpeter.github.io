import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '../../../../../shared/services/notification.service';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  companyName?: string;
  message: string;
  dataProtectionAccepted: boolean;
}

export interface EmailState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvgorkdl';
  private notification = inject(NotificationService);
  private http = inject(HttpClient);

  private state = signal<EmailState>({
    loading: false,
    error: null,
    success: false
  });

  isLoading = computed(() => this.state().loading);
  error = computed(() => this.state().error);
  isSuccess = computed(() => this.state().success);

  async sendEmail(formData: ContactFormData): Promise<boolean> {
    try {
      this.state.set({ loading: true, error: null, success: false });

      const formattedData = {
        name: `${formData.firstName} ${formData.lastName}`,
        company: formData.companyName || 'No Company',
        message: formData.message,
        _subject: `Kontaktanfrage von ${formData.firstName} ${formData.lastName}`,
        _language: 'de'
      };

      await firstValueFrom(
        this.http.post(this.FORMSPREE_ENDPOINT, formattedData, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
      );

      this.state.set({ loading: false, error: null, success: true });

      this.notification.success(
        'common.notifications.success.emailSent',
        'common.notifications.success.emailDescription'
      );

      return true;
    } catch (error) {
      this.state.set({
        loading: false,
        error: 'Failed to send message',
        success: false
      });

      this.notification.error(
        'common.notifications.error.emailError',
        'common.notifications.error.emailDescription'
      );

      return false;
    }
  }

  resetState(): void {
    this.state.set({
      loading: false,
      error: null,
      success: false
    });
  }
}