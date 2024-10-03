import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Character } from "../../models/character.models";
import { CharacterDetailsStore } from "./state/character-details.store";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
  providers: [CharacterDetailsStore],
})
export class CharacterDetailsComponent implements OnInit {
  characterDetailsStore = inject(CharacterDetailsStore);
  route = inject(ActivatedRoute);

  character$: Observable<Character | null> = this.characterDetailsStore.character$;
  films$: Observable<any[]> = this.characterDetailsStore.films$;
  loading$: Observable<boolean> = this.characterDetailsStore.loading$;

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.characterDetailsStore.loadCharacterDetails(id);
        }
        return this.characterDetailsStore.character$;
      })
    ).subscribe();
  }
}
