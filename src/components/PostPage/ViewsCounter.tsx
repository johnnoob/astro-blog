// react
import { useState, useEffect } from "react";
// react icons
import { FaEye } from "react-icons/fa6";

type Props = {
  slug: string;
  title: string;
  category: string;
};

type ViewsCountData = {
  slug: string;
  count: number;
};

const ViewsCounter = ({ slug, title, category }: Props) => {
  const [data, setData] = useState<ViewsCountData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  // useEffect(() => {
  //   const fetchViews = async () => {
  //     try {
  //       const response = await fetch(
  //         `/api/views?${new URLSearchParams({ slug })}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const result = await response.json();
  //       setData(result);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err);
  //       } else {
  //         setError(new Error("Unknown error"));
  //       }
  //     }
  //   };
  //   fetchViews();
  // }, [slug]);
  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(
          `/api/views?${new URLSearchParams({ slug, title, category })}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        console.log(result);

        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      }
    };
    fetchViews();
  }, [slug]);

  if (error) {
    return (
      <div className="flex items-center gap-1">
        <FaEye size={15} />
        <span>0</span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center gap-1">
        <FaEye size={15} />
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1">
      <FaEye size={15} />
      <span>{data.count}</span>
    </div>
  );
};

export default ViewsCounter;
