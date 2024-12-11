import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { StackComponent } from './components/stack/stack.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    StackComponent,
    ContactComponent
  ],
  template: `
    <app-hero></app-hero>
    <app-stack></app-stack>
    <app-contact></app-contact>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
}