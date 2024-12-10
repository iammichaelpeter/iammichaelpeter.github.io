import { Injectable, computed, signal } from '@angular/core';

export type StorageKey = 'IAMMICHAELPETER_CONTACT_FORM';

@Injectable({
  providedIn: 'root'
})
export class FormStorageService {
  private storage = signal<Record<StorageKey, unknown>>({} as Record<StorageKey, unknown>);

  hasStoredData = computed(() => Object.keys(this.storage()).length > 0);

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    try {
      const storedData: Partial<Record<StorageKey, unknown>> = {};
      
      (Object.values(['IAMMICHAELPETER_CONTACT_FORM']) as StorageKey[]).forEach(key => {
        const data = localStorage.getItem(key);
        if (data) {
          storedData[key] = JSON.parse(data);
        }
      });

      this.storage.set(storedData as Record<StorageKey, unknown>);
    } catch (error) {
      console.error('Error initializing form storage:', error);
    }
  }

  loadFormData<T>(key: StorageKey): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error loading form data:', error);
      return null;
    }
  }
}