import { Component, OnInit } from '@angular/core';
import { IPawnMove } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss']
})
export class KingComponent extends PawnCheesComponent implements OnInit, IPawnMove {

  constructor() {
    super();
  }

  move() {

  }

  ngOnInit(): void {
  }

}
