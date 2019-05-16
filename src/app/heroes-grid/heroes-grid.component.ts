import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes-grid',
  templateUrl: './heroes-grid.component.html',
  styleUrls: ['./heroes-grid.component.css']
})
export class HeroesGridComponent implements OnInit {

  heroes : Hero[];
  
  constructor(private heroService: HeroService) 
  {
  }

  ngOnInit() {
    this.getData();
  }

  getData(): void{
    this.heroService.getHeroes()
      .subscribe(h => this.heroes = h);
  }
}
