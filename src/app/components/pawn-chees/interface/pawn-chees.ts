export interface IPawnChees {
  color: IPawnTeam;

  selected: () => void;
  unselected: () => void;
  eat: () => void;
  beEat: () => void;
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
