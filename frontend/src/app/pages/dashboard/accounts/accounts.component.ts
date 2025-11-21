import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

interface SocialAccount {
  id: string;
  name: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram' | 'youtube';
  connected: boolean;
  username?: string;
  followers?: number;
  lastSync?: string;
  posts?: number;
  error?: boolean;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">Social Accounts</h1>
          <p class="text-gray-600 dark:text-gray-400">Manage your connected social media accounts and their settings.</p>
        </div>
        <button (click)="openModal()" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
          <span>+</span> Connect Account
        </button>
      </div>

      <!-- Error Alert -->
      <div *ngIf="connectionError" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Connection Failed!</strong>
        <span class="block sm:inline"> There was an error connecting your account. Please try again.</span>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" (click)="connectionError = false">
          <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </span>
      </div>

      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Connected Accounts</h2>
        
        <div class="space-y-4">
          <div *ngIf="connectedAccounts.length === 0" class="text-center py-8 text-gray-500 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
            No accounts connected yet.
          </div>

          <!-- Connected Account Item -->
          <div *ngFor="let account of connectedAccounts" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div [ngClass]="getPlatformColor(account.platform)" class="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl">
                <i [class]="getPlatformIcon(account.platform)"></i>
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-semibold text-gray-900 dark:text-white">{{ account.name }}</h3>
                  <span *ngIf="account.error" class="px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">Error</span>
                </div>
                <p class="text-sm text-gray-500">{{ account.username }}</p>
                <div class="flex items-center gap-4 mt-1 text-xs text-gray-400">
                  <span *ngIf="account.followers"><i class="fas fa-users mr-1"></i> {{ account.followers | number }} followers</span>
                  <span *ngIf="account.lastSync"><i class="fas fa-sync mr-1"></i> Last sync: {{ account.lastSync }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-8">
              <div class="text-center">
                <span class="block text-lg font-semibold text-gray-900 dark:text-white">{{ account.posts || '-' }}</span>
                <span class="text-xs text-gray-500">Posts</span>
              </div>
              
              <div class="flex items-center gap-2">
                <button class="p-2 text-gray-400 hover:text-indigo-600 transition-colors" title="Refresh">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
                <button class="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Settings">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button (click)="disconnect(account.id)" class="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Disconnect">
                   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips Section -->
      <div class="mt-12">
        <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Account Management Tips</h3>
        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="text-green-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-200">Keep accounts synchronized</h4>
              <p class="text-sm text-gray-500">Regular sync ensures your latest followers and engagement metrics are up to date.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="text-green-500 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-gray-200">Monitor account health</h4>
              <p class="text-sm text-gray-500">Check for connection errors and re-authenticate when needed.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Connect Modal -->
      <div *ngIf="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" (click)="closeModal()"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">Connect Social Media Account</h3>
                <button (click)="closeModal()" class="text-gray-400 hover:text-gray-500">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div class="space-y-4">
                <!-- Platform Items -->
                <div *ngFor="let platform of availablePlatforms" class="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div class="flex items-center gap-4">
                    <div [ngClass]="getPlatformColor(platform.id)" class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg">
                      <i [class]="getPlatformIcon(platform.id)"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <h4 class="font-medium text-gray-900">{{ platform.name }}</h4>
                        <span *ngIf="platform.comingSoon" class="px-2 py-0.5 text-[10px] bg-gray-100 text-gray-500 rounded-full uppercase font-bold tracking-wider">Coming Soon</span>
                      </div>
                      <p class="text-xs text-gray-500">{{ platform.description }}</p>
                    </div>
                  </div>
                  <button 
                    [disabled]="platform.comingSoon"
                    (click)="connect(platform.id)"
                    class="px-4 py-2 text-sm font-medium rounded-md transition-colors"
                    [ngClass]="platform.comingSoon ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-white bg-indigo-600 hover:bg-indigo-700'">
                    Connect
                  </button>
                </div>
              </div>
              
              <div class="mt-6 text-xs text-gray-500 space-y-1">
                <p>• Your account credentials are stored securely and encrypted</p>
                <p>• You can disconnect accounts at any time</p>
                <p>• We only request necessary permissions for posting and analytics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AccountsComponent implements OnInit {
  showModal = false;
  connectionError = false;
  connectedAccounts: SocialAccount[] = [];
  currentUser: any;

  availablePlatforms = [
    {
      id: 'twitter',
      name: 'Twitter/X',
      description: 'Connect your Twitter account to schedule tweets and track engagement',
      comingSoon: false
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      description: 'Share professional content and company updates',
      comingSoon: true
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Post to Facebook pages and manage your social presence',
      comingSoon: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Schedule Instagram posts and stories',
      comingSoon: true
    },
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Upload and schedule YouTube videos',
      comingSoon: true
    },
  ];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['error']) {
        this.connectionError = true;
      }
    });

    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.fetchConnections();
      }
    });
  }

  fetchConnections() {
    this.http.get<any[]>(`http://localhost:8080/api/connections/${this.currentUser.id}`).subscribe({
      next: (connections) => {
        this.connectedAccounts = connections.map(conn => ({
          id: conn.id,
          name: this.getPlatformName(conn.platform),
          platform: conn.platform.toLowerCase(),
          connected: conn.connected,
          username: conn.platformUsername,
          lastSync: 'Just now', // Mock for now
          posts: 0 // Mock for now
        }));
      },
      error: (err) => console.error('Failed to fetch connections', err)
    });
  }

  connect(platformId: string) {
    if (platformId === 'twitter') {
      // Call backend to get auth URL
      this.http.get(`http://localhost:8080/api/connections/connect/twitter?userId=${this.currentUser.id}`, { responseType: 'text' })
        .subscribe({
          next: (url) => {
            window.location.href = url;
          },
          error: (err) => console.error('Failed to get auth URL', err)
        });
    }
  }

  disconnect(connectionId: string) {
    this.http.delete(`http://localhost:8080/api/connections/${connectionId}`).subscribe({
      next: () => {
        this.fetchConnections();
      },
      error: (err) => console.error('Failed to disconnect', err)
    });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getPlatformName(platform: string): string {
    const p = this.availablePlatforms.find(p => p.id === platform.toLowerCase());
    return p ? p.name : platform;
  }

  getPlatformColor(platform: string): string {
    switch (platform) {
      case 'twitter': return 'bg-sky-500';
      case 'linkedin': return 'bg-blue-700';
      case 'facebook': return 'bg-blue-600';
      case 'instagram': return 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500';
      case 'youtube': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  }

  getPlatformIcon(platform: string): string {
    // Using simple text or generic icons if font-awesome isn't available, 
    // but assuming font-awesome or similar might be present based on typical setups.
    // For now, I'll use simple classes that might map to a library or just placeholders.
    // In a real app I'd check index.html for icon libraries.
    // Given the screenshot shows icons, I'll assume some icon library or SVGs.
    // For simplicity in this artifact, I'll use generic class names.
    return 'fab fa-' + platform;
  }
}
