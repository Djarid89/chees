import { Component, OnDestroy, OnInit} from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
import { Action, IFromToCheesBox, TypeOfControl } from '../../shared/interface/shared';
import { IPawnChees, IPawnTeam } from '../pawn-chees/interface/pawn-chees';
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
  winningTeam: IPawnTeam | undefined;
  kingIsBlockCounter!: number;
  counter!: number;

  removeAllMovableSubs!: Subscription;
  movePawnCheesSub!: Subscription;
  kingIsBlockSub!: Subscription;
  gameIsOverSub!: Subscription;
  showAvaibleMovement!: Subscription;
  isMyKingSafeSub!: Subscription;
  isOppositeKingCapturedSub!: Subscription;
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
  }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    setTimeout(() => {
      this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
      this.connector.updateAllCanBeEatable$.next({
        board: this.cheesboard.board,
        color: this.cheesboard.getOppositeTeam(this.currentTeam),
        typeOfControl: TypeOfControl.kingIsSafe
      });
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
        this.kingIsBlockCounter++;
        if(this.kingIsBlockCounter === this.cheesboard.getNumberPawnChees(this.cheesboard.getOppositeTeam(this.currentTeam))) {
          this.connector.gameIsOver$.next();
        }
      }
    });

    this.gameIsOverSub = this.connector.gameIsOver$.subscribe({
      next: () => this.winningTeam = this.currentTeam
    });

    this.isOppositeKingCapturedSub = this.connector.isOppositeKingCaptured$.subscribe({
      next: () => {
        if(!this.allPawnCheesHasEmitted(this.currentTeam)) {
          return;
        }
        const oppositeTeam = this.cheesboard.getOppositeTeam(this.currentTeam);
        const oppositeKing = this.cheesboard.getKing(oppositeTeam);
        if(oppositeKing.canBeEatable) {
          alert(`${oppositeTeam === IPawnTeam.black ? 'black' : 'white'} king under check`);
          this.kingIsBlockCounter = 0;
          this.connector.tryDefendKing$.next({ cheesboard: this.cheesboard, color: oppositeTeam });
          this.passTurn(oppositeTeam);
        } else {
          this.passTurn(oppositeTeam);
        }
      }
    });

    this.isMyKingSafeSub = this.connector.isMyKingSafe$.subscribe({
      next: () => {
        if(!this.allPawnCheesHasEmitted(this.cheesboard.getOppositeTeam(this.currentTeam))) {
          return;
        }
        const myKing = this.cheesboard.getKing(this.currentTeam);
        if(myKing.canBeEatable) {
          alert('Your move discovered the king');
          if(this.fromToCheesBox.action === Action.move) {
            this.cheesboard.movePawnChees(this.fromToCheesBox.toCheesBox, this.fromToCheesBox.fromCheesBox);
          } else {
            this.cheesboard.swapPawnChees(this.fromToCheesBox.fromCheesBox, this.fromToCheesBox.toCheesBox, true);
          }
          setTimeout(() => {
            this.counter = 0;
            this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
            this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam, typeOfControl: TypeOfControl.opponentKingIsCaptured });
          });
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
        if(fromToCheesBox.action === Action.move) {
          this.cheesboard.movePawnChees(fromToCheesBox.fromCheesBox, fromToCheesBox.toCheesBox);
        } else {
          this.cheesboard.eatPawnChees(fromToCheesBox.fromCheesBox, fromToCheesBox.toCheesBox);
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

  private passTurn(oppositeTeam: IPawnTeam): void {
    this.cheesboard.resetCheesBoxCanBeEatable(this.cheesboard.board);
    this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam });
    this.currentTeam = oppositeTeam;
  }

  private allPawnCheesHasEmitted(team: IPawnTeam) {
    if(this.counter < this.cheesboard.getNumberPawnChees(team)) {
      this.counter++
      return false;
    } else {
      return true;
    }
  }
}
