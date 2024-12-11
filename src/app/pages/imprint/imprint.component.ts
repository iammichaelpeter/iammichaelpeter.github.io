import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-imprint',
  standalone: true,
  imports: [TranslocoPipe, RouterLink],
  template: `
    <div class="mt-16 min-h-screen">
      <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div class="space-y-4">
          <h2 class="text-4xl font-semibold tracking-tight sm:text-5xl">{{ 'imprint.title' | transloco }}</h2>
        </div>
        <dl class="mt-10 space-y-8">
          <div class="border-t border-gray-900/10 dark:border-gray-100/10"></div>
          <div class="pt-8">
            <dd class="mt-4">
              <div class="text-base/7 space-y-8">
                <div>
                  <h3 class="text-xl font-semibold">{{ 'imprint.provider.title' | transloco }}</h3>
                  <p>
                    {{ 'imprint.provider.name' | transloco }}<br>
                    {{ 'imprint.provider.street' | transloco }}<br>
                    {{ 'imprint.provider.location' | transloco }}
                  </p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold">{{ 'imprint.contact.title' | transloco }}</h3>
                  <p>
                    {{ 'imprint.contact.email' | transloco }}<br>
                  </p>
                  <p>{{ 'imprint.contact.form_notice' | transloco }}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold">{{ 'imprint.disclaimer.title' | transloco }}</h3>
                  <p class="mt-2">{{ 'imprint.disclaimer.content' | transloco }}</p>
                  <p class="mt-2">{{ 'imprint.disclaimer.legal_jurisdiction' | transloco }}</p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold">{{ 'imprint.privacy.title' | transloco }}</h3>
                  <p>
                    {{ 'imprint.privacy.content' | transloco }}
                    <a routerLink="../privacy-policy" class="text-tertiary underline hover:opacity-70">https://iammichaelpeter.github.io/legal/privacy-policy</a>
                  </p>
                </div>

                <div>
                  <h3 class="text-xl font-semibold">{{ 'imprint.copyright.title' | transloco }}</h3>
                  <p class="mt-2">{{ 'imprint.copyright.content' | transloco }}</p>
                </div>
                
                <div class="mt-8 pt-8 border-t border-gray-900/10 dark:border-gray-100/10">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ 'imprint.footer.created_with' | transloco }}
                    <a 
                      href="https://www.dieter-datenschutz.de" 
                      class="text-tertiary underline hover:opacity-70"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                    {{ 'imprint.footer.privacy_tool' | transloco }}
                    </a>
                  </p>
                </div>
                
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  `,
  styles: []
})
export class ImprintComponent {

}
