import { Component, Input, OnInit } from '@angular/core';
import { Cheesboard } from '../chessboard/class/cheesBoard';
import { IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'read-only-cheesboard',
  templateUrl: './read-only-cheesboard.component.html',
  styleUrls: ['./read-only-cheesboard.component.scss']
})
export class ReadOnlyCheesboardComponent implements OnInit {
  @Input() cheesboard?: Cheesboard;
  number = ['8','7','6','5','4','3','2','1'];
  letter = ['A','B','C','D','E','F','G','H'];
  IPawnCheesType = IPawnCheesType;

  constructor() { }

  ngOnInit(): void {
  }

  isPair(row: number, column: number): boolean {
    return (row + column) % 2 === 0;
  }
}
