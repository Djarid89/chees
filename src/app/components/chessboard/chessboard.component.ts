import { Component, OnInit} from '@angular/core';
import { Cheesboard } from './class/cheesBoard';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent implements OnInit {
  cheesboard: Cheesboard | undefined;

  ngOnInit(): void {
    this.cheesboard = new Cheesboard();
  }
}
