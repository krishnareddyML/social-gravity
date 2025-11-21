import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Calendar</h1>
        <div class="flex space-x-2">
          <button class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span class="px-4 py-2 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">November 2025</span>
          <button class="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Days Header -->
        <div class="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          <div *ngFor="let day of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" class="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {{ day }}
          </div>
        </div>

        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 auto-rows-fr bg-gray-200 gap-px">
          <!-- Previous Month Days -->
          <div *ngFor="let day of [29, 30, 31]" class="bg-gray-50 min-h-[120px] p-2">
            <span class="text-sm text-gray-400">{{ day }}</span>
          </div>

          <!-- Current Month Days -->
          <div *ngFor="let day of days" class="bg-white min-h-[120px] p-2 hover:bg-gray-50 transition-colors relative group">
            <span class="text-sm font-medium text-gray-900">{{ day }}</span>
            
            <!-- Scheduled Posts -->
            <div *ngIf="day === 5" class="mt-2 space-y-1">
              <div class="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded border border-blue-100 truncate">
                Twitter: Launch
              </div>
            </div>
            <div *ngIf="day === 12" class="mt-2 space-y-1">
              <div class="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-50 rounded border border-blue-100 truncate">
                LinkedIn: Hiring
              </div>
              <div class="px-2 py-1 text-xs font-medium text-sky-700 bg-sky-50 rounded border border-sky-100 truncate">
                Twitter: Thread
              </div>
            </div>
            <div *ngIf="day === 24" class="mt-2 space-y-1">
              <div class="px-2 py-1 text-xs font-medium text-purple-700 bg-purple-50 rounded border border-purple-100 truncate">
                Instagram: Reel
              </div>
            </div>

            <!-- Add Button (Hover) -->
            <button class="absolute bottom-2 right-2 p-1 rounded-full bg-primary-50 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary-100">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <!-- Next Month Days -->
          <div *ngFor="let day of [1, 2, 3, 4, 5]" class="bg-gray-50 min-h-[120px] p-2">
            <span class="text-sm text-gray-400">{{ day }}</span>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CalendarComponent {
    days = Array.from({ length: 30 }, (_, i) => i + 1);
}
