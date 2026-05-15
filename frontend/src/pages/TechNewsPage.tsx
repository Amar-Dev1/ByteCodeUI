import { mockNews } from "../data/mockData";

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
        {mockNews.map((article) => (
          <article
            key={article.id}
            className="group bg-surface-container-low border border-outline-variant rounded-lg p-lg hover:border-outline transition-colors flex flex-col md:flex-row gap-lg items-start"
          >
            <div className="grow">
              <div className="flex items-center gap-sm mb-sm font-label-sm">
                <span
                  className={`px-xs py-unit rounded ${getTagColors(
                    article.tag,
                  )}`}
                >
                  {article.tag}
                </span>
                <time
                  className="text-on-surface-variant"
                  dateTime={article.date}
                >
                  {article.date}
                </time>
              </div>
              <h2 className="font-headline-md flex-auto text-on-surface mb-sm group-hover:text-primary transition-colors cursor-pointer">
                {article.title}
              </h2>
              <p className="font-body-md text-on-surface-variant">
                {article.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TechNewsPage;
