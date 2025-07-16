export interface Favorite {
  userId: string;
  productId: number;
}
export interface FavoriteDB {
  favorites: Favorite[];
}