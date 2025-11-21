import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocialService {
    private apiUrl = 'http://localhost:8080/api/connections';

    constructor(private http: HttpClient) { }

    getConnections(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
    }

    connectPlatform(userId: number, platform: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/${userId}/connect?platform=${platform}`, {});
    }

    disconnectPlatform(connectionId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${connectionId}`);
    }
}
