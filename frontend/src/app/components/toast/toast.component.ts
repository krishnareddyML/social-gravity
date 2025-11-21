import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <div *ngFor="let toast of toastService.toasts$ | async" 
           class="px-4 py-3 rounded-lg shadow-lg text-white transform transition-all duration-300 ease-in-out animate-slide-in"
           [ngClass]="{
             'bg-green-600': toast.type === 'success',
             'bg-red-600': toast.type === 'error',
             'bg-blue-600': toast.type === 'info'
           }">
        <div class="flex items-center gap-2">
          <span *ngIf="toast.type === 'success'">✓</span>
          <span *ngIf="toast.type === 'error'">⚠</span>
          <span *ngIf="toast.type === 'info'">ℹ</span>
          <span>{{ toast.message }}</span>
          <button (click)="toastService.remove(toast.id)" class="ml-4 text-white/80 hover:text-white">×</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .animate-slide-in {
      animation: slideIn 0.3s ease-out forwards;
    }
  `]
})
export class ToastComponent {
    constructor(public toastService: ToastService) { }
}
