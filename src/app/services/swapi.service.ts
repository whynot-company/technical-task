import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from "../models/movie.models";
import { Character } from "../models/character.models";

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  private baseUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) {}

  getFilms(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/films`).pipe(
      map(response => response.results)
    );
  }

  getFilmDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/films/${id}`)
  }

  getCharacterDetails(url: string): Observable<Character> {
    return this.http.get<any>(url);
  }

  getFilmDetailsByUrl(filmUrl: string): Observable<any> {
    return this.http.get<any>(filmUrl).pipe(
      map(film => ({
        ...film,
        id: filmUrl.split('/').filter(part => part).pop()
      }))
    );
  }
}
