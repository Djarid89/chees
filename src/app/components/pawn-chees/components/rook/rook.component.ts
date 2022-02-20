import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor, ICheesBoardColor, TypeOfControl } from '../../../../shared/interface/shared';
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
  @Input() firstMove?: boolean;
  updateAllCanEatableSubs!: Subscription;
  @Input() dead = false;
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
      next: (data: IBoardColor) => {
        if(data.color === this.color) {
          this.setCheesBoxesCanEat(data.board);

          if(data.typeOfControl === TypeOfControl.kingIsSafe) {
            this.connector.isMyKingSafe$.next();
          } else if(data.typeOfControl === TypeOfControl.opponentKingIsCaptured) {
            this.connector.isOppositeKingCaptured$.next();
          } else if(data.typeOfControl === TypeOfControl.defenderCannotFreeKing) {
            this.connector.isAllCanEatabled$.next(data);
          }
        }
      }
    });
    this.tryDefendKing = this.connector.tryDefendKing$.subscribe({
      next: (cheesBoardColor: ICheesBoardColor) => {
        if(cheesBoardColor.color === this.color) {
          super.tryAllPossibleMove(cheesBoardColor, this);
        }
      }
    });
  }

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number, canBeEatable = false) {
    let _row = row + 1;
    while(_row <= 7) {
      this.setCheesBoxStatus(board[_row][column], this.color, canBeEatable);
      if(board[_row][column].pawnChees?.type !== undefined) {
        break;
      } else {
        _row++;
      }
    }
    _row = row - 1;
    while(_row >= 0) {
      this.setCheesBoxStatus(board[_row][column], this.color, canBeEatable);
      if(board[_row][column].pawnChees?.type !== undefined) {
        break;
      } else {
        _row--;
      }
    }
    let _column = column + 1;
    while(_column <= 7) {
      this.setCheesBoxStatus(board[row][_column], this.color, canBeEatable);
      if(board[row][_column].pawnChees?.type !== undefined) {
        break;
      } else {
        _column++;
      }
    }
    _column = column - 1;
    while(_column >= 0) {
      this.setCheesBoxStatus(board[row][_column], this.color, canBeEatable);
      if(board[row][_column].pawnChees?.type !== undefined) {
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
