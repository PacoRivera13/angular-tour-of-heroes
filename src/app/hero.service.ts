import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

import { Hero } from "./hero";
import { HEROES } from "./mock-heroes";
import { MessageService } from "./message.service";

const httpOptions = {    
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  //private heroesUrl = 'api/heroes'; -- memory
  private heroesUrl = 'https://localhost:44381/api/heroes'; // local
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id = ${newHero.id}`)),
      catchError(this.handleError<Hero>('AddHero'))
    );
  }

  getHeroes(): Observable<Hero[]>
  {
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
          tap(s => this.log(`fetched heroes, total = ${s.length}`)),
          catchError(this.handleError<Hero[]>('getHeroes', []))
        );
  }

  getHeroe(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=> this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl,hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id =${hero.id}`)),
        catchError(this.handleError<any>('updatedHero'))
      );
  }

  deleteHero(hero: Hero | number) : Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
          .pipe(
            tap(_ => this.log(`deleted hero id = ${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
          );
  }

  searchHeroes(filter: string): Observable<Hero[]> {
    if(!filter.trim())
    {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${filter}`)
          .pipe(
            tap(_ => this.log(`found heroes matching "${filter}"`)),
            catchError(this.handleError<Hero[]>('', []))
          );
  }
  
  private handleError<T>(operation = 'operation', result? : T){
    return (error: any) : Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
