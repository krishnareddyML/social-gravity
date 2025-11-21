import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private apiUrl = 'http://localhost:8080/api/posts';

    constructor(private http: HttpClient) { }

    createPost(userId: number, post: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/${userId}`, post);
    }

    getUserPosts(userId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/${userId}`);
    }
}
