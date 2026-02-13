import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogCardProps {
  id?: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  bgColor: string;
}

const BlogCard = ({ id, title, excerpt, image, category, bgColor }: BlogCardProps) => {
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    const fetchCommentCount = async () => {
      if (!id) return;

      const { count } = await supabase
        .from("comments")
        .select("*", { count: "exact", head: true })
        .eq("article_id", id);

      setCommentCount(count || 0);
    };

    fetchCommentCount();
  }, [id]);

  // Randomize rotation slightly per card for hand-drawn feel
  const rotation = [-0.6, 0.4, -0.3, 0.7, -0.5][Math.abs(title.length % 5)];

  return (
    <Link
      to={id ? `/article/${id}` : "#"}
      className="block group relative overflow-hidden bg-background border-2 border-foreground rounded-[4px] p-8 md:p-12 cursor-pointer transition-all duration-200 hover:translate-y-[1px]"
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: "3px 3px 0px rgba(0,0,0,0.15)",
      }}
    >
      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        {/* Image side */}
        <div className="relative">
          <div className="relative border-2 border-foreground rounded-[4px] overflow-hidden" style={{ transform: "rotate(0.5deg)" }}>
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Content side */}
        <div className="space-y-4">
          <div className="inline-block">
            <span
              className="text-xs font-bold text-foreground/70 tracking-wider uppercase border-2 border-foreground px-3 py-1 rounded-[4px]"
              style={{ transform: "rotate(0.3deg)", display: "inline-block" }}
            >
              {category}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-serif leading-tight text-foreground" style={{ transform: "rotate(-0.3deg)" }}>
            {title}
          </h3>

          <p className="text-foreground/70 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center justify-between mt-4">
            <button className="sharpie-btn bg-primary text-primary-foreground px-4 py-2 text-sm inline-flex items-center gap-2">
              <span>READ MORE</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={`/article/${id}#comments`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
