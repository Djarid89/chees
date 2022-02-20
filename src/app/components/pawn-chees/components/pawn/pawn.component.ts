import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cheesboard } from 'src/app/components/chessboard/class/cheesBoard';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor, ICheesBoardColor, TypeOfControl } from '../../../../shared/interface/shared';
import { CheesBox, PawnChees } from '../../../chees-box/class/chees-box';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: PawnComponent
    }
  ]
})
export class PawnComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
  @Input() row!: number;
  @Input() column!: number;
  @Input() type!: IPawnCheesType | undefined;
  @Input() color: IPawnTeam  | undefined;
  @Input() doubleMove: boolean  | undefined;
  updateAllCanEatableSubs!: Subscription;
  tryDefendKing! : Subscription;
  doResurrect!: Subscription;

  constructor(readonly connector: ConnectorService) {
    super(connector);
  }

  ngOnDestroy(): void {
    this.updateAllCanEatableSubs.unsubscribe();
    this.tryDefendKing.unsubscribe();
    if(this.doResurrect) {
      this.doResurrect.unsubscribe();
    }
  }

  ngOnInit(): void {
    if((this.color === IPawnTeam.white && this.row === 0) || (this.color === IPawnTeam.black && this.row === 7)) {
      this.connector.showModal$.next({title: `RESURRECT CHEES PAWN`, text: `Choose a chees pawn to resurrect`, graveyard: Cheesboard.graveyard, height: 300, width: 700 });
      this.doResurrect = this.connector.doResurrect$.subscribe({
        next: (type: IPawnCheesType) => {
          this.type = type;
        }
      });
    }
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

  setCheesBoxesStatus(board: CheesBox[][], row: number, column: number): void {
    const _row = this.color === IPawnTeam.black ? row + 1 : row - 1;
    const _doubleRow = this.color === IPawnTeam.black ? row + 2 : row - 2;
    if(_row <= 7 && _row >= 0) {
      board[_row][column].isMoveable = board[_row][column].pawnChees === null;
      if(column + 1 <= 7) {
        board[_row][column + 1].isEatable = this.isOppositeColor(board[_row][column + 1], this.color);
      }
      if(column - 1 >= 0) {
        board[_row][column - 1].isEatable = this.isOppositeColor(board[_row][column - 1], this.color);
      }
    }
    if(this.doubleMove && (_doubleRow <= 7 && _doubleRow >= 0)) {
      board[_doubleRow][column].isMoveable = board[_doubleRow][column].pawnChees === null;
    }
}

  setCheesBoxesCanEat(board: CheesBox[][]): void {
    const _row = this.color === IPawnTeam.black ? this.row + 1 : this.row - 1;
    if(_row <= 7 && _row >= 0) {
      if(this.column + 1 <= 7) {
        board[_row][this.column + 1].canBeEatable = true;
      }
      if(this.column - 1 >= 0) {
        board[_row][this.column - 1].canBeEatable = true;
      }
    }
  }
}
