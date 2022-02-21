import { Subscription } from "rxjs";
import { ConnectorService } from "../../../service/connector.service";
import { ICheesBoardColor, TypeOfControl } from "../../../shared/interface/shared";
import { CheesBox } from "../../chees-box/class/chees-box";
import { Cheesboard } from "../../chessboard/class/cheesBoard";
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
    let counter2 = 0;

    const isAllCanEatabledSub = this.connector.isAllCanEatabled$.subscribe({
      next: (board: CheesBox[][]) => {
        this.counter++;
        const oppositeTeam = cheesboard.getOppositeTeam(cheesBoardColor.color);
        if(this.counter === cheesBoardColor.cheesboard.getNumberPawnChees(oppositeTeam)) {
          const king = Cheesboard.getKing(board, cheesBoardColor.color);
          if(king.canBeEatable) {
            counter2++;
            if(counter2 === this.isMoveableOrEatableCheesBox.length) {
              this.connector.kingIsBlock$.next();
              isAllCanEatabledSub.unsubscribe();
            }
          }
        }
      }
    })

    const cheesboard = cheesBoardColor.cheesboard;
    cheesboard.cloneCheesBoard();
    pawnChees.setCheesBoxesStatus(cheesboard.clonedBoard, pawnChees.row, pawnChees.column);
    this.isMoveableOrEatableCheesBox = cheesboard.getIsMoveableOrIsEatable();
    if(!this.isMoveableOrEatableCheesBox.length) {
      this.connector.kingIsBlock$.next();
      isAllCanEatabledSub.unsubscribe();
    } else {
      for(const toCheesBox of this.isMoveableOrEatableCheesBox) {
        this.counter = 0;
        cheesboard.cloneCheesBoard();
        const fromCheesBox = cheesboard.clonedBoard[pawnChees.row][pawnChees.column];
        const to = cheesboard.clonedBoard[toCheesBox.row][toCheesBox.column];
        if(toCheesBox.isMoveable) {
          cheesboard.movePawnChees(fromCheesBox, to);
        } else {
          cheesboard.eatPawnChees(fromCheesBox, to);
        }
        const oppositeTeam = cheesboard.getOppositeTeam(cheesBoardColor.color);
        cheesboard.resetCheesBoxCanBeEatable(cheesboard.clonedBoard);
        this.connector.updateAllCanBeEatable$.next({ board: cheesboard.clonedBoard, color: oppositeTeam, typeOfControl: TypeOfControl.defenderCannotFreeKing });
      }
    }
  }
}
