import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';

import { CarouselModule } from 'primeng/carousel';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';

import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieCarouselComponent } from './components/movie-carousel/movie-carousel.component';
import { MovieDetailsModalComponent } from './components/movie-details-modal/movie-details-modal.component';

import { LazyLoadImageModule } from 'ng-lazyload-image';

import { MoviesService } from './services/movies.service';

@NgModule({
  declarations: [
    MovieListComponent,
    MovieCarouselComponent,
    MovieDetailsModalComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    CarouselModule,
    RatingModule,
    DialogModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LazyLoadImageModule
    
  ],
  providers: [MoviesService],
})
export class MoviesModule { }
