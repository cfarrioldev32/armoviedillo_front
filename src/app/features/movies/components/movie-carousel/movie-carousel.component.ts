import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movies.model';

@Component({
  selector: 'app-movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css']
})
export class MovieCarouselComponent {
  selectedMovie: Movie | null = null;
  visible: boolean = false;
  credits: any
  @Input() movies: Movie[] = [];
  @Input() responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];
  defaultImage: string = 'assets/images/no_image_available.jpg';

  showDialog(movie: Movie): void {
    this.selectedMovie = movie;
    this.visible = true;
  }

  hideDialog(): void {
    this.visible = false;
    this.selectedMovie = null;
  }

}
