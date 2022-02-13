import { Component, Input } from '@angular/core';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'queen',
  templateUrl: './queen.component.html',
  styleUrls: ['./queen.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: QueenComponent
    }
  ]
})
export class QueenComponent extends BasePawnChees implements IPawnChees {
  @Input() type!: IPawnCheesType;
  @Input() color!: IPawnTeam;

  setCheesBoxesMovable(board: CheesBox[][], row: number, column: number) {
    let _row = row + 1;
    let _column = column + 1;
    while(_row <= 7 && _column <= 7) {
      this.setCheesBoxStatus(board[_row][_column], this.color);
      if(!board[_row][_column].isMoveable) {
        break;
      } else {
        _row++;
        _column++;
      }
    }
    _row = row - 1;
    _column = column + 1;
    while(_row >= 0 && _column <= 7) {
      this.setCheesBoxStatus(board[_row][_column], this.color);
      if(!board[_row][_column].isMoveable) {
        break;
      } else {
        _row--;
        _column++;
      }
    }
    _row = row - 1;
    _column = column - 1;
    while(_row >= 0 && _column >= 0) {
      this.setCheesBoxStatus(board[_row][_column], this.color);
      if(!board[_row][_column].isMoveable) {
        break;
      } else {
        _row--;
        _column--;
      }
    }
    _row = row + 1;
    _column = column - 1;
    while(_row <= 7 && _column >= 0) {
      this.setCheesBoxStatus(board[_row][_column], this.color);
      if(!board[_row][_column].isMoveable) {
        break;
      } else {
        _row++;
        _column--;
      }
    }

    _row = row + 1;
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
    _column = column + 1;
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

    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color)
    }
    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color)
    }

    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color)
    }
    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color)
    }
  }
}
