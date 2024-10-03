import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { MovieDetailsComponent } from "./components/movie-details/movie-details.component";
import { CharacterDetailsComponent } from "./components/character-details/character-details.component";

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    MovieDetailsComponent,
    CharacterDetailsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
