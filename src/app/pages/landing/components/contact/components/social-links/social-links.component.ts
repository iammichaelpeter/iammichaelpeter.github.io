import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-social-links',
  standalone: true,
  imports: [CommonModule, NgClass],
  template: `
    <div class="mt-10 flex flex-wrap gap-6">
      @for (link of socialLinks; track link.name) {
        <a 
          [href]="link.url" 
          target="_blank"
          rel="noopener noreferrer"
          [attr.aria-label]="'Visit my ' + link.name + ' profile'"
          class="group relative"
        >
          <div [class]="'w-20 h-20 flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 rounded-[22%] ' + 
            (link.name === 'GitHub' ? 'github-app-icon dark:github-app-icon-dark' : '') +
            (link.name === 'Xing' ? 'xing-app-icon' : '') +
            (link.color ? ' ' + link.color : '')"
            [ngClass]="{'github-dark': link.name === 'GitHub'}"
          >
            <div class="w-12 h-12" [innerHTML]="link.icon"></div>
          </div>
          <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
            {{link.name}}
          </div>
        </a>
      }
    </div>
  `,
styles: [`
    /* LinkedIn Icon Styling */
    .bg-\\[\\#0A66C2\\] {
      position: relative;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .bg-\\[\\#0A66C2\\]::before {
      content: '';
      position: absolute;
      inset: -1px;
      background: linear-gradient(180deg, #0e76d4 0%, #0A66C2 100%);
      border-radius: inherit;
      z-index: -2;
    }

    /* Light Mode Styles */
    .xing-app-icon {
      position: relative;
      background-color: white;
    }

    .xing-app-icon::before {
      content: '';
      position: absolute;
      inset: -1px;
      background: white;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: inherit;
      z-index: -2;
    }

    /* Dark Mode Styles */
    @media (prefers-color-scheme: dark) {
      .github-dark::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, #1A1A1A 0%, #000000 100%);
        border-radius: inherit;
        z-index: -1;
        border: 1px solid rgba(140, 140, 140, 0.5);
      }

      .bg-\\[\\#0A66C2\\]::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, #0e76d4 0%, #0A66C2 100%);
        border-radius: inherit;
        z-index: -1;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .xing-app-icon {
        background: #cfcfcf;
      }

      .xing-app-icon::before {
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: linear-gradient(180deg, #d4d4d4 0%, #cfcfcf 100%);
      }
    }
`]
})
export class SocialLinksComponent {
  socialLinks: Array<{
    name: string;
    url: string;
    color?: string;
    icon: SafeHtml;
  }>;

  constructor(private sanitizer: DomSanitizer) {
    this.socialLinks = [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/michael-peter-07995a285/',
        color: 'bg-[#0A66C2]',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg viewBox="0 0 24 24" fill="#FFFFFF">
            <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM8.5 18.5H6V9.5H8.5V18.5ZM7.25 8.25C6.425 8.25 5.75 7.575 5.75 6.75C5.75 5.925 6.425 5.25 7.25 5.25C8.075 5.25 8.75 5.925 8.75 6.75C8.75 7.575 8.075 8.25 7.25 8.25ZM18.5 18.5H16V13.9C16 12.6 15.45 11.9 14.5 11.9C13.55 11.9 13 12.6 13 13.9V18.5H10.5V9.5H13V10.75C13.4 10 14.45 9.3 15.5 9.3C17.45 9.3 18.5 10.75 18.5 13.4V18.5Z"/>
          </svg>
        `)
      },
      {
        name: 'Xing',
        url: 'https://www.xing.com/profile/Michael_Peter181/web_profiles?expandNeffi=true',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg viewBox="0 0 24 24">
            <path fill="#005A5F" d="M18.188 0c-.517 0-.741.325-.927.66 0 0-7.455 13.224-7.702 13.657.015.024 4.919 9.023 4.919 9.023.17.308.436.66.967.66h3.454c.211 0 .375-.078.463-.22.089-.151.089-.346-.009-.536l-4.879-8.916c-.004-.006-.004-.016 0-.022L22.139.756c.095-.191.097-.387.006-.535C22.056.078 21.894 0 21.686 0h-3.498zM3.648 4.74c-.211 0-.385.074-.473.216-.09.149-.078.339.02.531l2.34 4.05c.004.01.004.016 0 .021L1.86 16.051c-.099.188-.093.381 0 .529.085.142.239.234.45.234h3.461c.518 0 .766-.348.945-.667l3.734-6.609-2.378-4.155c-.172-.315-.434-.659-.962-.659H3.648v.016z"/>
          </svg>
        `)
      }
    ];
  }
}