import { type ClassifiedPosts } from "@/types/home";
import CardSm from "./CardSm";

type CategorySectionProps = {
  category: string;
  classifiedPosts: ClassifiedPosts;
};

const CategorySection = ({
  category,
  classifiedPosts,
}: CategorySectionProps) => {
  classifiedPosts["人工智慧宇宙"].forEach(async (post) => {
    console.log((await post.render()).remarkPluginFrontmatter.minutes);
  });
  return (
    <section className="flex flex-col gap-2">
      <a href={`/categories/${category}`}>
        <h2 className="text-lg font-semibold hover:underline">{category}</h2>
      </a>
      <div className="grid grid-cols-5 gap-3">
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
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
