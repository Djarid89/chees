import { Component, ContentChild, HostListener, Input } from '@angular/core';
import { PAWN_BASE } from './components/pawn-chees.token';
import { IPawnBase, IPawnChees } from './interface/pawn-chees';

@Component({
  selector: 'pawn-chees',
  templateUrl: './pawn-chees.component.html',
  styleUrls: ['./pawn-chees.component.scss']
})
export class PawnCheesComponent implements IPawnBase {
  @Input() pawnchees!: IPawnChees;
  @ContentChild(PAWN_BASE) pawnBase!: IPawnBase;
  @HostListener('click', ['$event'])

  onClick() {
    this.selected();
  }

  move() {
    this.pawnBase.move();
  }

  selected() {
    this.pawnBase.selected();
  }

  unselected() {
    this.pawnBase.unselected();
  }

  eat() {
    this.pawnBase.eat();
  }

  beEaten() {
    this.pawnBase.beEaten();
  }
}
