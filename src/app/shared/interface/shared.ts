import { CheesBox, PawnChees } from "src/app/components/chees-box/class/chees-box";
import { IPawnChees, IPawnTeam } from "src/app/components/pawn-chees/interface/pawn-chees";
import { Cheesboard } from "../../components/chessboard/class/cheesBoard";

export interface IBoardColor {
  board: CheesBox[][];
  color: IPawnTeam;
  typeOfControl?: TypeOfControl;
}

export interface asd {
  isMoveableOrEatableCheesBox: CheesBox[];
  counter: number;
}

export interface ICheesBoardColor {
  cheesboard: Cheesboard;
  color: IPawnTeam;
}

export interface IFromToCheesBox {
  fromCheesBox: CheesBox;
  toCheesBox: CheesBox;
  action: Action;
}

export interface IModalContent {
   title?: string;
   text?: string;
   height?: number;
   width?: number;
   ttl?: number;
   cheesBoard?: Cheesboard;
   winningTeam?: IPawnTeam;
   showButton?: boolean;
   graveyard?: IGraveyard;
}

export interface IGraveyard {
  pawnCheeses: PawnChees[];
  color: IPawnTeam;
}

export enum Action {
  move = 1,
  eat
}

export enum TypeOfControl {
  kingIsSafe = 1,
  opponentKingIsCaptured,
  defenderCannotFreeKing
}