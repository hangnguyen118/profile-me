import { inject, Injectable } from '@angular/core';
import { APP_SETTINGS } from '../../app.settings';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginModel } from '../../types/login-model';
import { RegisterModel } from '../../types/register-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = inject(APP_SETTINGS).apiUrl + '/api/auth';
  private userSubject = new BehaviorSubject<any | null>(null);
  user$: Observable<any|null> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(user: LoginModel): Observable<any>{
    return this.http.post<any>(this.authUrl+'/login', user).pipe(
      tap(response => {
        const userData = {
          fullName: response.user.fullName,
          email: response.user.email
        }
        this.userSubject.next(userData);
      })
    );
  }
  register(user: RegisterModel): Observable<any> {
    return this.http.post<any>(this.authUrl+'/register', user).pipe(
      tap(response => {
        alert("Register Success");
      })
    );
  }
  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(this.authUrl+'/forgot-password', email);
  }
  checkUserStatus() {
    const token = localStorage.getItem('token');
    if(!token) return;
    this.http.get<any>(`${this.authUrl}/me`).subscribe(
      user => this.userSubject.next(user),
      () => this.userSubject.next(null),
    )
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
