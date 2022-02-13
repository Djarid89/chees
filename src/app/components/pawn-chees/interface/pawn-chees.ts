import { CheesBox, PawnChees } from "../../chees-box/class/chees-box";

export interface IPawnChees {
  type: IPawnCheesType;
  color: IPawnTeam;
  
  setCheesBoxesMovable: (board: CheesBox[][], row: number, column: number) => void;
}

export enum IPawnCheesType {
  empty = 0,
  pawn,
  bishop,
  king,
  knight,
  queen,
  rook,
}

export enum IPawnTeam {
  white = 0,
  black
}
