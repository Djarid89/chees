import { CheesBox } from "src/app/components/chees-box/class/chees-box";
import { IPawnTeam } from "src/app/components/pawn-chees/interface/pawn-chees";
import { Cheesboard } from "../../components/chessboard/class/cheesBoard";

export interface IBoardColor {
  board: CheesBox[][],
  color: IPawnTeam
}

export interface ICheesBoardColor {
  cheesboard: Cheesboard,
  color: IPawnTeam
}

export interface IFromToCheesBox {
  fromCheesBox: CheesBox,
  toCheesBox: CheesBox
  action: Action
}

export enum Action {
  move = 1,
  eat
}
