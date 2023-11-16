import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment"

export type UserType = "ADMIN" | "COMMON"


export type User = {
    userId: number,
    name: string,
    email: string,
    userType: UserType,
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient)
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
    }

    login(credentials: { email: string, password: string }) {
        return this.http.post<User>(`${environment.API}/login`, credentials).pipe(
            tap(user => this.currentUserSubject.next(user)),
            catchError(err => {
                return throwError(() => err);
            })
        );
    }

    logout() {
        this.currentUserSubject.next(null);
    }

    signUp(email: string, password: string, name: string, userType: UserType) {
        return this.http.post<User>(`${environment.API}/signup`, {email, password, name, userType}).pipe(
            tap(user => this.currentUserSubject.next(user)),
            catchError(err => {
                if (err.status === 409) {
                    return throwError(() => new Error("Email already in use!"))
                }
                return throwError(() => err);
            })
        )
    }
}
