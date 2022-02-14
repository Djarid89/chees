import { CheesBox } from "../../chees-box/class/chees-box";
import { IPawnCheesType, IPawnTeam } from "../interface/pawn-chees";

export class BasePawnChees {
  IPawnTeam = IPawnTeam;

  setCheesBoxStatus(cheesBox: CheesBox, color: IPawnTeam): void {
    cheesBox.isMoveable = cheesBox.pawnChees === null;
    cheesBox.isEatable = false;
    if(cheesBox.pawnChees && cheesBox.pawnChees.type !== IPawnCheesType.king) {
      cheesBox.isEatable = cheesBox.pawnChees.color !== color;
    }
  }

  isOppositeColor(cheesBox: CheesBox | null, color: IPawnTeam): boolean {
    return cheesBox?.pawnChees?.color !== color || false
  }
}
