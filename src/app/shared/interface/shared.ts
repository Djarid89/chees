import { CheesBox } from "../../components/chees-box/class/chees-box";

export interface IBoardRowColumn {
  board: CheesBox[][],
  row: number,
  column: number
}
