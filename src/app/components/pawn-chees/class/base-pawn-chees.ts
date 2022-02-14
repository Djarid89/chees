import { CheesBox } from "../../chees-box/class/chees-box";
import { IPawnCheesType, IPawnTeam } from "../interface/pawn-chees";

export class BasePawnChees {
  IPawnTeam = IPawnTeam;

  setCheesBoxStatus(cheesBox: CheesBox, color: IPawnTeam, canBeEatable: boolean): void {
    if(canBeEatable) {
      cheesBox.canBeEatable = true;
    } else {
      cheesBox.isMoveable = cheesBox.pawnChees === null;
      cheesBox.isEatable = false;
      if(cheesBox.pawnChees && cheesBox.pawnChees.type !== IPawnCheesType.king) {
        cheesBox.isEatable = this.isOppositeColor(cheesBox, color)
      }
    }
  }

  isOppositeColor(cheesBox: CheesBox, color: IPawnTeam): boolean {
    if(!cheesBox.pawnChees) {
      return false;
    } else {
      return cheesBox.pawnChees.color !== color;
    }
  }
}
