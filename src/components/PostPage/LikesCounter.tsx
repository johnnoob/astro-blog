// react
import React, { useState, useEffect } from "react";
// react icons
import { FaThumbsUp } from "react-icons/fa6";

type Props = {
  slug: string;
};

type LikeCountData = {
  slug: string;
  count: number;
};

const LikeCounter = ({ slug }: Props) => {
  const [data, setData] = useState<LikeCountData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(
          `/api/likes?${new URLSearchParams({ slug })}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      }
    };
    fetchLikes();
  }, [slug]);
  const handleLike = async () => {
    const sendLikeRequest = async () => {
      try {
        const response = await fetch(
          `/api/likes?${new URLSearchParams({ slug })}`,
          {
            method: "POST",
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("Unknown error"));
        }
      }
    };
    const updateLocalStorage = (slugs: string[]) => {
      window.localStorage.setItem("likedSlugs", JSON.stringify(slugs));
    };
    const getLikedSlugsFromLocalStorage = () => {
      const likedSlugs = window.localStorage.getItem("likedSlugs");
      return likedSlugs ? JSON.parse(likedSlugs) : [];
    };
    const likedSlugs = getLikedSlugsFromLocalStorage();
    if (!likedSlugs.includes(slug)) {
      await sendLikeRequest();
      likedSlugs.push(slug);
      updateLocalStorage(likedSlugs);
    }
  };

  if (error) {
    return (
      <div className="flex items-center gap-1">
        <FaThumbsUp size={15} />
        <span>0</span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center gap-1">
        <button onClick={handleLike}>
          <FaThumbsUp size={15} />
        </button>
        <span>0</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1">
      <button onClick={handleLike}>
        <FaThumbsUp size={15} />
      </button>
      <span>{data.count}</span>
    </div>
  );
};

export default LikeCounter;
