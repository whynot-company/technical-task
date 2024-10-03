import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { CharacterDetailsComponent } from "./components/character-details/character-details.component";

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  { path: 'movies', component: HomeComponent },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'characters/:id', component: CharacterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
