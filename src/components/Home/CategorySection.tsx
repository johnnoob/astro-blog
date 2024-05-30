import { type ClassifiedPosts } from "@/types/home";
import CardSm from "./CardSm";
import { Separator } from "../ui/separator";
type PostIdToMinutesMap = {
  [postId: string]: number;
};

type CategorySectionProps = {
  category: string;
  classifiedPosts: ClassifiedPosts;
  postIdToMinutesMap: PostIdToMinutesMap;
};

const CategorySection = ({
  category,
  classifiedPosts,
  postIdToMinutesMap,
}: CategorySectionProps) => {
  return (
    <section className="flex flex-col gap-4">
      <a href={`/categories/${category}`}>
        <h2 className="text-xl font-semibold hover:underline">{category}</h2>
      </a>
      <Separator />
      <div className="grid grid-cols-3 gap-3">
        {classifiedPosts[category].map((post, index) => (
          <CardSm
            key={index}
            url={`/blog/${post.slug}`}
            subcategory={post.data.subcategory}
            title={post.data.title}
            imageSrc={post.data.heroImage.src.src}
            imageAlt={post.data.heroImage.alt}
            date={post.data.date}
            author={post.data.author}
            minutes={postIdToMinutesMap[post.id]}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
