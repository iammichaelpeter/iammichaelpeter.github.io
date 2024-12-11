import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="grid min-h-[calc(100vh-4rem)] place-items-center px-6 py-24">
      <div class="text-center">

        <p class="text-base font-semibold text-primary">404</p>

        <h1 class="mt-4 text-balance text-4xl font-semibold tracking-tight text-on-surface sm:text-6xl">
          Page not found
        </h1>

        <p class="mt-6 text-pretty text-lg text-on-surface-variant sm:text-xl/8">
          Sorry, I couldn't find the page you're looking for.
        </p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a 
            routerLink="/" 
            class="rounded-md bg-surface-container px-4 py-2.5 
                   text-sm font-medium text-on-surface 
                   shadow ring-1 ring-outline 
                   transition-all duration-300 
                   hover:bg-primary hover:text-on-primary 
                   focus-visible:outline focus-visible:outline-2 
                   focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Back to Home
          </a>
        </div>
      </div>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class NotFoundComponent {
}