import { ConnectorService } from "../../../service/connector.service";
import { ICheesBoardColor, TypeOfControl } from "../../../shared/interface/shared";
import { CheesBox } from "../../chees-box/class/chees-box";
import { Cheesboard } from "../../chessboard/class/cheesBoard";
import { IPawnChees, IPawnTeam } from "../interface/pawn-chees";

export class BasePawnChees {
  IPawnTeam = IPawnTeam;

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
    let numberOfAvaibleMovementTry = 0;
    let avaibleMovement = [];
    let numberOfPawncheesWithUpdatedEatable = 0;

    const isAllCanEatabledSub = this.connector.isAllCanEatabled$.subscribe({
      next: (board: CheesBox[][]) => {
        numberOfPawncheesWithUpdatedEatable++;
        const oppositeTeam = cheesboard.getOppositeTeam(cheesBoardColor.color);
        if(numberOfPawncheesWithUpdatedEatable === cheesBoardColor.cheesboard.getNumberPawnChees(oppositeTeam)) {
          const king = Cheesboard.getKing(board, cheesBoardColor.color);
          if(!king.canBeEatable) {
            isAllCanEatabledSub.unsubscribe();
          }
          numberOfAvaibleMovementTry++;
          if(numberOfAvaibleMovementTry === avaibleMovement.length) {
            this.connector.kingIsBlock$.next();
            isAllCanEatabledSub.unsubscribe();
          }
        }
      }
    });

    const cheesboard = cheesBoardColor.cheesboard;
    cheesboard.cloneCheesBoard();
    pawnChees.setCheesBoxesStatus(cheesboard.clonedBoard, pawnChees.row, pawnChees.column);
    avaibleMovement = cheesboard.getIsMoveableOrIsEatable();
    if(!avaibleMovement.length) {
      this.connector.kingIsBlock$.next();
      isAllCanEatabledSub.unsubscribe();
    } else {
      for(const toCheesBox of avaibleMovement) {
        numberOfPawncheesWithUpdatedEatable = 0;
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
