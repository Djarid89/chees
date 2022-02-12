import { IPawnCheesType, IPawnTeam } from "../../pawn-chees/interface/pawn-chees";

export class CheesBox {
  row: number;
  column: number;
  pawnChees: PawnChees | null;
  isMoveable: boolean;

  constructor(row: number, column: number, pawnChees?: PawnChees | null) {
    this.row = row;
    this.column = column;
    this.pawnChees = pawnChees || null;
    this.isMoveable = false;
  }

  isPair(): boolean {
    return (this.row + this.column) % 2 === 0;
  }
}

export class PawnChees {
  pawnCheesType: IPawnCheesType;
  color: IPawnTeam;

  constructor(pawnCheesType: IPawnCheesType, color: IPawnTeam) {
    this.pawnCheesType = pawnCheesType;
    this.color = color;
  }
}
