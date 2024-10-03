import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, catchError, tap, map } from 'rxjs/operators';
import { Character } from "../../../models/character.models";
import { SwapiService } from "../../../services/swapi.service";

export interface CharacterDetailsState {
  character: Character | null;
  films: any[];
  loading: boolean;
}

@Injectable()
export class CharacterDetailsStore extends ComponentStore<CharacterDetailsState> {
  swapiService = inject(SwapiService);

  constructor() {
    super({ character: null, films: [], loading: false });
  }

  readonly character$ = this.select(state => state.character);
  readonly films$ = this.select(state => state.films);
  readonly loading$ = this.select(state => state.loading);

  readonly loadCharacterDetails = this.effect((characterId$: Observable<string>) =>
    characterId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(id =>
        this.swapiService.getCharacterDetails(`https://swapi.dev/api/people/${id}/`).pipe(
          switchMap(character => {
            const filmsObservables = character.films.map(filmUrl =>
              this.swapiService.getFilmDetailsByUrl(filmUrl)
            );
            return forkJoin(filmsObservables).pipe(
              tap(films => this.patchState({ films })),
              map(() => character)
            );
          }),
          tap(character => this.patchState({ character, loading: false })),
          catchError(error => {
            console.error('Error loading character details:', error);
            this.patchState({ loading: false });
            return of(null);
          })
        )
      )
    )
  );
}
