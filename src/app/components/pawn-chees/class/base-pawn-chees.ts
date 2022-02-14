import { CheesBox } from "../../chees-box/class/chees-box";
import { IPawnCheesType, IPawnTeam } from "../interface/pawn-chees";

export class BasePawnChees {
  IPawnTeam = IPawnTeam;

  setCheesBoxStatus(cheesBox: CheesBox, color: IPawnTeam, canBeEatable: boolean, isKing = false): void {
    if(canBeEatable) {
      cheesBox.canBeEatable = true;
    } else {
      if(isKing) {
        cheesBox.isMoveable = cheesBox.pawnChees === null && !cheesBox.canBeEatable;
        cheesBox.isEatable = this.isOppositeColor(cheesBox, color) && !cheesBox.canBeEatable;
      } else {
        cheesBox.isMoveable = cheesBox.pawnChees === null;
        cheesBox.isEatable = this.isOppositeColor(cheesBox, color);
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
