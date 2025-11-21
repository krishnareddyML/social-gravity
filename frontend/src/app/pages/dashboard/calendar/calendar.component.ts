import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-calendar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './calendar.component.html',
    styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
    calendarDays: any[] = [];

    ngOnInit() {
        this.generateCalendar();
    }

    generateCalendar() {
        // Mock calendar generation for Nov 2025
        // In a real app, this would be dynamic based on selected month

        // Start with some padding days from prev month
        for (let i = 28; i <= 31; i++) {
            this.calendarDays.push({ date: new Date(2025, 9, i), isCurrentMonth: false, posts: [] });
        }

        // Current month days
        for (let i = 1; i <= 30; i++) {
            const posts = [];
            // Add some mock posts
            if (i === 5 || i === 12 || i === 20) {
                posts.push({ platform: 'TWITTER', time: '10:00', title: 'Product Launch' });
            }
            if (i === 8 || i === 15) {
                posts.push({ platform: 'LINKEDIN', time: '09:00', title: 'Weekly Update' });
            }

            this.calendarDays.push({ date: new Date(2025, 10, i), isCurrentMonth: true, posts: posts });
        }

        // Padding for next month
        for (let i = 1; i <= 5; i++) {
            this.calendarDays.push({ date: new Date(2025, 11, i), isCurrentMonth: false, posts: [] });
        }
    }
}
