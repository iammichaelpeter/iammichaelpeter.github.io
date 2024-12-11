import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [TranslocoPipe],
  template: `
    <main class="isolate flex-grow min-h-screen">
      <div class="h-full relative isolate -z-10 overflow-hidden pt-14">
        <div class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div class="max-w-2xl mx-auto overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800 transform transition-all hover:scale-[1.02]">
            
            <div class="p-8 text-center space-y-6">
              <div class="text-6xl animate-bounce">💡</div>
              <h2 class="text-3xl font-bold text-transparent">
                {{ 'projects.title' | transloco }}
              </h2>
              <p class="text-gray-600 dark:text-gray-300 text-lg max-w-md mx-auto">
                {{ 'projects.subtitle' | transloco }} 
              </p>
              <div class="grid grid-cols-2 gap-4 pt-4">
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div class="text-2xl font-bold">1</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">Projects in Pipeline</div>
                </div>
                <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div class="text-2xl font-bold">Soon</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">First Release</div>
                </div>
              </div>
              <p class="pt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                {{ 'projects.slogan' | transloco }}
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  `,
  styles: []
})
export class ProjectListComponent {
}