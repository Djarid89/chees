import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
import { Action, IFromToCheesBox, TypeOfControl } from '../../shared/interface/shared';
import { CheesBox } from '../chees-box/class/chees-box';
import { IPawnChees, IPawnCheesType, IPawnTeam } from '../pawn-chees/interface/pawn-chees';
import { Cheesboard } from './class/cheesBoard';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit, OnDestroy {
  cheesboard!: Cheesboard;
  number = ['8','7','6','5','4','3','2','1'];
  letter = ['A','B','C','D','E','F','G','H'];
  currentTeam = IPawnTeam.white;
  kingIsBlockCounter!: number;
  counter!: number;

  removeAllMovableSubs!: Subscription;
  movePawnCheesSub!: Subscription;
  kingIsBlockSub!: Subscription;
  gameIsOverSub!: Subscription;
  showAvaibleMovement!: Subscription;
  isMyKingSafeSub!: Subscription;
  isOppositeKingCapturedSub!: Subscription;
  resurrectSub!: Subscription;
  fromToCheesBox!: IFromToCheesBox;

  constructor(private readonly connector: ConnectorService) { }

  ngOnDestroy(): void {
    this.removeAllMovableSubs.unsubscribe();
    this.movePawnCheesSub.unsubscribe();
    this.kingIsBlockSub.unsubscribe();
    this.gameIsOverSub.unsubscribe();
    this.showAvaibleMovement.unsubscribe();
    this.isMyKingSafeSub.unsubscribe();
    this.isOppositeKingCapturedSub.unsubscribe();
    this.resurrectSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initTeams();
    setTimeout(() => {
      this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
      this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.cheesboard.getOppositeTeam(this.currentTeam) });
    });

    this.resurrectSub = this.connector.resurrect$.subscribe({
      next: (pawnChees: IPawnChees) => {
        const cheesBox = this.cheesboard.board[pawnChees.row][pawnChees.column];
        if(cheesBox && cheesBox.pawnChees) {
          cheesBox.pawnChees.type = pawnChees.type;
        }
      }
    });

    this.showAvaibleMovement = this.connector.showAvaibleMovement$.subscribe({
      next: (pawnChees: IPawnChees) => {
        if(this.currentTeam === pawnChees.color) {
          pawnChees.setCheesBoxesStatus(this.cheesboard?.board, pawnChees.row, pawnChees.column);
        }
      }
    });

    this.removeAllMovableSubs = this.connector.removeAllMovable$.subscribe({
      next: () => this.cheesboard.removeIsMovableAndIsEatable()
    });

    this.kingIsBlockSub = this.connector.kingIsBlock$.subscribe({
      next: () => {
        const oppositeTeam = this.cheesboard.getOppositeTeam(this.currentTeam);
        this.kingIsBlockCounter++;
        if(this.kingIsBlockCounter === this.cheesboard.getNumberPawnChees(oppositeTeam)) {
          this.connector.gameIsOver$.next();
        }
      }
    });

    this.gameIsOverSub = this.connector.gameIsOver$.subscribe({
      next: () => {
        this.connector.showModal$.next({
          title: `GAME IS OVER`,
          text: `Team ${this.cheesboard.getOppositeTeam(this.currentTeam)} win!!!`,
          cheesBoard: this.cheesboard,
          height: 200,
          width: 400
        });
      }
    });

    this.isOppositeKingCapturedSub = this.connector.isOppositeKingCaptured$.subscribe({
      next: () => {
        if(!this.allPawnCheesHasEmitted(this.currentTeam)) {
          return;
        }
        const oppositeTeam = this.cheesboard.getOppositeTeam(this.currentTeam);
        const oppositeKing = Cheesboard.getKing(this.cheesboard.board, oppositeTeam);
        if(oppositeKing.canBeEatable) {
          this.connector.showModal$.next({
            title: `KING IS UNDER CHECK`,
            text: `${oppositeTeam === IPawnTeam.black ? 'Black' : 'White'} king under check`,
            height: 180,
            width: 500,
            ttl: 3000
          });
          this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
          this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam, typeOfControl: TypeOfControl.opponentKingIsCaptured })
          setTimeout(() => {
            this.kingIsBlockCounter = 0;
            this.connector.tryDefendKing$.next({ cheesboard: this.cheesboard, color: oppositeTeam });
            this.passTurn(oppositeTeam);
          });
        } else {
          this.passTurn(oppositeTeam);
        }
      }
    });

    this.isMyKingSafeSub = this.connector.isMyKingSafe$.subscribe({
      next: () => {
        const oppositeTeam = this.cheesboard.getOppositeTeam(this.currentTeam);
        if(!this.allPawnCheesHasEmitted(oppositeTeam)) {
          return;
        }
        const myKing = Cheesboard.getKing(this.cheesboard.board, this.currentTeam);
        if(myKing.canBeEatable) {
          this.connector.showModal$.next({ title: `UNDO MOVE`, text: `Your move discovered the king`, height: 200, width: 400, ttl: 3000 });
          if(this.fromToCheesBox.action === Action.move) {
            this.cheesboard.movePawnChees(this.fromToCheesBox.toCheesBox, this.fromToCheesBox.fromCheesBox);
          } else {
            this.cheesboard.swapPawnChees(this.fromToCheesBox.fromCheesBox, this.fromToCheesBox.toCheesBox, this.connector);
          }
        } else {
          this.counter = 0;
          this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
          this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam, typeOfControl: TypeOfControl.opponentKingIsCaptured })
        }
      }
    });

    this.movePawnCheesSub = this.connector.movePawnChees$.subscribe({
      next: (fromToCheesBox: IFromToCheesBox) => {
        this.fromToCheesBox = fromToCheesBox;
        const from = fromToCheesBox.fromCheesBox;
        const to = fromToCheesBox.toCheesBox;
        if(fromToCheesBox.action === Action.move) {
          this.cheesboard.movePawnChees(from, to);
          this.tryCastling(from, to);
        } else {
          this.cheesboard.eatPawnChees(from, to, this.connector);
        }
        setTimeout(() => {
          const oppositeTeam = this.cheesboard.getOppositeTeam(this.currentTeam);
          this.counter = 0;
          this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
          this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: oppositeTeam, typeOfControl: TypeOfControl.kingIsSafe });
        });
      }
    });
  }

  private tryCastling(from: CheesBox, to: CheesBox) {
    if(to.pawnChees?.type === IPawnCheesType.king) {
      if(from.column > to.column && from.column - to.column === 2) {
        const fromRookCheesBox = this.cheesboard.getRook(this.currentTeam, 0);
        const toTower = this.cheesboard.board[from.row][from.column - 1];
        this.cheesboard.movePawnChees(fromRookCheesBox, toTower);
      } else if(to.column > from.column && to.column - from.column === 2) {
        const fromRookCheesBox = this.cheesboard.getRook(this.currentTeam, 7);
        const toTower = this.cheesboard.board[from.row][from.column + 1];
        this.cheesboard.movePawnChees(fromRookCheesBox, toTower);
      }
    }
  }

  private passTurn(oppositeTeam: IPawnTeam): void {
    this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
    this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam });
    this.currentTeam = oppositeTeam;
  }

  private allPawnCheesHasEmitted(team: IPawnTeam) {
    this.counter++
    return this.counter === this.cheesboard.getNumberPawnChees(team);
  }
}
