import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

type User = {
  userId: number,
  name: string,
  email: string,
  userType: 'COMMON' | 'ADMIN'
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private http = inject(HttpClient)
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
  }

  login(credentials: { email: string, password: string }) {
    return this.http.post<User>('/api/login', credentials).pipe(
      tap(user => this.currentUserSubject.next(user))
    );
  }

  logout() {
    this.currentUserSubject.next(null);
  }
}
