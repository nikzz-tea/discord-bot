export interface Template {
  url: string;
  size: number[];
  boxes: {
    size: number[];
    leftCorner: number[];
  }[];
}
