import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Movie } from "../../models/movie.models";
import { Character } from "../../models/character.models";
import { MovieDetailsStore } from "./state/movie-details.store";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  providers: [MovieDetailsStore],
})
export class MovieDetailsComponent implements OnInit {
  movieDetailsStore =  inject(MovieDetailsStore);
  route = inject(ActivatedRoute);

  movie$: Observable<Movie | null> = this.movieDetailsStore.movie$;
  characters$: Observable<Character[]> = this.movieDetailsStore.characters$;
  loading$: Observable<boolean> = this.movieDetailsStore.loading$;


  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          return this.movieDetailsStore.loadMovieDetails(id);
        }
        return of(null);
      })
    ).subscribe();
  }

  getCharacterId(url: string) {
    return url.split('/').filter(part => part).pop();
  }
}
