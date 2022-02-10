import { Component, OnInit } from '@angular/core';
import { IPawnMove } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss']
})
export class KnightComponent extends PawnCheesComponent implements OnInit, IPawnMove {

  constructor() {
    super();
  }

  move() {

  }

  ngOnInit(): void {
  }

}
