import { IPawnCheesType, IPawnTeam } from "../../pawn-chees/interface/pawn-chees";

export class CheesBox {
  row: number;
  column: number;
  pawnChees: PawnChees | null;
  isMoveable: boolean;
  isEatable: boolean;
  canBeEatable: boolean;

  constructor(row?: number, column?: number, pawnChees?: PawnChees | null) {
    this.row = row || 0;
    this.column = column || 0;
    this.pawnChees = pawnChees || null;
    this.isMoveable = false;
    this.isEatable = false;
    this.canBeEatable = false;
  }

  isPair(): boolean {
    return (this.row + this.column) % 2 === 0;
  }
}

export class PawnChees {
  type: IPawnCheesType | undefined;
  color: IPawnTeam | undefined;
  firstMove: boolean;

  constructor(type?: IPawnCheesType, color?: IPawnTeam, doubleMove = true) {
    this.type = type || undefined;
    this.color = color || undefined;
    this.firstMove = doubleMove;
  }
}
