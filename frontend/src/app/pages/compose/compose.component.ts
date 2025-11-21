import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-compose',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="max-w-5xl mx-auto">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Create Post</h1>
        <p class="text-gray-500">Draft and schedule your content across multiple platforms.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Editor Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Platform Selection -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <label class="block text-sm font-medium text-gray-700 mb-4">Select Platforms</label>
            <div class="flex space-x-4">
              <button 
                (click)="togglePlatform('twitter')"
                [class.ring-2]="platforms.includes('twitter')"
                [class.ring-primary-500]="platforms.includes('twitter')"
                class="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all flex flex-col items-center w-24">
                <svg class="w-6 h-6 text-blue-400 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                <span class="text-xs font-medium text-gray-600">Twitter</span>
              </button>

              <button 
                (click)="togglePlatform('linkedin')"
                [class.ring-2]="platforms.includes('linkedin')"
                [class.ring-primary-500]="platforms.includes('linkedin')"
                class="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-all flex flex-col items-center w-24">
                <svg class="w-6 h-6 text-blue-700 mb-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span class="text-xs font-medium text-gray-600">LinkedIn</span>
              </button>
            </div>
          </div>

          <!-- Content Editor -->
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
              <textarea 
                [(ngModel)]="postContent"
                rows="6" 
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="What do you want to share?"></textarea>
              <div class="flex justify-between mt-2">
                <span class="text-xs text-gray-500">{{ postContent.length }} characters</span>
                <button class="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Add Emoji
                </button>
              </div>
            </div>

            <!-- Media Upload -->
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
              <svg class="w-10 h-10 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p class="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>
        </div>

        <!-- Preview Column -->
        <div class="lg:col-span-1">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
            
            <!-- Twitter Preview -->
            <div *ngIf="platforms.includes('twitter')" class="mb-6">
              <div class="flex items-center mb-2">
                <div class="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p class="text-sm font-bold text-gray-900">Demo User</p>
                  <p class="text-xs text-gray-500">@demouser</p>
                </div>
                <svg class="w-5 h-5 text-blue-400 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </div>
              <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ postContent || 'Your post content will appear here...' }}</p>
            </div>

            <!-- LinkedIn Preview -->
            <div *ngIf="platforms.includes('linkedin')" class="mb-6 pt-6 border-t border-gray-100">
              <div class="flex items-center mb-2">
                <div class="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                <div>
                  <p class="text-sm font-bold text-gray-900">Demo User</p>
                  <p class="text-xs text-gray-500">Product Manager</p>
                </div>
                <svg class="w-5 h-5 text-blue-700 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ postContent || 'Your post content will appear here...' }}</p>
            </div>

            <div class="mt-6 pt-6 border-t border-gray-100">
              <button class="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors shadow-sm">
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ComposeComponent {
    platforms: string[] = ['twitter'];
    postContent: string = '';

    togglePlatform(platform: string) {
        if (this.platforms.includes(platform)) {
            this.platforms = this.platforms.filter(p => p !== platform);
        } else {
            this.platforms.push(platform);
        }
    }
}
