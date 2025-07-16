import { useEffect, useState } from "react";
import { RatingModel } from "../Model/Rating";

export const useProductRatings = (productId: number) => {
  const [ratings, setRatings] = useState<RatingModel[]>([]);
  const [average, setAverage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/rating?productId=${productId}`);
        const data = await res.json();

        setRatings(data.ratings);
        setAverage(data.average);
                console.log("🚀 ~ fetchRatings ~ data.average:", data.average)
        setTotal(data.total);
      } catch (err) {
        console.error("❌ Lỗi khi fetch rating:", err);
        setError("Không thể tải đánh giá.");
      } finally {
        setLoading(false);
      }

    };

    if (productId) {
      fetchRatings();
    }
  }, [productId]);

  return { ratings, average, total, loading, error };
};
