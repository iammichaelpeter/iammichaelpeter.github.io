import { Component, computed, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../../../../../../core/services/settings.service';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-baas-card',
  standalone: true,
  imports: [MatIconModule, TranslocoPipe],
  templateUrl: './baas-card.component.html',
  styleUrl: './baas-card.component.scss',
  styles: []
})
export class BaasCardComponent {
  settingsService = inject(SettingsService);

  @Input() showAnimations = true;

  @ViewChild('cardsRef') cardsRef!: ElementRef;
  
  darkMode = computed(() => this.settingsService.darkMode());

  cloudPath = `M280 316h-242.704c-46.816 0-84.392-38.192-84.392-84.392 0-42.504 31.416-77.616 72.072-83.776 6.16-54.208 52.36-96.712 107.8-96.712 35.112 0 67.76 17.248 88.088 44.968 2.464 0 4.928-0.616 7.392-0.616 35.112 0 63.448 28.336 63.448 63.448 0 1.848 0 3.696 0 4.928 36.344 5.544 64.064 36.96 64.064 74.536 0 43.12-33.88 77.616-75.768 77.616z`;
  
  cursor = { x: 0, y: 0 };
  mouseOnCard = false;
  gradientCenterX = '50%';
  gradientCenterY = '50%';

  handleMouseMove(event: MouseEvent): void {
    if (this.cardsRef?.nativeElement) {
      const rect = this.cardsRef.nativeElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      this.cursor = { x, y };
      this.gradientCenterX = `${(x / rect.width) * 100}%`;
      this.gradientCenterY = `${(y / rect.height) * 100}%`;
    }
  }

  handleMouseEnter(): void {
    this.mouseOnCard = true;
  }

  handleMouseLeave(): void {
    this.mouseOnCard = false;
  }
}