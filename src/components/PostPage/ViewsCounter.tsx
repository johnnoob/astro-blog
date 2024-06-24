import React, { useState, useEffect } from "react";

interface ViewCountProps {
  slug: string;
}

interface ViewCountData {
  count: number;
}

const ViewCount: React.FC<ViewCountProps> = ({ slug }) => {
  const [data, setData] = useState<ViewCountData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `/api/views?${new URLSearchParams({ slug })}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result: ViewCountData = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      }
    };

    fetchImage();
  }, [slug]);

  if (error) {
    return <span>1</span>;
  }

  if (!data) {
    return <span>Loading...</span>;
  }

  return <span>{data.count}</span>;
};

export default ViewCount;
