import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col font-sans text-gray-900">
      <!-- Navbar -->
      <nav class="w-full px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/70 sticky top-0 z-50 border-b border-white/20">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-500/30">
            S
          </div>
          <span class="text-xl font-bold tracking-tight text-gray-900">Social<span class="text-primary-600">Gravity</span></span>
        </div>
        <div class="flex items-center gap-4">
          <a routerLink="/login" class="text-sm font-medium text-gray-600 hover:text-primary-600 transition-colors">Log in</a>
          <a routerLink="/register" class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Get Started</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <header class="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 lg:py-32 relative overflow-hidden">
        <!-- Background Blobs -->
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-200/30 rounded-full blur-3xl -z-10 animate-pulse" style="animation-delay: 1s;"></div>

        <div class="max-w-4xl mx-auto space-y-8">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 shadow-sm mb-4 animate-fade-in-up">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span class="text-xs font-medium text-gray-600">New: AI-Powered Analytics</span>
          </div>
          
          <h1 class="text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-gray-900 animate-fade-in-up" style="animation-delay: 0.1s;">
            Amplify Your <br>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Social Gravity</span>
          </h1>
          
          <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s;">
            The all-in-one platform to manage, schedule, and analyze your social media presence. 
            Create content that pulls your audience in.
          </p>
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style="animation-delay: 0.3s;">
            <a routerLink="/register" class="px-8 py-4 bg-primary-600 text-white text-lg font-semibold rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:-translate-y-1 flex items-center gap-2">
              Start for free
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#features" class="px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-full border border-gray-200 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </a>
          </div>
        </div>

        <!-- Dashboard Preview -->
        <div class="mt-20 relative max-w-6xl mx-auto animate-fade-in-up" style="animation-delay: 0.5s;">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-100 via-transparent to-transparent z-10"></div>
          <div class="rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white ring-1 ring-gray-900/5 transform rotate-x-12 perspective-1000">
            <img src="assets/dashboard-preview.png" alt="Dashboard Preview" class="w-full h-auto opacity-90">
          </div>
        </div>
      </header>

      <!-- Features Section -->
      <section id="features" class="py-24 bg-white relative">
        <div class="max-w-7xl mx-auto px-6">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-gray-900 mb-4">Everything you need to grow</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">Powerful tools designed to help you build your audience and increase engagement across all platforms.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
            <!-- Feature 1 -->
            <div class="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Deep Analytics</h3>
              <p class="text-gray-600 leading-relaxed">Get detailed insights into your audience's behavior and content performance with our advanced analytics dashboard.</p>
            </div>

            <!-- Feature 2 -->
            <div class="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Smart Scheduling</h3>
              <p class="text-gray-600 leading-relaxed">Plan your content calendar months in advance. Our AI suggests the best times to post for maximum engagement.</p>
            </div>

            <!-- Feature 3 -->
            <div class="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div class="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-6 group-hover:scale-110 transition-transform">
                <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">Unified Composer</h3>
              <p class="text-gray-600 leading-relaxed">Write once, publish everywhere. Customize your posts for each platform from a single, intuitive interface.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center gap-2 mb-4 md:mb-0">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span class="text-xl font-bold tracking-tight">SocialGravity</span>
          </div>
          <div class="text-gray-400 text-sm">
            &copy; 2025 Social Gravity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translate3d(0, 20px, 0);
      }
      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s ease-out forwards;
      opacity: 0;
    }
  `]
})
export class LandingPageComponent { }
