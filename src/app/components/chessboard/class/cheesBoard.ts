import { CheesBox, PawnChees } from "../../chees-box/class/chees-box";
import { IPawnCheesType, IPawnTeam } from "../../pawn-chees/interface/pawn-chees";

export class Cheesboard {
  public board!: CheesBox[][];

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

  removeAllMovable() {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        this.board[i][j].isMoveable = false;
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
