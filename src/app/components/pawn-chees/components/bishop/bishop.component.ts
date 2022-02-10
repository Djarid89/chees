import { Component, OnInit } from '@angular/core';
import { IPawnMove } from '../../interface/pawn-chees';
import { PawnCheesComponent } from '../../pawn-chees.component';

@Component({
  selector: 'bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.scss']
})
export class BishopComponent extends PawnCheesComponent implements OnInit, IPawnMove {

  constructor() {
    super();
  }

  move() {

  }

  ngOnInit(): void {
  }

}
