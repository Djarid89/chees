import { CheesBox, PawnChees } from "../../chees-box/class/chees-box";
import { IPawnCheesType, IPawnTeam } from "../../pawn-chees/interface/pawn-chees";

export class Cheesboard {
  board!: CheesBox[][];
  graveyard: PawnChees[] = [];

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

  resetCheesBoxCanEat(): void {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        this.board[i][j].canBeEatable = false;
      }
    }
  }

  movePawnChees(fromCheesBox: CheesBox, toCheesBox: CheesBox): void {
    if(!fromCheesBox.pawnChees) {
      return;
    }
    toCheesBox.pawnChees = new PawnChees(fromCheesBox.pawnChees.type, fromCheesBox.pawnChees.color, true);
    fromCheesBox.pawnChees = null;
  }

  swapPawnChees(fromCheesBox: CheesBox, toCheesBox: CheesBox, resurrect = false): void {
    const tempPawnChees = new PawnChees(toCheesBox.pawnChees?.type, toCheesBox.pawnChees?.color, true);
    if(resurrect) {
      const resurrected = this.graveyard?.pop();
      toCheesBox.pawnChees = new PawnChees(resurrected?.type, resurrected?.color, true);
    } else {
      toCheesBox.pawnChees = new PawnChees(fromCheesBox.pawnChees?.type, fromCheesBox.pawnChees?.color, true);
    }
    fromCheesBox.pawnChees = tempPawnChees;
  }

  eatPawnChees(eaterCheesBox: CheesBox, eatenCheesBox: CheesBox): void {
    if(!eaterCheesBox.pawnChees) {
      return;
    }
    if(eatenCheesBox.pawnChees) {
      this.graveyard.push(new PawnChees(eatenCheesBox.pawnChees?.type, eatenCheesBox.pawnChees?.color, true));
    }
    eatenCheesBox.pawnChees = new PawnChees(eaterCheesBox.pawnChees.type, eaterCheesBox.pawnChees.color, true);
    eaterCheesBox.pawnChees = null;
  }

  getKing(color: IPawnTeam): CheesBox {
    let king = new CheesBox();
    for(const row of this.board) {
      king = row.find((cheesBox: CheesBox) => cheesBox.pawnChees?.type === IPawnCheesType.king && cheesBox.pawnChees?.color === color) || new CheesBox();
    }
    return king;
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
