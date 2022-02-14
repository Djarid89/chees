import { CheesBox, PawnChees } from "../../chees-box/class/chees-box";
import { IPawnCheesType, IPawnTeam } from "../../pawn-chees/interface/pawn-chees";

export class Cheesboard {
  board!: CheesBox[][];
  static graveyard: PawnChees[] = [];
  static isFirstMoveWhite = true;
  static isFirstMoveBlack = true;

  constructor() {
    this.board = [];
    for(let i = 0; i < 8; i++) {
      this.board[i] = [];
      for(let j = 0; j < 8; j++) {
        this.board[i][j] = new CheesBox(i, j);
      }
    }
  }

  initWhiteTeam(): void {
    this.setPawn(6, IPawnTeam.white);
    this.setServant(7, IPawnTeam.white);
    this.board[7][4] = new CheesBox(7, 4, new PawnChees(IPawnCheesType.queen, IPawnTeam.white));
    this.board[7][3] = new CheesBox(7, 3, new PawnChees(IPawnCheesType.king, IPawnTeam.white));
  }

  initBlackTeam(): void {
    this.setPawn(1, IPawnTeam.black);
    this.setServant(0, IPawnTeam.black);
    this.board[0][4] = new CheesBox(0, 4, new PawnChees(IPawnCheesType.king, IPawnTeam.black));
    this.board[0][3] = new CheesBox(0, 3, new PawnChees(IPawnCheesType.queen, IPawnTeam.black));
  }

  isKingUnderCheck(color: IPawnTeam): boolean {
    let king: CheesBox = new CheesBox(0,0);
    this.board.forEach((row: CheesBox[]) => {
      row.forEach((cheesBox: CheesBox) => {
        if(cheesBox.pawnChees?.type === IPawnCheesType.king && cheesBox.pawnChees?.color === color) {
          king = cheesBox;
        }
      })
    })
    return king.isEatable;
  }

  resetCheesBoxCanEat(): void {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        this.board[i][j].canBeEatable = false;
      }
    }
  }

  static movePawnChees(formCheesBox: CheesBox, toCheesBox: CheesBox): void {
    if(!formCheesBox.pawnChees) {
      return;
    }
    toCheesBox.pawnChees = new PawnChees(formCheesBox.pawnChees.type, formCheesBox.pawnChees.color);
    if(formCheesBox.pawnChees.color === IPawnTeam.white) {
      this.isFirstMoveWhite = false;
    } else {
      this.isFirstMoveBlack = false;
    }
    formCheesBox.pawnChees = null;
  }

  static eatPawnChees(eaterCheesBox: CheesBox, eatenCheesBox: CheesBox): void {
    if(!eaterCheesBox.pawnChees) {
      return;
    }
    if(eatenCheesBox.pawnChees) {
      this.graveyard.push(new PawnChees(eatenCheesBox.pawnChees?.type, eatenCheesBox.pawnChees?.color));
    }
    eatenCheesBox.pawnChees = new PawnChees(eaterCheesBox.pawnChees.type, eaterCheesBox.pawnChees.color);
    eaterCheesBox.pawnChees = null;
  }

  removeStatus(): void {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        this.board[i][j].isMoveable = false;
        this.board[i][j].isEatable = false;
      }
    }
  }

  private setPawn(row: number, color: IPawnTeam): void {
    for(let i = 0; i < 8; i++) {
      this.board[row][i] = new CheesBox(row, i, new PawnChees(IPawnCheesType.pawn, color));
    }
  }

  private setServant(row: number, color: IPawnTeam): void {
    this.board[row][0] = new CheesBox(row, 0, new PawnChees(IPawnCheesType.rook, color));
    this.board[row][7] = new CheesBox(row, 7, new PawnChees(IPawnCheesType.rook, color));
    this.board[row][1] = new CheesBox(row, 1, new PawnChees(IPawnCheesType.knight, color));
    this.board[row][6] = new CheesBox(row, 6, new PawnChees(IPawnCheesType.knight, color));
    this.board[row][2] = new CheesBox(row, 2, new PawnChees(IPawnCheesType.bishop, color));
    this.board[row][5] = new CheesBox(row, 5, new PawnChees(IPawnCheesType.bishop, color));
  }
}
