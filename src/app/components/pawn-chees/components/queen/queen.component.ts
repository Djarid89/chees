import { Component, OnInit } from '@angular/core';
import { IPawnMove } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.scss']
})
export class QueenComponent extends PawnCheesComponent implements OnInit, IPawnMove {

  constructor() {
    super();
  }

  move() {

  }

  ngOnInit(): void {
  }

}
