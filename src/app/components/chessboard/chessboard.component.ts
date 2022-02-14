import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../service/connector.service';
import { IPawnChees, IPawnTeam } from '../pawn-chees/interface/pawn-chees';
import { Cheesboard } from './class/cheesBoard';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  cheesboard!: Cheesboard;
  number = ['8','7','6','5','4','3','2','1'];
  letter = ['A','B','C','D','E','F','G','H'];
  currentTeam = IPawnTeam.white;
  initSubscription!: Subscription;

  constructor(private readonly connector: ConnectorService) { }

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
    this.cheesboard.initBlackTeam();
    this.cheesboard.initWhiteTeam();
    this.connector.removeAllMovable$.subscribe({ next: () => this.cheesboard.removeStatus() });
    this.connector.passTurn$.subscribe({
      next: (pawnTeam: IPawnTeam) => {
        this.currentTeam = pawnTeam === IPawnTeam.black ? IPawnTeam.white : IPawnTeam.black;
        this.cheesboard.resetCheesBoxCanEat();
        setTimeout(() => {
          this.connector.updateAllCanEat$.next(this.cheesboard.board);
          if(pawnTeam === IPawnTeam.black) {
            this.connector.isCapturedWhite$.next(this.cheesboard.board);
          } else {
            this.connector.isCapturedBlack$.next(this.cheesboard.board);
          }
        })
      } });
  }

  showAvaibleMovement(pawnChees: IPawnChees): void {
    if(pawnChees && this.currentTeam === pawnChees.color) {
      pawnChees.setCheesBoxesStatus(this.cheesboard?.board, pawnChees.row, pawnChees.column);
    }
  }
}
