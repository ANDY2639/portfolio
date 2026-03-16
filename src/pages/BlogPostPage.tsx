import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useBlogPost } from "../hooks/useBlog";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || "");

  if (isLoading) return <div className="min-h-screen pt-20 flex justify-center"><LoadingSpinner /></div>;
  if (error || !post) return <div className="min-h-screen pt-20"><ErrorMessage message="Post no encontrado" /></div>;

  return (
    <article className="min-h-screen pt-20 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Breadcrumbs */}
        <div className="text-sm breadcrumbs mb-8">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/#blog">Blog</Link></li>
            <li>{post.title}</li>
          </ul>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags?.map((tag) => (
              <span key={tag} className="badge badge-primary badge-lg">#{tag}</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm opacity-70">
            <span>{post.published_at && format(new Date(post.published_at), "d 'de' MMMM, yyyy", { locale: es })}</span>
            <span className="divider divider-horizontal"></span>
            <span>{post.reading_time} min de lectura</span>
            <span className="divider divider-horizontal"></span>
            <span>{post.views_count} vistas</span>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image_url && (
          <figure className="mb-12 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={post.cover_image_url} 
              alt={post.title} 
              className="w-full h-auto object-cover max-h-[500px]"
            />
          </figure>
        )}

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-pre:bg-neutral">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={atomDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-base-300">
          <div className="flex justify-between items-center">
            <Link to="/#blog" className="btn btn-outline">
              ← Volver al Blog
            </Link>
            <div className="flex gap-2">
              <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6a3 3 0 100-2.684m0 2.684l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
