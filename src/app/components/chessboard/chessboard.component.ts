import { Component } from '@angular/core';
import { IIndexValue } from '../../shared/interface/shared';

@Component({
  selector: 'chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss']
})
export class ChessboardComponent {
  cheesboardDim = ['0', '1', '2', '3', '4', '5', '6', '7'];

  getIndexValue(index: number, value: string): IIndexValue {
    return { index: index, value: value };
  }
}
