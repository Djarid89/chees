import { IIndexValue } from "../interface/shared";

export class Coordinate {
  horizzontal: IIndexValue;
  vertical: IIndexValue;

  constructor(horizzontal?: IIndexValue, vertical?: IIndexValue) {
    this.horizzontal = { index: horizzontal?.index || 0, value: horizzontal?.value || '' };
    this.vertical = { index: vertical?.index || 0, value: vertical?.value || '' };
  }

  isPair(): boolean {
    return (this.horizzontal.index + this.vertical.index) % 2 !== 0;
  }
}
