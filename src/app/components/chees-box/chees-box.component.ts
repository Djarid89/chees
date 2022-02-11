import { Component, Input } from '@angular/core';
import { IPawnChees, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent {
  @Input() row!: number;
  @Input() column!: number;
  @Input() pawnchees!: IPawnChees;
  IPawnCheesType = IPawnCheesType;

  isPair(): boolean {
    return (this.row + this.column) % 2 !== 0;
  }
}
