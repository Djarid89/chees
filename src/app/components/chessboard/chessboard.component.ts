import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent {
  cheesboardDim = [0, 1, 2, 3, 4, 5, 6, 7];

  getCellClass(row: number, cell: number) {
    const pair = (row + cell) % 2 !== 0;
    return {'cell': true, 'cell-white': pair, 'cell-brown': !pair };
  }
}
