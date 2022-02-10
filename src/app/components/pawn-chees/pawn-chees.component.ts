import { Component, OnInit } from '@angular/core';
import { IPawnChees, IPawnTeam } from './interface/pawn-chees';

@Component({
  selector: 'pawn-chees',
  templateUrl: './pawn-chees.component.html',
  styleUrls: ['./pawn-chees.component.scss']
})
export class PawnCheesComponent implements IPawnChees {
  color!: IPawnTeam;

  constructor() { }

  selected() {
    console.log('Fai roba');
  }

  unselected() {
    console.log('Fai roba');
  }

  eat() {
    console.log('Fai roba');
  }

  beEat() {
    console.log('Fai roba');
  }
}
