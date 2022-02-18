import { Subscription } from "rxjs";
import { ConnectorService } from "../../../service/connector.service";
import { ICheesBoardColor, TypeOfControl } from "../../../shared/interface/shared";
import { CheesBox } from "../../chees-box/class/chees-box";
import { IPawnChees, IPawnTeam } from "../interface/pawn-chees";

export class BasePawnChees {
  IPawnTeam = IPawnTeam;
  forkJoinSub! : Subscription;
  counter!: number;
  isMoveableOrEatableCheesBox!: CheesBox[];

  constructor(readonly connector: ConnectorService) {

  }

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

  tryAllPossibleMove(cheesBoardColor: ICheesBoardColor, pawnChees: IPawnChees): void {
    const isAllCanEatabledSub = this.connector.isAllCanEatabled$.subscribe({
      next: () => {
        if(!cheesboard.getKing(cheesBoardColor.color).canBeEatable) {
          isAllCanEatabledSub.unsubscribe();
        } else if(this.counter === this.isMoveableOrEatableCheesBox.length - 1) {
          this.connector.kingIsBlock$.next();
          isAllCanEatabledSub.unsubscribe();
        }
        this.counter++;
      }
    })

    const cheesboard = cheesBoardColor.cheesboard;
    cheesboard.cloneCheesBoard();
    pawnChees.setCheesBoxesStatus(cheesboard.clonedBoard, pawnChees.row, pawnChees.column);
    this.isMoveableOrEatableCheesBox = cheesboard.getIsMoveableOrIsEatable();
    this.counter = 0;
    for(const toCheesBox of this.isMoveableOrEatableCheesBox) {
      cheesboard.cloneCheesBoard();
      const fromCheesBox = cheesboard.clonedBoard[pawnChees.row][pawnChees.column];
      if(toCheesBox.isMoveable) {
        cheesboard.movePawnChees(fromCheesBox, toCheesBox);
      } else {
        cheesboard.eatPawnChees(fromCheesBox, toCheesBox);
      }
      setTimeout(() => {
        const oppositeTeam = cheesboard.getOppositeTeam(cheesBoardColor.color);
        cheesboard.resetCheesBoxCanBeEatable(cheesboard.clonedBoard);
        this.connector.updateAllCanBeEatable$.next({ board: cheesboard.clonedBoard, color: oppositeTeam, typeOfControl: TypeOfControl.defenderCannotFreeKing });
      });
    }
  }
}
