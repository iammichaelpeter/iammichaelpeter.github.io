import { Component, signal } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoPipe, NgOptimizedImage],
  template: `
    <section class="relative isolate px-6 py-16 lg:px-8 lg:py-32">
      <div class="mx-auto max-w-xl xl:py-50 lg:max-w-7xl lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6">
          
          <!-- Image Container -->
          <div class="mb-8 lg:mb-0">
            <div class="relative w-48 sm:w-64 lg:w-5/6">
              @if (!imageLoaded()) {
                <div class="aspect-square rounded-full animate-pulse bg-surface-variant"></div>
              }
              <img
                ngSrc="images/profile_web.jpg"
                width="800"
                height="800"
                priority
                fetchpriority="high"
                alt="Profile Picture of Michael"
                class="w-full rounded-full object-cover transition-opacity duration-300"
                [class.opacity-0]="!imageLoaded()"
                (load)="onImageLoad()"
              >
            </div>
          </div>
          
          <!-- Content Container -->
          <div class="flex flex-col justify-center">
            <h1 class="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
              {{ 'hero.title' | transloco }}
            </h1>
            <div class="mt-6 max-w-xl">
              <p class="text-lg leading-8 text-on-surface-variant">
                {{ 'hero.description' | transloco }}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  protected readonly imageLoaded = signal(false);

  protected onImageLoad(): void {
    this.imageLoaded.set(true);
  }
}