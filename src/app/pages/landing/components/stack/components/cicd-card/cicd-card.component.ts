import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, Input, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { TranslocoPipe } from '@jsverse/transloco';
import { SettingsService } from '../../../../../../core/services/settings.service';

@Component({
  selector: 'app-cicd-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslocoPipe],
  templateUrl: './cicd-card.component.html',
  animations: [
    trigger('containerMovement', [
      state('start', style({
        transform: 'translateX(0)'
      })),
      state('building', style({
        transform: 'translateX(0)'
      })),
      state('middle', style({
        transform: '{{middlePosition}}'
      }), { params: { middlePosition: 'translateX(0px)' } }),
      state('testing', style({
        transform: '{{middlePosition}}'
      }), { params: { middlePosition: 'translateX(0px)' } }),
      state('end', style({
        transform: '{{endPosition}}'
      }), { params: { endPosition: 'translateX(0px)' } }),
      transition('building => middle', [
        animate('2000ms ease-in-out')
      ]),
      transition('middle => testing', [
        animate('100ms')
      ]),
      transition('testing => end', [
        animate('2000ms ease-in-out')
      ])
    ]),
    trigger('codeMovement', [
      state('start', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('end', style({
        transform: 'translateX(64px)',
        opacity: 0
      })),
      transition('start => end', [
        animate('1500ms ease-in-out')
      ])
    ])
  ]
})
export class CicdCardComponent implements AfterViewInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  settingsService = inject(SettingsService);

  @Input() showAnimations = true;

  @ViewChild('pipelineContainer') pipelineContainer!: ElementRef;
  @ViewChild('buildStation') buildStation!: ElementRef;
  @ViewChild('testStation') testStation!: ElementRef;
  @ViewChild('deployStation') deployStation!: ElementRef;

  private readonly positionsSubject = new BehaviorSubject<{
    middlePosition: string;
    endPosition: string;
  }>({
    middlePosition: 'translateX(0px)',
    endPosition: 'translateX(0px)'
  });

  readonly positions$ = this.positionsSubject.asObservable();

  containerState: 'start' | 'building' | 'middle' | 'testing' | 'end' = 'start';
  codeState: 'start' | 'end' = 'start';
  animationInProgress = false;
  private timeouts: number[] = [];
  private resizeObserver?: ResizeObserver;

  get isCodeVisible(): boolean {
    return ['start', 'building'].includes(this.containerState);
  }

  get isBuilding(): boolean {
    return ['building', 'middle', 'testing', 'end'].includes(this.containerState);
  }

  get isTesting(): boolean {
    return ['testing', 'end'].includes(this.containerState);
  }

  get isDeploying(): boolean {
    return this.containerState === 'end';
  }

  ngAfterViewInit() {
    // Initial calculation after view init
    Promise.resolve().then(() => {
      this.calculatePositions();
      this.cdr.detectChanges();
    });

    // Setup resize observer
    this.resizeObserver = new ResizeObserver(() => {
      this.calculatePositions();
      this.cdr.detectChanges();
    });

    if (this.pipelineContainer?.nativeElement) {
      this.resizeObserver.observe(this.pipelineContainer.nativeElement);
    }
  }

  private calculatePositions() {
    if (!this.pipelineContainer?.nativeElement || !this.testStation?.nativeElement || !this.deployStation?.nativeElement) {
      return;
    }

    const containerWidth = 32;
    const halfContainerWidth = containerWidth / 2;
    const testStationPosition = this.testStation.nativeElement.offsetLeft;
    const deployStationPosition = this.deployStation.nativeElement.offsetLeft;

    // Update positions with pixel values
    this.positionsSubject.next({
      middlePosition: `translateX(${testStationPosition - halfContainerWidth}px)`,
      endPosition: `translateX(${deployStationPosition - halfContainerWidth}px)`
    });
  }

  startPipelineAnimation() {
    if (this.animationInProgress || !this.showAnimations) return;
    this.animationInProgress = true;

    // Reset all timeouts
    this.resetAnimation();

    // Start animation sequence
    this.containerState = 'building';
    this.codeState = 'end';

    // Schedule state transitions
    this.timeouts = [
      window.setTimeout(() => {
        this.containerState = 'middle';
        this.cdr.detectChanges();
      }, 2000),

      window.setTimeout(() => {
        this.containerState = 'testing';
        this.cdr.detectChanges();
      }, 4000),

      window.setTimeout(() => {
        this.containerState = 'end';
        this.cdr.detectChanges();
      }, 6000),

      window.setTimeout(() => {
        this.animationInProgress = false;
        this.cdr.detectChanges();
      }, 8000)
    ];
  }

  resetAnimation() {
    this.timeouts.forEach(timeout => window.clearTimeout(timeout));
    this.timeouts = [];
    this.containerState = 'start';
    this.codeState = 'start';
    this.animationInProgress = false;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.timeouts.forEach(timeout => window.clearTimeout(timeout));
    this.resizeObserver?.disconnect();
    this.positionsSubject.complete();
  }
}