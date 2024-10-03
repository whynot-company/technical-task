import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ComponentStore } from "@ngrx/component-store";
import { SwapiService } from "../../../services/swapi.service";

export interface MoviesState {
  movies: any[];
  loading: boolean;
}

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  swapiService = inject(SwapiService);

  constructor() {
    super({ movies: [], loading: false });
  }

  readonly movies$ = this.select(state => state.movies);
  readonly loading$ = this.select(state => state.loading);

  readonly loadMovies = this.effect((trigger$: Observable<void>) =>
    trigger$.pipe(
      switchMap(() => {
        this.patchState({ loading: true });
        return this.swapiService.getFilms().pipe(
          tap(movies => this.patchState({ movies, loading: false })),
          catchError((error) => {
            console.error('Failed to load movies', error);
            this.patchState({ loading: false });
            return of([]);
          })
        );
      })
    )
  );
}
