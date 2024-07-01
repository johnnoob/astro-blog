// react
import { useEffect, useState } from "react";
// react icons
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

type FeedbackInfo = {
  msg: string;
  avgRating?: number;
  count: number;
};
type Props = {
  slug: string;
  title: string;
  category: string;
};

const FeedbackInfo = ({ slug, title, category }: Props) => {
  const [data, setData] = useState<FeedbackInfo | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFeedbackStats = async () => {
      try {
        const response = await fetch(
          `/api/feedbacks?${new URLSearchParams({ slug, title, category })}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbackStats();
  }, [slug, title, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const defaultRatings = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1 text-muted-foreground text-sm">
      {defaultRatings.map((rating, index) => (
        <span key={index}>
          {typeof data?.avgRating === "undefined" ? (
            "haha"
          ) : data?.avgRating >= rating ? (
            <FaStar size={20} className="text-yellow-500" />
          ) : data?.avgRating > rating - 1 ? (
            <FaRegStarHalfStroke size={20} className="text-yellow-500" />
          ) : (
            <FaRegStar size={20} />
          )}
        </span>
      ))}
      {data?.avgRating?.toFixed(2)}
      {data?.count === 0 ? (
        <span>
          <a href="#feedback">({data?.count})</a>
        </span>
      ) : (
        <span>({data?.count})</span>
      )}
    </div>
  );
};

export default FeedbackInfo;
