import { IPawnCheesType, IPawnTeam } from "../../pawn-chees/interface/pawn-chees";

export class CheesBox {
  row: number;
  column: number;
  pawnChees: CheesBoxPawnChees | null;
  isMoveable: boolean;

  constructor(row: number, column: number, pawnChees?: CheesBoxPawnChees | null) {
    this.row = row;
    this.column = column;
    this.pawnChees = pawnChees || null;
    this.isMoveable = false;
  }

  isPair(): boolean {
    return (this.row + this.column) % 2 === 0;
  }
}

export class CheesBoxPawnChees {
  pawnCheesType: IPawnCheesType;
  color: IPawnTeam;

  constructor(pawnCheesType: IPawnCheesType, color: IPawnTeam) {
    this.pawnCheesType = pawnCheesType;
    this.color = color;
  }
}
