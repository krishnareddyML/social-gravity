import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../services/analytics.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    summary: any;
    performance: any[] = [];
    userId = 1; // Mock user ID

    constructor(private analyticsService: AnalyticsService) { }

    ngOnInit() {
        this.loadAnalytics();
    }

    loadAnalytics() {
        this.analyticsService.getSummary(this.userId).subscribe({
            next: (data) => this.summary = data,
            error: (err) => console.error('Failed to load summary', err)
        });

        this.analyticsService.getPerformance(this.userId).subscribe({
            next: (data) => this.performance = data,
            error: (err) => console.error('Failed to load performance', err)
        });
    }
}
