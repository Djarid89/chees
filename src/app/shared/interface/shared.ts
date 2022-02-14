import { CheesBox } from "src/app/components/chees-box/class/chees-box";
import { IPawnTeam } from "src/app/components/pawn-chees/interface/pawn-chees";

export interface IBoardColor {
  board: CheesBox[][],
  color: IPawnTeam
}