import { Component, inject, OnInit } from '@angular/core';
import { MoviesStore } from "./state/movies.store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MoviesStore],
})
export class HomeComponent implements OnInit {
  moviesStore = inject(MoviesStore);

  movies$ = this.moviesStore.movies$;
  loading$ = this.moviesStore.loading$;


  ngOnInit() {
    this.moviesStore.loadMovies();
  }
}
