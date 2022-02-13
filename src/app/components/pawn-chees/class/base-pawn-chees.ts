import { CheesBox } from "../../chees-box/class/chees-box";
import { IPawnTeam } from "../interface/pawn-chees";

export class BasePawnChees {
  IPawnTeam = IPawnTeam;

  setMovable(cheesBox: CheesBox): void {
    cheesBox.isMoveable = cheesBox.pawnChees === null;
  }
}