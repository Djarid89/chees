export interface ICheesBox {
  isMoveable: boolean;
  pawnChees: ICheesBoxPawnChees;
}

export interface ICheesBoxPawnChees {
  pawnCheesType: IPawnCheesType;
  color: IPawnTeam | undefined;
}

export interface IPawnChees {
  color: IPawnTeam | undefined;
  
  setCheesBoxMovable: (board: ICheesBox[][], row: number, column: number, isFirstMove: boolean) => void;
}

export enum IPawnCheesType {
  empty = 0,
  pawn,
  bishop,
  king,
  knight,
  queen,
  rook,
}

export enum IPawnTeam {
  white = 0,
  black
}
