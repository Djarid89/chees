import { IPawnCheesType, IPawnTeam, IPawnCheesBase } from "../../pawn-chees/interface/pawn-chees";

export class Cheesboard {
  public board!: IPawnCheesBase[][];

  constructor() {
    this.board = [];
    for(let i = 0; i < 8; i++) {
      this.board[i] = [];
      for(let j = 0; j < 8; j++) {
        this.board[i][j] = { pawnCheesType: IPawnCheesType.empty, color: undefined };
      }
    }
  }

  initWhiteTeam(): void {
    this.setPawn(6, IPawnTeam.white);
    this.setServant(7, IPawnTeam.white);
    this.board[7][4] = { pawnCheesType: IPawnCheesType.queen, color: IPawnTeam.white };
    this.board[7][3] = { pawnCheesType: IPawnCheesType.king, color: IPawnTeam.white };
  }

  initBlackTeam(): void {
    this.setPawn(1, IPawnTeam.black);
    this.setServant(0, IPawnTeam.black);
    this.board[0][4] = { pawnCheesType: IPawnCheesType.king, color: IPawnTeam.black };
    this.board[0][3] = { pawnCheesType: IPawnCheesType.queen, color: IPawnTeam.black };
  }

  private setPawn(row: number, color: IPawnTeam): void {
    for(let i = 0; i < 8; i++) {
      this.board[row][i] = { pawnCheesType: IPawnCheesType.pawn, color };
    }
  }

  private setServant(row: number, color: IPawnTeam): void {
    this.board[row][0] = this.board[row][7] = { pawnCheesType: IPawnCheesType.rook, color };
    this.board[row][1] = this.board[row][6] = { pawnCheesType: IPawnCheesType.knight, color };
    this.board[row][2] = this.board[row][5] = { pawnCheesType: IPawnCheesType.bishop, color };
  }
}
