import { Component, EventEmitter, Input, OnChanges, SimpleChanges, Output } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { PageEvent } from '@angular/material/paginator';
import { Movie } from '../../models/movies.model';
import { Credit, CreditResponse } from '../../models/credits.model';

@Component({
  selector: 'app-movie-details-modal',
  templateUrl: './movie-details-modal.component.html',
  styleUrls: ['./movie-details-modal.component.css']
})
export class MovieDetailsModalComponent implements OnChanges {
  @Input() selectedMovie: Movie | null = null;
  @Input() credits: CreditResponse | null = null;
  @Input() visible: boolean = false;
  @Output() close = new EventEmitter<void>(); 

  paginatedCredits: Credit[] = [];
  defaultImage: string = 'assets/images/no_image_available.jpg';
  pageSize: number = 3;
  pageIndex: number = 0;

  constructor(private movieService: MoviesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedMovie'] && this.selectedMovie) {
      if (!this.credits?.cast?.length || this.credits?.cast[0]?.id !== this.selectedMovie.id) {
        this.movieService.getMovieCredits(this.selectedMovie.id).subscribe((credits: CreditResponse) => {
          this.credits = credits; 
          this.updatePaginatedCredits();
        });
      } else {
        this.updatePaginatedCredits();
      }
    }
  }

  updatePaginatedCredits(): void {
    if (this.credits?.cast) { 
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedCredits = this.credits.cast.slice(startIndex, endIndex);
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedCredits();
  }
}
