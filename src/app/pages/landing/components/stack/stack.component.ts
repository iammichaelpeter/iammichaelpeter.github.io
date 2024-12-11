import { Component, inject, PLATFORM_ID } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FrontendCardComponent } from './components/frontend-card/frontend-card.component';
import { BaasCardComponent } from './components/baas-card/baas-card.component';
import { StylingCardComponent } from './components/styling-card/styling-card.component';
import { MobiledevCardComponent } from './components/mobiledev-card/mobiledev-card.component';
import { isPlatformBrowser } from '@angular/common';
import { TranslocoPipe } from '@jsverse/transloco';
import { CicdCardComponent } from './components/cicd-card/cicd-card.component';

@Component({
    selector: 'app-stack',
    standalone: true,
    imports: [
        MatIconModule,
        FrontendCardComponent,
        BaasCardComponent,
        StylingCardComponent,
        MobiledevCardComponent,
        TranslocoPipe,
        CicdCardComponent
    ],
    template: `
        <section class="px-6 sm:py-32">
            <div class="mx-auto max-w-xl lg:max-w-7xl lg:px-8">
                <h2 class="mt-2 max-w-lg text-pretty text-4xl font-semibold tracking-tight sm:text-5xl"
                >{{ 'stack.title' | transloco }}</h2>
                <div class="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
                    <div class="relative lg:col-span-3 p-8 group">
                        <app-frontend-card [showAnimations]="!isTouchDevice"></app-frontend-card>
                    </div>
                    <div class="relative lg:col-span-3 p-8 group">
                        <app-baas-card [showAnimations]="!isTouchDevice"></app-baas-card>
                    </div>
                    <div class="relative lg:col-span-2 p-8 group">
                        <app-styling-card [showAnimations]="!isTouchDevice"></app-styling-card>
                    </div>
                    <div class="relative lg:col-span-2 p-8 group">
                        <app-cicd-card [showAnimations]="!isTouchDevice"></app-cicd-card>
                    </div>
                    <div class="relative lg:col-span-2 p-8 group">
                        <app-mobiledev-card [showAnimations]="!isTouchDevice"></app-mobiledev-card>
                    </div>
                </div>
            </div>
        </section>
    `,
    styles: []
})
export class StackComponent {
    isTouchDevice = false;
    private platformId = inject(PLATFORM_ID);
  
    ngOnInit() {
      if (isPlatformBrowser(this.platformId)) {
        this.isTouchDevice = ('ontouchstart' in window) ||
          (navigator.maxTouchPoints > 0) ||
          // @ts-ignore
          (navigator.msMaxTouchPoints > 0);
      }
    }
}
