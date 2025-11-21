import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {
    private apiUrl = 'http://localhost:8080/api/analytics';

    constructor(private http: HttpClient) { }

    getSummary(userId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${userId}/summary`);
    }

    getPerformance(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${userId}/performance`);
    }
}
