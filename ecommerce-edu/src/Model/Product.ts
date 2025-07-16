export interface Product {
  id:number;
  title: string;
  price: number;
  image: string;
  author: string;
  category: string[];
  description: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  isSeen?:boolean;
  ratingIds:number[];
  avatar:string;
  discountPercent:number;
  index:number;
}

export interface Filters {
  keyword: string[];
  suggestedKeyword: string[];
  priceRanges: string[];   // ví dụ: ["0-500", "500-1000"]
  categories: string[];    // ví dụ: ["IELTS", "Sách"]
}
export interface FilterChip {
  type: string;
  label: string;
  value?: string;
}
