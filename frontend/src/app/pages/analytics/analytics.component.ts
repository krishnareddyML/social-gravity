import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-analytics',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
        <select class="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <!-- Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">Total Impressions</p>
          <h3 class="text-3xl font-bold text-gray-900">124.5k</h3>
          <div class="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-blue-500 w-[75%]"></div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">Engagement Rate</p>
          <h3 class="text-3xl font-bold text-gray-900">4.2%</h3>
          <div class="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-green-500 w-[60%]"></div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <p class="text-sm text-gray-500 mb-1">Link Clicks</p>
          <h3 class="text-3xl font-bold text-gray-900">1,892</h3>
          <div class="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-purple-500 w-[45%]"></div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Engagement Over Time -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Engagement Over Time</h3>
          <div class="h-64 flex items-end justify-between space-x-2">
            <div *ngFor="let height of [40, 65, 45, 80, 55, 90, 70]" class="w-full bg-blue-50 rounded-t-lg relative group hover:bg-blue-100 transition-colors">
              <div [style.height.%]="height" class="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-500"></div>
              <div class="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded pointer-events-none">
                {{ height * 10 }}
              </div>
            </div>
          </div>
          <div class="flex justify-between mt-4 text-xs text-gray-500">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <!-- Platform Performance -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Platform Performance</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-gray-700">Twitter</span>
                <span class="text-gray-500">45%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-400 w-[45%]"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-gray-700">LinkedIn</span>
                <span class="text-gray-500">30%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-700 w-[30%]"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-gray-700">Instagram</span>
                <span class="text-gray-500">15%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-pink-500 w-[15%]"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-gray-700">Facebook</span>
                <span class="text-gray-500">10%</span>
              </div>
              <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 w-[10%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AnalyticsComponent { }
