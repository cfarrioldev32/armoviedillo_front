import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl = `${environment.apiUrl}/movies`;

  constructor(private http: HttpClient) {}

  getPopular(): Observable<any> {
    return this.http.get(`${this.baseUrl}/popular`);
  }

  getNowPlaying(): Observable<any> {
    return this.http.get(`${this.baseUrl}/now-playing`);
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/credits/${movieId}`);
  }
}
