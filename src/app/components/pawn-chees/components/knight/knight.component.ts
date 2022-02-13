import { Component, Input, OnInit } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'knight',
  templateUrl: './knight.component.html',
  styleUrls: ['./knight.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: KnightComponent
    }
  ]
})
export class KnightComponent extends BasePawnChees implements IPawnChees {
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;

  setCheesBoxesMovable(board: CheesBox[][], row: number, column: number) {
    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setMovable(board[row + 2][column + 1])
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setMovable(board[row + 2][column - 1])
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setMovable(board[row + 1][column + 2])
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setMovable(board[row - 1][column + 2])
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setMovable(board[row - 2][column + 1])
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setMovable(board[row - 2][column - 1])
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setMovable(board[row + 1][column - 2])
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setMovable(board[row - 1][column - 2])
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setMovable(board[row + 1][column + 2])
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setMovable(board[row + 1][column - 2])
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setMovable(board[row - 1][column + 2])
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setMovable(board[row - 1][column - 2])
    }
    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setMovable(board[row + 2][column + 1])
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setMovable(board[row + 2][column - 1])
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setMovable(board[row - 2][column + 1])
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setMovable(board[row - 2][column - 1])
    }
  }
}
