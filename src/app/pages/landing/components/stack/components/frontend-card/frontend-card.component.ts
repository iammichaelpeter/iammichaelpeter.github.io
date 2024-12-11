import { Component, Input } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-frontend-card',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './frontend-card.component.html',
  styleUrl: './frontend-card.component.scss'
})
export class FrontendCardComponent {
  @Input() showAnimations = true;
}
