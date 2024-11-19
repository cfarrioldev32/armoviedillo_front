import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { RegisterModel } from '../models/register.model';
import { LoginModel } from '../models/login.model';
import { AuthResponseModel } from '../models/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = `${environment.apiUrl}/users`;
  private authSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient, private router: Router) { }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.authSubject.asObservable();
  }


  register(registerData: RegisterModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registerData);
  }


  login(loginData: LoginModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.baseUrl}/login`, loginData).pipe(
      tap((response) => {
        localStorage.setItem('authToken', response.token);
        this.authSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authSubject.next(false); 
    this.router.navigate(['/auth/login']);
  }
}
