import { Component, Input } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'rook',
  templateUrl: './rook.component.html',
  styleUrls: ['./rook.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: RookComponent
    }
  ]
})
export class RookComponent extends BasePawnChees implements IPawnChees {
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;

  setCheesBoxesMovable(board: CheesBox[][], row: number, column: number) {
    let _row = row + 1;
    while(_row <= 7) {
      this.setCheesBoxStatus(board[_row][column], this.color);
      if(!board[_row][column].isMoveable) {
        break;
      } else {
        _row++;
      }
    }
    _row = row - 1;
    while(_row >= 0) {
      this.setCheesBoxStatus(board[_row][column], this.color);
      if(!board[_row][column].isMoveable) {
        break;
      } else {
        _row--;
      }
    }
    let _column = column + 1;
    while(_column <= 7) {
      this.setCheesBoxStatus(board[row][_column], this.color);
      if(!board[row][_column].isMoveable) {
        break;
      } else {
        _column++;
      }
    }
    _column = column - 1;
    while(_column >= 0) {
      this.setCheesBoxStatus(board[row][_column], this.color);
      if(!board[row][_column].isMoveable) {
        break;
      } else {
        _column--;
      }
    }
  }
}
