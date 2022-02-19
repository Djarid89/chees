import { CheesBox, PawnChees } from "../../chees-box/class/chees-box";

export interface IPawnChees {
  row: number;
  column: number;
  type: IPawnCheesType | undefined;
  color: IPawnTeam | undefined;

  setCheesBoxesStatus: (board: CheesBox[][], row: number, column: number) => void;
  setCheesBoxesCanEat: (board: CheesBox[][], row: number, column: number) => void;
}

export enum IPawnCheesType {
  pawn = 0,
  bishop,
  king,
  knight,
  queen,
  rook,
}

export enum IPawnTeam {
  white = 1,
  black
}
