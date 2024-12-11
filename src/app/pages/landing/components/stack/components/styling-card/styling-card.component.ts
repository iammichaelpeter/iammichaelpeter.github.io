import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-styling-card',
  standalone: true,
  imports: [MatIconModule, TranslocoPipe],
  templateUrl: './styling-card.component.html',
  styleUrl: './styling-card.component.scss'
})
export class StylingCardComponent {
  @Input() showAnimations = true;
}
