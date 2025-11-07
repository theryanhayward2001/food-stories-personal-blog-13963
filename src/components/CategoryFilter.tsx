import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const categories = ["All Stories", "Philosophy", "Culture", "Sustainability", "Science"];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  articleCount: number;
}

const CategoryFilter = ({ activeCategory, onCategoryChange, articleCount }: CategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    setIsOpen(false);
  };

  const displayTopic = activeCategory === "All Stories" ? "Topic" : activeCategory;

  return (
    <div className="mb-12 relative" ref={dropdownRef}>
      <h2 className="text-3xl font-light">
        <span className="text-dark-chocolate">
          Filter {articleCount} {articleCount === 1 ? "article" : "articles"} by{" "}
        </span>
        <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center gap-2 cursor-pointer group">
          <span className="text-primary relative inline after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-hover:after:origin-bottom-left">
            {displayTopic}
          </span>
          {isOpen ? <ChevronUp className="w-6 h-6 text-primary" /> : <ChevronDown className="w-6 h-6 text-primary" />}
        </button>
      </h2>

      {isOpen && (
        <div className="absolute top-full mt-2 bg-card border border-border rounded-2xl shadow-xl z-50 min-w-[240px] py-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
              className={`w-full text-left px-6 py-3 transition-colors cursor-pointer ${
                activeCategory === category
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-dark-chocolate hover:bg-muted"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
