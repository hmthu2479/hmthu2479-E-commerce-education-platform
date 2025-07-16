export interface RatingModel {
  id: number;
  name: string;
  avatar: string;
  content: string;
  stars: number; // từ 1 đến 5
  date: string;  // định dạng ISO hoặc dạng hiển thị được
  productId:number;
}
