import { Component, OnInit } from '@angular/core';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes-grid',
  templateUrl: './heroes-grid.component.html',
  styleUrls: ['./heroes-grid.component.css']
})
export class HeroesGridComponent implements OnInit {

  public data: Object[] = [];

  ngOnInit() {
    this.data = HEROES;
  }
}
