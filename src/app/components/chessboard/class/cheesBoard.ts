import { IPawnCheesType } from "../../pawn-chees/interface/pawn-chees";

export class Cheesboard {
  public board: IPawnCheesType[][] | undefined;

  constructor() {
    this.board = [];
    for(let i = 0; i < 8; i++) {
      this.board[i] = [];
      for(let j = 0; j < 8; j++) {
        if(i === 0) {
          if(j === 0 || j === 7) {
            this.board[i][j] = IPawnCheesType.rook;
          } else if(j === 1 || j === 6) {
            this.board[i][j] = IPawnCheesType.knight;
          } else if(j === 2 || j === 5) {
            this.board[i][j] = IPawnCheesType.bishop;
          } else if(j === 3) {
            this.board[i][j] = IPawnCheesType.queen;
          } else if(j === 4) {
            this.board[i][j] = IPawnCheesType.king;
          }
        } else if(i === 1) {
          this.board[i][j] = IPawnCheesType.pawn;
        } else {
          this.board[i][j] = IPawnCheesType.empty;
        }
      }
    }
  }
}
