import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Movie } from "../../../models/movie.models";
import { Character } from "../../../models/character.models";
import { SwapiService } from "../../../services/swapi.service";

export interface MovieDetailsState {
  movie: Movie | null;
  characters: Character[];
  loading: boolean;
}

@Injectable()
export class MovieDetailsStore extends ComponentStore<MovieDetailsState> {
  swapiService = inject(SwapiService);

  constructor() {
    super({ movie: null, characters: [], loading: false });
  }

  readonly movie$ = this.select(state => state.movie);
  readonly characters$ = this.select(state => state.characters);
  readonly loading$ = this.select(state => state.loading);

  loadMovieDetails(id: string): Observable<Movie | null> {
    this.patchState({ loading: true });
    return this.swapiService.getFilmDetails(id).pipe(
      tap(movie => {
        this.patchState({ movie, loading: false });
        this.loadCharacters(movie.characters);
      }),
      catchError(error => {
        console.error('Error loading movie', error);
        this.patchState({ loading: false });
        return of(null);
      })
    );
  }

  private loadCharacters(characterUrls: string[]): void {
    if (characterUrls && characterUrls.length) {
      forkJoin(characterUrls.map(url => this.swapiService.getCharacterDetails(url))).subscribe(
        characters => this.patchState({ characters }),
        error => console.error('Error loading characters', error)
      );
    }
  }
}
