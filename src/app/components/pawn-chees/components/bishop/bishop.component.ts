import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CheesBox } from 'src/app/components/chees-box/class/chees-box';
import { IBoardColor, ICheesBoardColor, TypeOfControl } from 'src/app/shared/interface/shared';
import { ConnectorService } from '../../../../service/connector.service';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'bishop',
  templateUrl: './bishop.component.html',
  styleUrls: ['./bishop.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: BishopComponent
    }
  ]
})
export class BishopComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
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
      next: (data: IBoardColor) => {
        if(data.color === this.color) {
          this.setCheesBoxesCanEat(data.board);

          if(data.typeOfControl === TypeOfControl.kingIsSafe) {
            this.connector.isMyKingSafe$.next();
          } else if(data.typeOfControl === TypeOfControl.opponentKingIsCaptured) {
            this.connector.isOppositeKingCaptured$.next();
          } else if(data.typeOfControl === TypeOfControl.defenderCannotFreeKing) {
            this.connector.isAllCanEatabled$.next();
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
  }

  setCheesBoxesCanEat(board: CheesBox[][]) {
    this.setCheesBoxesStatus(board, this.row, this.column, true)
  }
}
