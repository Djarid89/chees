import { forkJoin, of, Subject, Subscription } from "rxjs";
import { ConnectorService } from "../../../service/connector.service";
import { IBoardColor, ICheesBoardColor } from "../../../shared/interface/shared";
import { CheesBox } from "../../chees-box/class/chees-box";
import { IPawnChees, IPawnTeam } from "../interface/pawn-chees";

export class BasePawnChees {
  IPawnTeam = IPawnTeam;
  forkJoinSub! : Subscription;

  constructor(readonly connector: ConnectorService) { }

  setCheesBoxStatus(cheesBox: CheesBox, color: IPawnTeam | undefined, canBeEatable: boolean, isKing = false): void {
    if(canBeEatable) {
      cheesBox.canBeEatable = true;
    } else {
      if(isKing) {
        cheesBox.isMoveable = !cheesBox.pawnChees?.type && !cheesBox.canBeEatable;
        cheesBox.isEatable = this.isOppositeColor(cheesBox, color) && !cheesBox.canBeEatable;
      } else {
        cheesBox.isMoveable = !cheesBox.pawnChees?.type;
        cheesBox.isEatable = this.isOppositeColor(cheesBox, color);
      }
    }
  }

  isOppositeColor(cheesBox: CheesBox, color: IPawnTeam | undefined): boolean {
    if(!cheesBox.pawnChees?.type) {
      return false;
    } else {
      return cheesBox.pawnChees.color !== color;
    }
  }

  tryDefend(cheesBoardColor: ICheesBoardColor, pawnChees: IPawnChees, updateAllCanEat$: Subject<IBoardColor>): void {
    const cheesboard = cheesBoardColor.cheesboard;
    cheesboard.cloneCheesBoard();
    pawnChees.setCheesBoxesStatus(cheesboard.clonedBoard, pawnChees.row, pawnChees.column);
    const isMoveableOrEatableCheesBox = cheesboard.getIsMoveableOrIsEatable();
    let counter = 0;
    for(const toCheesBox of isMoveableOrEatableCheesBox) {
      cheesboard.cloneCheesBoard();
      const fromCheesBox = cheesboard.clonedBoard[pawnChees.row][pawnChees.column];
      if(toCheesBox.isMoveable) {
        cheesboard.movePawnChees(fromCheesBox, toCheesBox);
      } else {
        cheesboard.eatPawnChees(fromCheesBox, toCheesBox);
      }
      setTimeout(() => {
        const updateAllCanEatable = of(updateAllCanEat$.next({ board: cheesboard.clonedBoard, color: cheesboard.getOppositeTeam(pawnChees.color || IPawnTeam.white) }));
        this.forkJoinSub = forkJoin({ updateAllCanEat: updateAllCanEatable }).subscribe({
          next: () => {
            if(!cheesboard.getKing(cheesBoardColor.color).canBeEatable) {
              this.forkJoinSub.unsubscribe();
            } else if(counter === isMoveableOrEatableCheesBox.length - 1) {
              this.connector.kingIsBlock$.next();
            }
            counter++;
          }
        });
        this.forkJoinSub.unsubscribe();
      });
    }
  }
}
