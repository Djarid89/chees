import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPawnChees, IPawnCheesType } from '../pawn-chees/interface/pawn-chees';
import { CheesBox } from './class/chees-box';

@Component({
  selector: 'chees-box',
  templateUrl: './chees-box.component.html',
  styleUrls: ['./chees-box.component.scss']
})
export class CheesBoxComponent {
  @Input() cheesBox!: CheesBox;
  @Output() showAvaibleMovement = new EventEmitter<IPawnChees>();
  @Output() setCheesBoxesCanEat = new EventEmitter<IPawnChees>();
  @Output() removeAllMovable = new EventEmitter<IPawnChees>();
  IPawnCheesType = IPawnCheesType;

  propagateShowAvaibleMovement(pawnChees: IPawnChees) {
    this.showAvaibleMovement.emit(pawnChees);
  }
}
