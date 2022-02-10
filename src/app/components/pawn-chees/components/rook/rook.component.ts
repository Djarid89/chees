import { Component, OnInit } from '@angular/core';
import { IPawnMove } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.scss']
})
export class RookComponent extends PawnCheesComponent implements OnInit, IPawnMove {

  constructor() {
    super();
  }

  move() {

  }

  ngOnInit(): void {
  }

}
