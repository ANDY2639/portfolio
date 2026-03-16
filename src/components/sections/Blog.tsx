import { Link } from "react-router-dom";
import { useBlogPosts } from "../../hooks/useBlog";
import { SectionTitle } from "../common/SectionTitle";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function Blog() {
  const { data: posts, isLoading } = useBlogPosts();

  if (!isLoading && (!posts || posts.length === 0)) return null;

  return (
    <section id="blog" className="py-20 px-4 bg-base-100">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Blog" subtitle="Compartiendo conocimientos y experiencias" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="card bg-base-200 shadow-xl skeleton h-[450px]"></div>
              ))}
            </>
          )}
          
          {!isLoading && posts?.map((post) => (
            <div key={post.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all group overflow-hidden">
              {post.cover_image_url && (
                <figure className="relative overflow-hidden">
                  <img 
                    src={post.cover_image_url} 
                    alt={post.title} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </figure>
              )}
              <div className="card-body">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.slice(0, 2).map((tag: string) => (
                      <span key={tag} className="badge badge-primary badge-sm badge-outline">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-xs opacity-60">
                    {post.published_at && format(new Date(post.published_at), "d MMM, yyyy", { locale: es })}
                  </span>
                </div>
                <h3 className="card-title text-xl mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-sm opacity-80 line-clamp-3 mb-4">{post.excerpt}</p>
                <div className="card-actions justify-between items-center mt-auto">
                  <span className="text-xs font-medium opacity-60">{post.reading_time} min lectura</span>
                  <Link to={`/blog/${post.slug}`} className="btn btn-primary btn-sm">Leer más</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
