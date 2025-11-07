import { Link } from "react-router-dom";

interface RelatedPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  // Don't render if no posts
  if (posts.length === 0) return null;

  return (
    <section className="py-8 bg-warm-cream/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-normal mb-8 text-dark-chocolate">
            Related Posts
          </h2>

          <div className="space-y-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/article/${post.id}`}
                className="block group"
              >
                <div className="flex gap-4 p-4 bg-white rounded-2xl border border-dark-chocolate/10 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-dark-chocolate mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-dark-chocolate/70 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
