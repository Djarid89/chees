import { CheesBox, PawnChees } from "../../chees-box/class/chees-box";
import { IPawnCheesType, IPawnTeam } from "../../pawn-chees/interface/pawn-chees";

export class Cheesboard {
  board!: CheesBox[][];
  clonedBoard!: CheesBox[][];
  static graveyard: PawnChees[] = [];

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
    // this.setPawn(6, IPawnTeam.white);
    this.setServant(7, IPawnTeam.white);
    this.board[7][3] = new CheesBox(7, 3, new PawnChees(IPawnCheesType.queen, IPawnTeam.white));
    this.board[7][4] = new CheesBox(7, 4, new PawnChees(IPawnCheesType.king, IPawnTeam.white, true));
  }

  initBlackTeam(): void {
    // this.setPawn(1, IPawnTeam.black);
    this.setServant(0, IPawnTeam.black);
    this.board[0][3] = new CheesBox(0, 3, new PawnChees(IPawnCheesType.king, IPawnTeam.black));
    this.board[0][4] = new CheesBox(0, 4, new PawnChees(IPawnCheesType.queen, IPawnTeam.black, true));
  }

  removeIsMovableAndIsEatable(): void {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        this.board[i][j].isMoveable = false;
        this.board[i][j].isEatable = false;
      }
    }
  }

  resetCheesBoxCanBeEatable(board: CheesBox[][]): void {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        board[i][j].canBeEatable = false;
      }
    }
  }

  getOppositeTeam(currentTeam: IPawnTeam): IPawnTeam {
    return currentTeam === IPawnTeam.black ? IPawnTeam.white : IPawnTeam.black
  }

  movePawnChees(fromCheesBox: CheesBox, toCheesBox: CheesBox): void {
    if(!fromCheesBox.pawnChees) {
      return;
    }
    toCheesBox.pawnChees = new PawnChees(fromCheesBox.pawnChees.type, fromCheesBox.pawnChees.color);
    fromCheesBox.pawnChees = null;
  }

  swapPawnChees(fromCheesBox: CheesBox, toCheesBox: CheesBox): void {
    const tempPawnChees = new PawnChees(toCheesBox.pawnChees?.type, toCheesBox.pawnChees?.color, true);
    const resurrected = Cheesboard.popGraveyard();
    toCheesBox.pawnChees = new PawnChees(resurrected?.type, resurrected?.color, true);
    fromCheesBox.pawnChees = tempPawnChees;
  }

  eatPawnChees(eaterCheesBox: CheesBox, eatenCheesBox: CheesBox): void {
    if(!eaterCheesBox.pawnChees) {
      return;
    }
    if(eatenCheesBox.pawnChees) {
      Cheesboard.pushGraveyard(new PawnChees(eatenCheesBox.pawnChees?.type, eatenCheesBox.pawnChees?.color));
    }
    eatenCheesBox.pawnChees = new PawnChees(eaterCheesBox.pawnChees.type, eaterCheesBox.pawnChees.color);
    eaterCheesBox.pawnChees = null;
  }

  static pushGraveyard(pawnChees: PawnChees) {
    this.graveyard.push(pawnChees);
  }

  static popGraveyard(): PawnChees | undefined {
    return this.graveyard?.pop();
  }

  static getKing(board: CheesBox[][], color: IPawnTeam): CheesBox {
    let king = new CheesBox();
    for(const row of board) {
      for(const cheesBox of row) {
        if(cheesBox.pawnChees?.type === IPawnCheesType.king && cheesBox.pawnChees?.color === color) {
          king = cheesBox;
        }
      }
    }
    return king;
  }

  getRook(color: IPawnTeam, column: number): CheesBox {
    let rook = new CheesBox();
    for(const row of this.board) {
      for(const cheesBox of row) {
        if(cheesBox.pawnChees?.type === IPawnCheesType.rook && cheesBox.pawnChees?.color === color && cheesBox.column === column) {
          rook = cheesBox;
        }
      }
    }
    return rook;
  }

  getIsMoveableOrIsEatable(): CheesBox[] {
    const result: CheesBox[] = [];
    this.clonedBoard.forEach((row: CheesBox[]) => {
      row.forEach((cheesBox: CheesBox) => {
        if(cheesBox.isMoveable || cheesBox.isEatable) {
          result.push(cheesBox);
        }
      })
    });
    return result;
  }

  getNumberPawnChees(color: IPawnTeam): number {
    let result = 0;
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(this.board[i][j].pawnChees && this.board[i][j].pawnChees?.color === color) {
          result++
        }
      }
    }
    return result;
  }

  cloneCheesBoard(): void {
    this.clonedBoard = [];
    for(let i = 0; i < 8; i++) {
      this.clonedBoard[i] = [];
      for(let j = 0; j < 8; j++) {
        const pawnChees = this.board[i][j].pawnChees;
        this.clonedBoard[i][j] = new CheesBox(i, j, pawnChees ? new PawnChees(pawnChees?.type, pawnChees?.color, pawnChees?.firstMove) : null);
        this.clonedBoard[i][j].canBeEatable = this.board[i][j].canBeEatable;
      }
    }
  }

  removePawnCheesIsEatable(): void {
    for(let i = 0; i < 8; i++) {
      for(let j = 0; j < 8; j++) {
        if(this.board[i][j].isEatable) {
          this.board[i][j].pawnChees = null;
        }
      }
    }
  }

  private setPawn(row: number, color: IPawnTeam): void {
    for(let i = 0; i < 8; i++) {
      this.board[row][i] = new CheesBox(row, i, new PawnChees(IPawnCheesType.pawn, color, true));
    }
  }

  private setServant(row: number, color: IPawnTeam): void {
    this.board[row][0] = new CheesBox(row, 0, new PawnChees(IPawnCheesType.rook, color, true));
    this.board[row][7] = new CheesBox(row, 7, new PawnChees(IPawnCheesType.rook, color, true));
    this.board[row][1] = new CheesBox(row, 1, new PawnChees(IPawnCheesType.knight, color));
    this.board[row][6] = new CheesBox(row, 6, new PawnChees(IPawnCheesType.knight, color));
    this.board[row][2] = new CheesBox(row, 2, new PawnChees(IPawnCheesType.bishop, color));
    this.board[row][5] = new CheesBox(row, 5, new PawnChees(IPawnCheesType.bishop, color));
  }
}
