import { Component, Input } from '@angular/core';
import { IPawnBase, IPawnChees } from './interface/pawn-chees';

@Component({
  selector: 'pawn-chees',
  templateUrl: './pawn-chees.component.html',
  styleUrls: ['./pawn-chees.component.scss']
})
export class PawnCheesComponent implements IPawnBase {
  @Input() pawnchees!: IPawnChees;

  getImage(): string {
    switch(this.pawnchees.pawnCheesType) {
      case 1:
        return `./src/assets/pawn.png`;
      case 2:
        return `./src/assets/bishop.png`;
      case 3:
        return `./src/assets/king.png`;
      case 4:
        return `./src/assets/knight.png`;
      case 5:
        return `./src/assets/queen.png`;
      case 6:
        return `./src/assets/rook.png`;
      default:
        return ``;
    }
  }

  selected() {
    console.log('Fai roba');
  }

  unselected() {
    console.log('Fai roba');
  }

  eat() {
    console.log('Fai roba');
  }

  beEat() {
    console.log('Fai roba');
  }
}
