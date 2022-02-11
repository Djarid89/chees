export interface IPawnChees {
  pawnCheesType: IPawnCheesType;
  color: IPawnTeam | undefined;
}

export interface IPawnBase {
  selected: () => void;
  unselected: () => void;
  eat: () => void;
  beEat: () => void;
  getImage: () => void;
}

export interface IPawn {
  transform: () => void;
}

export interface IPawnMove {
  move: () => void;
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
