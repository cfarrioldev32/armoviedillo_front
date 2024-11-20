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
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?api_key=9e48c1f75a9af148785c9deba8810bb2&language=en-US&page=1`);
  }

  getNowPlaying(): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/now-playing?api_key=9e48c1f75a9af148785c9deba8810bb2&language=en-US&page=1`);
  }

  getMovieCredits(movieId: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/{movieId}/credits?api_key=9e48c1f75a9af148785c9deba8810bb2`);
  }
}
