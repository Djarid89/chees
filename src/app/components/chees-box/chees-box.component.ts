import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICheesBox, IPawnChees, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent {
  @Input() row!: number;
  @Input() column!: number;
  @Input() cheesBox!: ICheesBox;
  @Output() mouseDown = new EventEmitter<IPawnChees>();
  @Output() drop = new EventEmitter<IPawnChees>();
  IPawnCheesType = IPawnCheesType;

  isPair(): boolean {
    return (this.row + this.column) % 2 === 0;
  }

  propagateMouseDown(pawnChees: IPawnChees) {
    this.mouseDown.emit(pawnChees);
  }

  propagateDropEnd() {
    this.drop.emit();
  }
}
