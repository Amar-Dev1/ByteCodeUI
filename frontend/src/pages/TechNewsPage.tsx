import { useState, useEffect } from "react";
import { FetchNews } from "../services";

const getTagColors = (tag: string) => {
  switch (tag.toUpperCase()) {
    case "RELEASE":
    case "INSIGHT":
    case "UPDATE":
      return "text-primary bg-primary/10";
    case "SECURITY":
      return "text-secondary bg-secondary/10";
    case "COMMUNITY":
      return "text-tertiary bg-tertiary/10";
    default:
      return "text-primary bg-primary/10";
  }
};

const TechNewsPage = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await FetchNews();
        setNews(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] w-full">
        <span className="material-symbols-outlined text-[48px] text-primary animate-spin mb-sm">
          progress_activity
        </span>
        <p className="text-on-surface-variant">Loading tech news...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-gutter md:p-xl max-w-container-max mx-auto w-full">
      {/* Header Section */}
      <header className="mb-xl border-b border-outline-variant pb-lg">
        <h1 className="font-headline-lg flex-auto text-on-surface mb-sm">
          Tech News
        </h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl">
          The latest updates, releases, and deep dives from the ByteCode
          ecosystem and the broader tech community.
        </p>
      </header>

      {/* News Feed - Information Dense List */}
      <div className="flex flex-col gap-lg">
        {news.map((article, i) => (
          <article
            key={article.guid || article.link || i}
            className="group bg-surface-container-low border border-outline-variant rounded-lg p-lg hover:border-outline transition-colors flex flex-col md:flex-row gap-lg items-start"
          >
            <div className="grow">
              <div className="flex items-center gap-sm mb-sm font-label-sm">
                <span
                  className={`px-xs py-unit rounded text-primary bg-primary/10`}
                >
                  NEWS
                </span>
                <time
                  className="text-on-surface-variant"
                  dateTime={article.pubDate}
                >
                  {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : "Recent"}
                </time>
              </div>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <h2 className="font-headline-md flex-auto text-on-surface mb-sm group-hover:text-primary transition-colors cursor-pointer">
                  {article.title}
                </h2>
              </a>
              <p className="font-body-md text-on-surface-variant line-clamp-3">
                {article.contentSnippet}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TechNewsPage;
