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

getPopular(language: string = 'en-US', page: number = 1): Observable<any> {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=9e48c1f75a9af148785c9deba8810bb2&language=${language}&page=${page}`;
  return this.http.get(url);
}

getNowPlaying(language: string = 'en-US', page: number = 1): Observable<any> {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=9e48c1f75a9af148785c9deba8810bb2&language=en-US&page=1`;
  return this.http.get(url);
}

getMovieCredits(movieId: number): Observable<any> {
  return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=9e48c1f75a9af148785c9deba8810bb2`);
}
}
