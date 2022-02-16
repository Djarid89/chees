import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor, ICheesBoardColor } from '../../../../shared/interface/shared';
import { CheesBox } from '../../../chees-box/class/chees-box';
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
export class RookComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
  @Input() row!: number;
  @Input() column!: number;
  @Input() type!: IPawnCheesType | undefined
  @Input() color!: IPawnTeam | undefined;
  updateAllCanEatSubs!: Subscription;
  tryDefendKing! : Subscription;

  constructor(private readonly connector: ConnectorService) {
    super();
  }

  ngOnDestroy(): void {
    this.updateAllCanEatSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.updateAllCanEatSubs = this.connector.updateAllCanEat$.subscribe({
      next: (boardColor: IBoardColor) => {
        if(boardColor.color === this.color) {
          this.setCheesBoxesCanEat(boardColor.board);
        }
      }
    });
    this.tryDefendKing = this.connector.tryDefendKing$.subscribe({
      next: (cheesBoardColor: ICheesBoardColor) => {
        if(cheesBoardColor.color === this.color && this.isKingBlocked(cheesBoardColor, this, this.connector.updateAllCanEat$)) {
          this.connector.kingIsBlock$.next();
        }
      }
    });
  }

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number, canBeEatable = false) {
    let _row = row + 1;
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
    let _column = column + 1;
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
  }

  setCheesBoxesCanEat(board: CheesBox[][]) {
    this.setCheesBoxesStatus(board, this.row, this.column, true)
  }


}
