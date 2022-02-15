import { AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
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
  changeTurnSubs!: Subscription;

  constructor(private readonly connector: ConnectorService) { }


  ngOnDestroy(): void {
    this.removeAllMovableSubs.unsubscribe();
    this.isGameWinningSubs.unsubscribe();
    this.changeTurnSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    setTimeout(() => {
      this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: this.currentTeam });
    });


    this.removeAllMovableSubs = this.connector.removeAllMovable$.subscribe({
      next: () => this.cheesboard.removeStatus()
    });
    this.isGameWinningSubs = this.connector.isGameWinning$.subscribe({
      next: (pawnTeam: IPawnTeam) => this.winningTeam = this.getOppositeTeam(pawnTeam)
    });
    this.changeTurnSubs = this.connector.changeTurn$.subscribe({
      next: () => {
        this.cheesboard.resetCheesBoxCanEat();
        setTimeout(() => {
          this.connector.updateAllCanEat$.next({ board: this.cheesboard.board, color: this.currentTeam });
          this.currentTeam = this.getOppositeTeam(this.currentTeam);
        });
      }
    })
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
