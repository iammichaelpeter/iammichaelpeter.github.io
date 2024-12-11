import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-mobiledev-card',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './mobiledev-card.component.html',
  styleUrl: './mobiledev-card.component.scss'
})
export class MobiledevCardComponent {
  @Input() showAnimations = true;
}
