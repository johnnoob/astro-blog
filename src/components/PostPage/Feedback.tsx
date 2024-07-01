// react
import { useState, useEffect } from "react";
// react icons
import { FaSpinner } from "react-icons/fa6";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";
// shadCN
import { Card, CardFooter, CardContent, CardDescription } from "../ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

type Props = {
  slug: string;
  title: string;
  category: string;
};

type RatingData = {
  slug: string;
  rating: number;
  comment?: string;
};

const Feedback = ({ slug, title, category }: Props) => {
  const [data, setData] = useState<RatingData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isCommented, setIsCommented] = useState<boolean>(false);
  const [ratingSelected, setRatingSelected] = useState<number | null>(null);
  const [commentTyped, setCommentTyped] = useState<string | null>("");

  const getCommentedSlugsFromLocalStorage = (): string[] => {
    const commentedSlugs = window.localStorage.getItem("commentedSlugs");
    return commentedSlugs ? JSON.parse(commentedSlugs) : [];
  };
  const updateLocalStorage = (slugs: string[]) => {
    window.localStorage.setItem("commentedSlugs", JSON.stringify(slugs));
  };
  useEffect(() => {
    const likedSlugs = getCommentedSlugsFromLocalStorage();
    likedSlugs.includes(slug) ? setIsCommented(true) : setIsCommented(false);
  });
  useEffect(() => {
    const fetchFeedbackStats = async () => {
      try {
        const response = await fetch(
          `/api/feedbacks?${new URLSearchParams({ slug, title, category })}`
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
    fetchFeedbackStats();
  }, [slug, category, title]);

  const handleFeedback = async () => {
    const sendFeedback = async () => {
      try {
        const response = await fetch(
          `/api/feedbacks?${new URLSearchParams({ slug, title, category })}`,
          {
            method: "POST",
            body: JSON.stringify({
              rating: ratingSelected,
              comment: commentTyped,
            }),
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
    setIsLoading(true);
    await sendFeedback();
    setIsLoading(false);
    setRatingSelected(null);
    setCommentTyped("");
    let commentedSlugs = getCommentedSlugsFromLocalStorage();
    if (!commentedSlugs.includes(slug)) {
      commentedSlugs.push(slug);
      updateLocalStorage(commentedSlugs);
    } else {
      commentedSlugs = commentedSlugs.filter((s) => s !== slug);
      updateLocalStorage(commentedSlugs);
    }
  };

  const defaultRatings = [1, 2, 3, 4, 5];
  return (
    <Card id="feedback" className="w-full">
      <CardContent className="pt-4 flex flex-col gap-5">
        <CardDescription className="flex justify-center items-center gap-2 text-base">
          {isCommented ? (
            <div className="flex items-center gap-3">
              <span>
                <FaRegCircleCheck size={25} />
              </span>
              已對此文章評論，感謝回饋！
            </div>
          ) : (
            <div className="flex items-center gap-3">
              這文章如何？
              <span className="flex items-center gap-1">
                {defaultRatings.map((rating, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (ratingSelected === rating) {
                        setRatingSelected(null);
                      } else {
                        setRatingSelected(rating);
                      }
                    }}
                  >
                    {ratingSelected ? (
                      ratingSelected >= rating ? (
                        <FaStar size={25} className="text-yellow-300" />
                      ) : (
                        <FaRegStar size={25} />
                      )
                    ) : (
                      <FaRegStar size={25} />
                    )}
                  </button>
                ))}
              </span>
            </div>
          )}
        </CardDescription>
        <Textarea
          className={`w-full mx-auto text-base ${!ratingSelected && "hidden"}`}
          placeholder="分享你的回饋(可不填寫)..."
          onChange={(e) => setCommentTyped(e.target.value)}
        />
      </CardContent>
      <Separator />
      <CardFooter
        className={`py-3 flex justify-end bg-muted ${
          !ratingSelected && "hidden"
        }`}
      >
        <Button disabled={isLoading} onClick={handleFeedback}>
          <span className={`mr-2 animate-spin ${!isLoading && "hidden"}`}>
            <FaSpinner />
          </span>
          提交
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Feedback;
