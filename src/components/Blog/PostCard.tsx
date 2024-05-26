import { Card, CardTitle, CardHeader } from "../ui/card";
type HeroImage = {
  src: {
    src: string;
    width: number;
    height: number;
    format: string;
    fsPath: string;
  };
  alt: string;
};

type PostCardProps = {
  title: string;
  category: string;
  subcategory: string;
  tags: string[];
  date: string;
  author: string;
  image: HeroImage;
  slug: string;
  body: string;
};

const PostCard = ({
  title,
  category,
  subcategory,
  tags,
  date,
  author,
  image,
  slug,
  body,
}: PostCardProps) => {
  console.log(image.src);

  return (
    <Card className="rounded-2xl border shadow-[0.4rem_0.4rem_0_0_hsl(var(--muted))]">
      <CardHeader className="space-y-2">
        <img src={image.src.src} alt={image.alt} width={100} height={100} />
      </CardHeader>
    </Card>
  );
};

export default PostCard;
