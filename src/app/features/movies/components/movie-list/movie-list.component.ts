import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { MovieResponse } from '../../models/movies.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  nowPlayingMovies: any[] = [];
  popularMovies: any[] = [];
  isLoadingNowPlaying: boolean = false;  
  isLoadingPopular: boolean = false; 

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.isLoadingNowPlaying = true;
    this.movieService.getNowPlaying().subscribe((movies: MovieResponse) => {
      this.nowPlayingMovies = movies.results;
      this.isLoadingNowPlaying = false;
    });

    this.isLoadingPopular = true;
    this.movieService.getPopular().subscribe((movies: MovieResponse) => {
      this.popularMovies = movies.results;
      this.isLoadingPopular = false;
    });
  }

  refreshNowPlaying(): void {
    this.fetchMovies();
  }

  refreshPopular(): void {
    this.fetchMovies();
  }
}
