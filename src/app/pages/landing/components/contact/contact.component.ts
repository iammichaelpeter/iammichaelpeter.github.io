import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ContactFormData, EmailService } from './services/email.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormStorageService } from './services/form-storage.service';
import { Router } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    SocialLinksComponent,
    TranslocoPipe
  ],
  template: `
    <section class="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div class="mx-auto max-w-xl lg:max-w-7xl lg:px-8">
            <h2 class="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">{{ 'contact.title' | transloco }}</h2>
            <p class="mt-2 text-lg/8">{{ 'contact.subtitle' | transloco }}</p>
            <div class="mt-16 flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
                <form [formGroup]="contactForm" novalidate (ngSubmit)="onSubmit()" class="lg:flex-auto">
                    
                    <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label for="first-name" class="block text-sm/6 font-semibold">{{ 'contact.firstNameFieldLabel' | transloco }}</label>
                            <div class="mt-2.5">

                                <mat-form-field class="w-full" appearance="outline">
                                    <input
                                        matInput
                                        formControlName="firstName"
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autocomplete="given-name"
                                        placeholder=""
                                    >
                                </mat-form-field>

                            </div>
                        </div>
                        <div>
                            <label for="last-name" class="block text-sm/6 font-semibold">{{ 'contact.lastNameFieldLabel' | transloco }}</label>
                            <div class="mt-2.5">

                                <mat-form-field class="w-full" appearance="outline">
                                    <input
                                        matInput
                                        formControlName="lastName"
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autocomplete="family-name"
                                        placeholder=""
                                    >
                                </mat-form-field>

                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="website" class="block text-sm/6 font-semibold">{{ 'contact.companyFieldLabel' | transloco }}</label>
                            <div class="mt-2.5">

                                <mat-form-field class="w-full" appearance="outline">
                                    <input
                                        matInput
                                        formControlName="companyName"
                                        type="url"
                                        name="website"
                                        id="website"
                                        placeholder=""
                                    >
                                </mat-form-field>

                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="email" class="block text-sm/6 font-semibold">{{ 'contact.emailFieldLabel' | transloco }}</label>
                            <div class="mt-2.5">

                                <mat-form-field class="w-full" appearance="outline">
                                    <input
                                        matInput
                                        formControlName="email"
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder=""
                                    >
                                </mat-form-field>

                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="message" class="block text-sm/6 font-semibold">{{ 'contact.messageFieldLabel' | transloco }}</label>
                            <div class="mt-2.5">

                                <mat-form-field class="w-full" appearance="outline" hintLabel="Max 300 characters">
                                    <textarea
                                      matInput
                                      #input
                                      (input)="onInput($event)"
                                      formControlName="message"
                                      maxlength="300"
                                      placeholder=""
                                      name="message"
                                      id="message"
                                      rows="4"
                                    ></textarea>
                                    <mat-hint align="end">{{value().length}}/300</mat-hint>
                                </mat-form-field>
                            
                            </div>
                        </div>
                    </div>

                    <div class="mt-4">
                        <label class="flex items-start">
                          <mat-checkbox 
                            type="checkbox" 
                            formControlName="dataProtectionAccepted"
                            class="mt-1 mr-2"
                          ></mat-checkbox>
                          <span class="text-sm text-gray-600 dark:text-gray-400">
                            {{ 'contact.dataProtectionAcceptedText' | transloco }}
                            <a href="/legal/privacy-policy" class="underline">{{ 'contact.dataProtectionAcceptedLinkLabel' | transloco }}</a>. 
                            {{ 'contact.dataProtectionAcceptedRevocation' | transloco }}
                          </span>
                        </label>
                    </div>
                    
                    <div class="mt-10">

                    <button
                      type="submit"
                      [disabled]="!contactForm.valid"
                      class="block w-full text-on-primary rounded-md bg-secondary px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm disabled:opacity-50"
                    >
                      @if (emailService.isLoading()) {
                        <span>Sending...</span>
                      } @else {
                        <span>Let's talk</span>
                      }
                    </button>

                    </div>

                </form>

                <div class="lg:mt-6 lg:w-80 lg:flex-none">
                    <figure class="mt-10">
                        <blockquote class="text-lg/8 font-semibold">
                            <p>{{ 'contact.contactIntentionText' | transloco }}</p>
                        </blockquote>
                        <app-social-links></app-social-links>
                    </figure>
                </div>

            </div>
        </div>
    </section>
  `,
  styles: []
})
export class ContactComponent implements OnDestroy {
  private fb = inject(FormBuilder);
  private formStorage = inject(FormStorageService);
  emailService = inject(EmailService);

  protected readonly value = signal('');
  isValid = signal(false);

  contactForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.email],
    companyName: [''],
    message: ['', [Validators.required, Validators.maxLength(300)]],
    dataProtectionAccepted: [false, Validators.requiredTrue]
  });

  formValues = toSignal(this.contactForm.valueChanges, { 
    initialValue: this.contactForm.value 
  });

  constructor() {
    const savedData = this.formStorage.loadFormData<ContactFormData>('IAMMICHAELPETER_CONTACT_FORM');
    if (savedData) {
      this.contactForm.patchValue(savedData, { emitEvent: false });
    }

    this.contactForm.statusChanges.subscribe(status => 
      this.isValid.set(status === 'VALID')
    );

    effect(() => {
      const values = this.formValues();
      if (values && !this.emailService.isSuccess()) {
        localStorage.setItem('IAMMICHAELPETER_CONTACT_FORM', JSON.stringify(values));
      }
    });
  }

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  async onSubmit() {
    if (!this.contactForm.valid || this.emailService.isLoading()) return;
    
    const success = await this.emailService.sendEmail(
      this.contactForm.value as ContactFormData
    );
    
    if (success) {
      this.contactForm.reset();
      localStorage.removeItem('IAMMICHAELPETER_CONTACT_FORM');
    }
  }

  ngOnDestroy() {
    this.emailService.resetState();
  }
}