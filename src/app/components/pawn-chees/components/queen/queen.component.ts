import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor, ICheesBoardColor } from '../../../../shared/interface/shared';
import { CheesBox } from '../../../chees-box/class/chees-box';
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
export class QueenComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
  @Input() row!: number;
  @Input() column!: number;
  @Input() type!: IPawnCheesType | undefined
  @Input() color!: IPawnTeam | undefined;
  updateAllCanEatableSubs!: Subscription;
  tryDefendKing! : Subscription;

  constructor(readonly connector: ConnectorService) {
    super(connector);
  }

  ngOnDestroy(): void {
    this.updateAllCanEatableSubs.unsubscribe();
    this.tryDefendKing.unsubscribe();
  }

  ngOnInit(): void {
    this.updateAllCanEatableSubs = this.connector.updateAllCanBeEatable$.subscribe({
      next: (boardColor: IBoardColor) => {
        if(boardColor.color === this.color) {
          this.setCheesBoxesCanEat(boardColor.board);
        }
      }
    });
    this.tryDefendKing = this.connector.tryDefendKing$.subscribe({
      next: (cheesBoardColor: ICheesBoardColor) => {
        if(cheesBoardColor.color === this.color) {
          super.tryAllPossibleMove(cheesBoardColor, this, this.connector.updateAllCanBeEatable$);
        }
      }
    });
  }

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number, canBeEatable = false) {
    let _row = row + 1;
    let _column = column + 1;
    while(_row <= 7 && _column <= 7) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row++;
        _column++;
      }
    }
    _row = row - 1;
    _column = column + 1;
    while(_row >= 0 && _column <= 7) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row--;
        _column++;
      }
    }
    _row = row - 1;
    _column = column - 1;
    while(_row >= 0 && _column >= 0) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row--;
        _column--;
      }
    }
    _row = row + 1;
    _column = column - 1;
    while(_row <= 7 && _column >= 0) {
      this.setCheesBoxStatus(board[_row][_column], this.color, canBeEatable);
      if(board[_row][_column].pawnChees !== null) {
        break;
      } else {
        _row++;
        _column--;
      }
    }

    _row = row + 1;
    while(_row <= 7) {
      this.setCheesBoxStatus(board[_row][column], this.color, canBeEatable);
      if(board[_row][column].pawnChees !== null) {
        break;
      } else {
        _row++;
      }
    }
    _row = row - 1;
    while(_row >= 0) {
      this.setCheesBoxStatus(board[_row][column], this.color, canBeEatable);
      if(board[_row][column].pawnChees !== null) {
        break;
      } else {
        _row--;
      }
    }
    _column = column + 1;
    while(_column <= 7) {
      this.setCheesBoxStatus(board[row][_column], this.color, canBeEatable);
      if(board[row][_column].pawnChees !== null) {
        break;
      } else {
        _column++;
      }
    }
    _column = column - 1;
    while(_column >= 0) {
      this.setCheesBoxStatus(board[row][_column], this.color, canBeEatable);
      if(board[row][_column].pawnChees !== null) {
        break;
      } else {
        _column--;
      }
    }

    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color, canBeEatable)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color, canBeEatable)
    }
    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color, canBeEatable)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color, canBeEatable)
    }

    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color, canBeEatable)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 2], this.color, canBeEatable)
    }
    if(row + 1 <= 7 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column + 2 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 2], this.color, canBeEatable)
    }
    if(row - 1 >= 0 && column - 2 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 2], this.color, canBeEatable)
    }
    if(row + 2 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 2][column + 1], this.color, canBeEatable)
    }
    if(row + 2 <= 7 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 2][column - 1], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 2][column + 1], this.color, canBeEatable)
    }
    if(row - 2 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 2][column - 1], this.color, canBeEatable)
    }
  }

  setCheesBoxesCanEat(board: CheesBox[][]) {
    this.setCheesBoxesStatus(board, this.row, this.column, true)
  }


}
