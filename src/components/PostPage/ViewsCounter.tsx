// react
import { useState, useEffect } from "react";
// react icons
import { FaEye } from "react-icons/fa6";
// actions
import { actions } from "astro:actions";

type Props = {
  slug: string;
  title: string;
  category: string;
};

type ViewsCountData = {
  slug: string;
  count: string | null;
};

const ViewsCounter = ({ slug, title, category }: Props) => {
  const [data, setData] = useState<ViewsCountData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      const { data, error } = await actions.views.safe({
        slug,
        title,
        category,
      });
      if (error) {
        setError(error);
        return;
      }
      setData(data[0]);
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
