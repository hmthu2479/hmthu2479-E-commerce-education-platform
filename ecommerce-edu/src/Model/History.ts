export interface History {
  userId: string;
  productId: number;
}
export interface HistoryDB {
  histories: History[];
}