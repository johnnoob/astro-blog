// utils
import { useTheme } from "./utils";
import { useScrollDirection } from "../PostPage/utils";
// shadCN
import { Button } from "../ui/button";
// react components
import Link from "../Link";

type Props = {
  uniqueCategories: string[];
};

const CategoryNavBar = ({ uniqueCategories }: Props) => {
  const [theme, setTheme] = useTheme();
  const isScrollDown = useScrollDirection();
  return (
    <nav
      className={`fixed top-0 left-0 w-full text-sm backdrop-filter backdrop-blur-sm bg-opacity-80 border-b-[1px] h-[65px] z-10 transition-navbar ${
        theme === "light" ? "bg-white" : "bg-black"
      } ${isScrollDown ? "-translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-container h-full grid place-content-center">
        <div>
          {uniqueCategories.map((category, index) => (
            <Button key={index} variant="link">
              <Link
                filterType="categoryFilters"
                filter={category}
                className="s"
              >
                {category}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryNavBar;
