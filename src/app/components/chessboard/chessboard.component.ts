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
  initSubscription!: Subscription;
  winningTeam: IPawnTeam | undefined;
  isGameWinningSub!: Subscription;
  movePawnCheesSub!: Subscription;
  kingIsBlockSub!: Subscription;
  gameIsOverSub!: Subscription;
  forkJoinSub!: Subscription;
  kingIsBlockCounter!: number;

  constructor(private readonly connector: ConnectorService) { }

  ngOnDestroy(): void {
    this.isGameWinningSub.unsubscribe();
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
      this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: this.cheesboard.getOppositeTeam(this.currentTeam) });
    });
    this.connector.kingIsBlock$.subscribe({
      next: () => {
        this.kingIsBlockCounter++;
        if(this.kingIsBlockCounter === this.cheesboard.getNumberPawnChees(this.cheesboard.getOppositeTeam(this.currentTeam))) {
          this.connector.gameIsOver$.next();
        }
      }
    });
    this.connector.gameIsOver$.subscribe({
      next: (winningTeam: IPawnTeam) => this.winningTeam = winningTeam
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
        this.cheesboard.resetCheesBoxCanEat();
        const updateAllCanEat$ = of(this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: oppositeTeam }));
        this.forkJoinSub = forkJoin({ updateAllCanEat$ }).subscribe({
          next: () => {
            if(this.cheesboard.getKing(this.currentTeam).canBeEatable) {
              alert('Your move discovered the king');
              if(fromToCheesBox.action === Action.move) {
                this.cheesboard.movePawnChees(to, from);
              } else {
                this.cheesboard.swapPawnChees(from, to, true);
              }
              this.cheesboard.resetCheesBoxCanEat();
              this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: oppositeTeam });
            } else if(this.cheesboard.getKing(oppositeTeam).canBeEatable) {
              if(this.cheesboard.kingCantMove(oppositeTeam)) {
                alert(`${oppositeTeam} king under check`);
                this.kingIsBlockCounter = 0;
              this.cheesboard.resetCheesBoxCanEat();
              this.connector.tryDefendKing$.next({ cheesboard: this.cheesboard, color: oppositeTeam });
              }
            }
            else {
              this.currentTeam = oppositeTeam;
            }
          }
        });
      }
    });
  }

  showAvaibleMovement(pawnChees: IPawnChees): void {
    if(pawnChees && this.currentTeam === pawnChees.color) {
      pawnChees.setCheesBoxesStatus(this.cheesboard?.board, pawnChees.row, pawnChees.column);
    }
  }
}
