import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../../../service/connector.service';
import { IBoardColor, ICheesBoardColor, TypeOfControl } from '../../../../shared/interface/shared';
import { CheesBox } from '../../../chees-box/class/chees-box';
import { BasePawnChees } from '../../class/base-pawn-chees';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../../interface/pawn-chees';
import { PAWN_CHEES } from '../pawn-chees.token';

@Component({
  selector: 'king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss'],
  providers: [
    {
      provide: PAWN_CHEES,
      useExisting: KingComponent
    }
  ]
})
export class KingComponent extends BasePawnChees implements OnInit, OnDestroy, IPawnChees {
  @Input() row!: number;
  @Input() column!: number;
  @Input() type!: IPawnCheesType | undefined
  @Input() color!: IPawnTeam | undefined;
  @Input() dead = false;
  @Input() firstMove?: boolean;
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
    if(row + 1 <= 7 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column + 1], this.color, canBeEatable, true);
    }
    if(column + 1 <= 7) {
      this.setCheesBoxStatus(board[row][column + 1], this.color, canBeEatable, true);
    }
    if(row - 1 >= 0 && column + 1 <= 7) {
      this.setCheesBoxStatus(board[row - 1][column + 1], this.color, canBeEatable, true);
    }
    if(row - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column], this.color, canBeEatable, true);
    }
    if(row - 1 >= 0 && column - 1 >= 0) {
      this.setCheesBoxStatus(board[row - 1][column - 1], this.color, canBeEatable, true);
    }
    if(column - 1 >= 0) {
      this.setCheesBoxStatus(board[row][column - 1], this.color, canBeEatable, true);
    }
    if(row + 1 <= 7 &&  column - 1 >= 0) {
      this.setCheesBoxStatus(board[row + 1][column - 1], this.color, canBeEatable, true);
    }
    if(row + 1 <= 7) {
      this.setCheesBoxStatus(board[row + 1][column], this.color, canBeEatable, true);
    }
    if(this.firstMove && !board[this.row][this.column].isEatable) {
      const towerCheesBox = this.canLeftCastling(board);
      towerCheesBox.forEach((tower: CheesBox) => {
        if(tower.column === 0) {
          if(this.column - 2 >= 0) {
            this.setCheesBoxStatus(board[this.row][this.column - 2], this.color, canBeEatable, true);
          }
        } else {
          if(this.column + 2 <= 7) {
            this.setCheesBoxStatus(board[this.row][this.column + 2], this.color, canBeEatable, true);
          }
        }
      });
    }
  }

  canLeftCastling(board: CheesBox[][]): CheesBox[] {
    const result = [];
    let _column = this.column - 1;
    while(_column >= 0) {
      const pawnChees = board[this.row][_column].pawnChees;
      if(pawnChees !== null) {
        if(pawnChees.color === this.color && pawnChees.type === IPawnCheesType.rook && pawnChees.firstMove) {
          result.push(board[this.row][_column]);
        } else {
          break;
        }
      }
      _column--;
    }
    _column = this.column + 1;
    while(_column <= 7) {
      const pawnChees = board[this.row][_column].pawnChees;
      if(pawnChees !== null) {
        if(pawnChees.color === this.color && pawnChees.type === IPawnCheesType.rook && pawnChees.firstMove) {
          result.push(board[this.row][_column]);
        } else {
          break;
        }
      }
      _column++;
    }

    return result;
  }

  setCheesBoxesCanEat(board: CheesBox[][]) {
    this.setCheesBoxesStatus(board, this.row, this.column, true)
  }
}
