import { IPawnCheesType, IPawnTeam, ICheesBox } from "../../pawn-chees/interface/pawn-chees";

export class Cheesboard {
  public board!: ICheesBox[][];

  constructor() {
    this.board = [];
    for(let i = 0; i < 8; i++) {
      this.board[i] = [];
      for(let j = 0; j < 8; j++) {
        this.board[i][j] = { pawnChees: { pawnCheesType: IPawnCheesType.empty, color: undefined }, isMoveable: false };
      }
    }
  }

  initWhiteTeam(): void {
    this.setPawn(6, IPawnTeam.white);
    this.setServant(7, IPawnTeam.white);
    this.board[7][4] = {  pawnChees: { pawnCheesType: IPawnCheesType.queen, color: IPawnTeam.white }, isMoveable: false };
    this.board[7][3] = {  pawnChees: { pawnCheesType: IPawnCheesType.king, color: IPawnTeam.white }, isMoveable: false };
  }

  initBlackTeam(): void {
    this.setPawn(1, IPawnTeam.black);
    this.setServant(0, IPawnTeam.black);
    this.board[0][4] = {  pawnChees: { pawnCheesType: IPawnCheesType.king, color: IPawnTeam.black }, isMoveable: false };
    this.board[0][3] = {  pawnChees: { pawnCheesType: IPawnCheesType.queen, color: IPawnTeam.black }, isMoveable: false };
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
      this.board[row][i] = {  pawnChees: { pawnCheesType: IPawnCheesType.pawn, color }, isMoveable: false };
    }
  }

  private setServant(row: number, color: IPawnTeam): void {
    this.board[row][0] = this.board[row][7] = {  pawnChees: { pawnCheesType: IPawnCheesType.rook, color }, isMoveable: false };
    this.board[row][1] = this.board[row][6] = {  pawnChees: { pawnCheesType: IPawnCheesType.knight, color }, isMoveable: false };
    this.board[row][2] = this.board[row][5] = {  pawnChees: { pawnCheesType: IPawnCheesType.bishop, color }, isMoveable: false };
  }
}
