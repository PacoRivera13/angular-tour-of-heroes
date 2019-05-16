import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";

import { Hero } from "./hero";

@Injectable({
  providedIn: 'root'
})

export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const heroes = [
    { id: 11, name: "Capitan America", active: true },
    { id: 12, name: "Ironman", active: true },
    { id: 13, name: "Black-Widow", active: false },
    { id: 14, name: "Chapulin", active: true },
    { id: 15, name: "Hulk", active: true },
    { id: 16, name: "Ant-man", active: true },
    { id: 17, name: "Spiderman", active: true },
    { id: 18, name: "Thor", active: true },
    { id: 19, name: "Loki", active: false },
    { id: 20, name: "Valkiria", active: false },
    { id: 21, name: "Thanos", active: false },
    ];
    return {heroes};
  }
  
  
  getId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) +1 : 11;
  }
}
