export interface IPawnCheesBase {
  color: IPawnTeam | undefined;
  pawnCheesType: IPawnCheesType;
}

export interface IPawnCheesExtended {
  color: IPawnTeam | undefined;

  showAvaibleMove: (row: number, column: number) => void;
  // drop: () => void;
  // eat: () => void;
  // move: () => void;
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
