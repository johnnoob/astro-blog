// react
import { useEffect, useState } from "react";
// react icons
import { FaRegStar, FaRegStarHalfStroke, FaStar } from "react-icons/fa6";

{
  /* <RatingData | null>(null) */
}
type FeedbackInfo = {
  msg: string;
  avgRating?: number;
};
type Props = {
  slug: string;
  title: string;
  category: string;
};

// const FeedbackInfo = ({ slug, title, category }: Props) => {
//   const [data, setData] = useState<FeedbackInfo | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   useEffect(() => {
//     const fetchAverageRating = async () => {
//       try {
//         const response = await fetch(
//           `/api/feedbacks?${new URLSearchParams({ slug, title, category })}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err);
//         } else {
//           setError(new Error("Unknown error"));
//         }
//       }
//     };
//     fetchAverageRating();
//   }, [slug]);
//     const avgRating =
//       typeof data?.avgRating === "number" && !isNaN(data.avgRating)
//         ? parseFloat(data.avgRating.toFixed(2))
//         : 0;

//   const ratings = [1, 2, 3, 4, 5];
//   return (
//     <div>
//       {ratings.map((rating, index) => (
//         <span key={index}>
//           {avgRating >= rating ? (
//             <FaStar />
//           ) : avgRating > rating - 1 ? (
//             <FaRegStarHalfStroke />
//           ) : (
//             <FaRegStar />
//           )}
//         </span>
//       ))}
//     </div>
//   );
// };
// const FeedbackInfo = ({ slug, title, category }: Props) => {
//   const [data, setData] = useState<FeedbackInfo | null>(null);
//   const [error, setError] = useState<Error | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchAverageRating = async () => {
//       try {
//         const response = await fetch(
//           `/api/feedbacks?${new URLSearchParams({ slug, title, category })}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (err) {
//         if (err instanceof Error) {
//           setError(err);
//         } else {
//           setError(new Error("Unknown error"));
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAverageRating();
//   }, [slug, title, category]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   const avgRating =
//     typeof data?.avgRating === "number" && !isNaN(data.avgRating)
//       ? parseFloat(data.avgRating.toFixed(2))
//       : 0;

//   const ratings = [1, 2, 3, 4, 5];

//   return (
//     <div>
//       {ratings.map((rating, index) => (
//         <span key={index}>
//           {avgRating >= rating ? (
//             <FaStar />
//           ) : avgRating >= rating - 0.5 ? (
//             <FaRegStarHalfStroke />
//           ) : (
//             <FaRegStar />
//           )}
//         </span>
//       ))}
//       <p>平均評價：{avgRating} 顆星</p>
//       <p>平均評價：{data?.avgRating} 顆星</p>
//     </div>
//   );
// };

const FeedbackInfo = ({ slug, title, category }: Props) => {
  const [data, setData] = useState<FeedbackInfo | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await fetch(
          `/api/feedbacks?${new URLSearchParams({ slug, title, category })}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let result = await response.json();
        result.avgRating = Number(result.avgRating);
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
    fetchAverageRating();
  }, [slug, title, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  //   const avgRating =
  //     typeof data?.avgRating === "number" && !isNaN(data.avgRating)
  //       ? parseFloat(data.avgRating.toFixed(2))
  //       : 0;

  const ratings = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {ratings.map((rating, index) => (
        <span key={index}>
          {typeof data?.avgRating === "undefined" ? (
            "haha"
          ) : data?.avgRating >= rating ? (
            <FaStar size={25} />
          ) : data?.avgRating >= rating - 0.5 ? (
            <FaRegStarHalfStroke size={25} />
          ) : (
            <FaRegStar size={25} />
          )}
        </span>
      ))}
      {/* <p>平均評價：{avgRating} 顆星</p> */}
      {/* 用於調試，確保 data?.avgRating 能正確更新 */}
      <p>{data?.avgRating?.toFixed(2)}</p>
    </div>
  );
};

export default FeedbackInfo;
