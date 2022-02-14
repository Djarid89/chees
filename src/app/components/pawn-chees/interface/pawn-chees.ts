import { CheesBox } from "../../chees-box/class/chees-box";

export interface IPawnChees {
  type: IPawnCheesType | undefined;
  color: IPawnTeam | undefined;

  setCheesBoxesStatus: (board: CheesBox[][], row: number, column: number) => void;
  setCheesBoxesCanEat: (board: CheesBox[][], row: number, column: number) => void;
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
