import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth';
    private tokenKey = 'auth-token';
    private userKey = 'auth-user';

    private currentUserSubject = new BehaviorSubject<any>(this.getUser());
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    register(user: any): Observable<any> {
        // Expect text response to avoid JSON parsing errors for simple string messages
        return this.http.post(`${this.apiUrl}/signup`, user, { responseType: 'text' });
    }

    login(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, user).pipe(
            tap((response: any) => {
                this.saveToken(response.accessToken);
                this.saveUser(response);
                this.currentUserSubject.next(response);
            })
        );
    }

    logout(): void {
        window.localStorage.clear();
        this.currentUserSubject.next(null);
    }

    public saveToken(token: string): void {
        window.localStorage.removeItem(this.tokenKey);
        window.localStorage.setItem(this.tokenKey, token);
    }

    public getToken(): string | null {
        return window.localStorage.getItem(this.tokenKey);
    }

    public saveUser(user: any): void {
        window.localStorage.removeItem(this.userKey);
        window.localStorage.setItem(this.userKey, JSON.stringify(user));
    }

    public getUser(): any {
        const user = window.localStorage.getItem(this.userKey);
        if (user) {
            try {
                return JSON.parse(user);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    public isLoggedIn(): boolean {
        const token = window.localStorage.getItem(this.tokenKey);
        return !!token;
    }
}
