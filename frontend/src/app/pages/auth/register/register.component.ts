import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex bg-white font-sans">
      <!-- Left Side - Branding -->
      <div class="hidden lg:flex lg:w-1/2 bg-gray-900 relative overflow-hidden items-center justify-center">
        <div class="absolute inset-0 bg-gradient-to-br from-secondary-900 to-gray-900 opacity-90"></div>
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2629&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        
        <div class="relative z-10 text-center px-12">
          <div class="w-20 h-20 bg-secondary-600 rounded-2xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl shadow-secondary-500/30 mx-auto mb-8">
            S
          </div>
          <h2 class="text-4xl font-bold text-white mb-6">Join the Gravity</h2>
          <p class="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
            Start your journey to better social media management today. No credit card required.
          </p>
        </div>

        <!-- Decorative Circles -->
        <div class="absolute top-0 right-0 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <!-- Right Side - Register Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-gray-50">
        <div class="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <div class="text-center lg:text-left">
            <div class="lg:hidden w-12 h-12 bg-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-6">S</div>
            <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
            <p class="mt-2 text-sm text-gray-600">
              Already have an account? <a routerLink="/login" class="font-medium text-secondary-600 hover:text-secondary-500 transition-colors">Sign in here</a>
            </p>
          </div>

          <form class="mt-8 space-y-5" (ngSubmit)="onSubmit()">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                id="fullName" 
                name="fullName" 
                type="text" 
                required 
                [(ngModel)]="fullName"
                class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all sm:text-sm" 
                placeholder="John Doe">
            </div>

            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input 
                id="username" 
                name="username" 
                type="text" 
                required 
                [(ngModel)]="username"
                class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all sm:text-sm" 
                placeholder="johndoe">
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                [(ngModel)]="email"
                class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all sm:text-sm" 
                placeholder="john@example.com">
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                [(ngModel)]="password"
                class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent transition-all sm:text-sm" 
                placeholder="••••••••">
              <p class="mt-1 text-xs text-gray-500">Must be at least 8 characters</p>
            </div>

            <div class="flex items-center">
              <input id="terms" name="terms" type="checkbox" class="h-4 w-4 text-secondary-600 focus:ring-secondary-500 border-gray-300 rounded cursor-pointer" required>
              <label for="terms" class="ml-2 block text-sm text-gray-900 cursor-pointer">
                I agree to the <a href="#" class="text-secondary-600 hover:text-secondary-500">Terms</a> and <a href="#" class="text-secondary-600 hover:text-secondary-500">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  onSubmit() {
    const user = {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.toastService.show('Registration successful! Please login.', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        this.toastService.show('Registration failed. Please try again.', 'error');
      }
    });
  }
}
