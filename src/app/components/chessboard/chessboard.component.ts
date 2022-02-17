import { Component, OnDestroy, OnInit} from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
import { Action, IFromToCheesBox } from '../../shared/interface/shared';
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

  removeAllMovableSubs!: Subscription;
  movePawnCheesSub!: Subscription;
  kingIsBlockSub!: Subscription;
  gameIsOverSub!: Subscription;
  forkJoinSub!: Subscription;
  forkJoinSub2!: Subscription;
  showAvaibleMovement!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  ngOnDestroy(): void {
    this.removeAllMovableSubs.unsubscribe();
    this.movePawnCheesSub.unsubscribe();
    this.kingIsBlockSub.unsubscribe();
    this.gameIsOverSub.unsubscribe();
    this.forkJoinSub.unsubscribe();
  }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    setTimeout(() => {
      this.cheesboard.resetCheesBoxCanBeEatable();
      this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.cheesboard.getOppositeTeam(this.currentTeam) });
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
    })
    this.movePawnCheesSub = this.connector.movePawnChees$.subscribe({
      next: (fromToCheesBox: IFromToCheesBox) => {
        const from = fromToCheesBox.fromCheesBox;
        const to = fromToCheesBox.toCheesBox;
        const oppositeTeam = this.cheesboard.getOppositeTeam(this.currentTeam);

        if(fromToCheesBox.action === Action.move) {
          this.cheesboard.movePawnChees(from, to);
        } else {
          this.cheesboard.eatPawnChees(from, to);
        }
        setTimeout(() => {
          this.cheesboard.resetCheesBoxCanBeEatable();
          let updateAllCanEatable$ = of(this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: oppositeTeam }));
          this.forkJoinSub = forkJoin({ updateAllCanEat$: updateAllCanEatable$ }).subscribe({
            next: () => {
              const myKing = this.cheesboard.getKing(this.currentTeam);
              if(myKing.canBeEatable) {
                alert('Your move discovered the king');
                if(fromToCheesBox.action === Action.move) {
                  this.cheesboard.movePawnChees(to, from);
                } else {
                  this.cheesboard.swapPawnChees(from, to, true);
                }
                setTimeout(() => {
                  this.cheesboard.resetCheesBoxCanBeEatable();
                  this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam });
                });
              } else {
                this.cheesboard.resetCheesBoxCanBeEatable();
                updateAllCanEatable$ = of(this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam }));
                this.forkJoinSub2 = forkJoin({ updateAllCanEat$: updateAllCanEatable$ }).subscribe({
                  next: () => {
                    const oppositeKing = this.cheesboard.getKing(oppositeTeam);
                    if(oppositeKing.canBeEatable) {
                      const col = oppositeTeam === IPawnTeam.black ? 'black' : 'white';
                      alert(`${col} king under check`);
                      this.kingIsBlockCounter = 0;
                      this.connector.tryDefendKing$.next({ cheesboard: this.cheesboard, color: oppositeTeam });
                      this.currentTeam = oppositeTeam;
                    } else {
                      this.cheesboard.resetCheesBoxCanBeEatable();
                      this.connector.updateAllCanBeEatable$.next({ board: this.cheesboard.board, color: this.currentTeam });
                      this.currentTeam = oppositeTeam;
                    }
                    if(this.forkJoinSub2) {
                      this.forkJoinSub2.unsubscribe();
                    }
                  }
                });
              }
              if(this.forkJoinSub) {
                this.forkJoinSub.unsubscribe();
              }
            }
          });
        });
      }
    });
  }
}
