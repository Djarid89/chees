import { Component, OnDestroy, OnInit} from '@angular/core';
import { forkJoin, of, Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
import { Action, IFromToCheesBox } from '../../shared/interface/shared';
import { CheesBox, PawnChees } from '../chees-box/class/chees-box';
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
  initSubscription!: Subscription;
  winningTeam: IPawnTeam | undefined;
  removeAllMovableSubs!: Subscription;
  isGameWinningSubs!: Subscription;
  movePawnChees!: Subscription;
  checkUndoMove!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  ngOnDestroy(): void {
    this.removeAllMovableSubs.unsubscribe();
    this.isGameWinningSubs.unsubscribe();
    this.movePawnChees.unsubscribe();
  }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    setTimeout(() => {
      this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: this.getOppositeTeam(this.currentTeam) });
    });

    this.removeAllMovableSubs = this.connector.removeAllMovable$.subscribe({
      next: () => this.cheesboard.removeStatus()
    });
    this.isGameWinningSubs = this.connector.isGameWinning$.subscribe({
      next: (pawnTeam: IPawnTeam) => this.winningTeam = this.getOppositeTeam(pawnTeam)
    });
    this.movePawnChees = this.connector.movePawnChees$.subscribe({
      next: (fromToCheesBox: IFromToCheesBox) => {
        const from = fromToCheesBox.fromCheesBox;
        const to = fromToCheesBox.toCheesBox;

        let eatenPawnChees = new PawnChees();
        if(fromToCheesBox.action === Action.move) {
          this.cheesboard.movePawnChees(from, to);
        } else {
          eatenPawnChees = new PawnChees(to.pawnChees?.type, to.pawnChees?.color, true);
          this.cheesboard.eatPawnChees(from, to);
        }
        this.cheesboard.resetCheesBoxCanEat();
        const updateAllCanEat$ = of(this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: this.getOppositeTeam(this.currentTeam) }));
        forkJoin({ updateAllCanEat$ }).subscribe({
          next: () => {
            if(this.cheesboard.getKing(this.currentTeam).canBeEatable) {
              console.log('La tua mossa ha scoperto il re fai retromarcia');
              if(fromToCheesBox.action === Action.move) {
                this.cheesboard.movePawnChees(to, from);
              } else {
                const tempPawnChees = new PawnChees(to.pawnChees?.type, to.pawnChees?.color, true);
                to.pawnChees = eatenPawnChees;
                from.pawnChees = tempPawnChees;
              }
              this.cheesboard.resetCheesBoxCanEat();
              this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: this.getOppositeTeam(this.currentTeam) });
            } else {
              this.currentTeam = this.getOppositeTeam(this.currentTeam);
            }
          }
        });
      }
    });
  }

  private getOppositeTeam(currentTeam: IPawnTeam): IPawnTeam {
    return currentTeam === IPawnTeam.black ? IPawnTeam.white : IPawnTeam.black
  }

  showAvaibleMovement(pawnChees: IPawnChees): void {
    if(pawnChees && this.currentTeam === pawnChees.color) {
      pawnChees.setCheesBoxesStatus(this.cheesboard?.board, pawnChees.row, pawnChees.column);
    }
  }
}
