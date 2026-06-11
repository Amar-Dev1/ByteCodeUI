import { client } from "../client";

export const FetchBlogs = async () => {
  try {
    const query = `*[_type == "blog"] | order(createdAt desc) {
        _id, 
        title,
        slug,
        description,
        category,
        image {
        asset -> {
        url
          }
        },
        authorUsername,
        publishedAt,
        readTime,
        content,
        likes,
        comments,
        shares,
      }`;

    const blogs = await client.fetch(query);
    return blogs;
  } catch (err) {
    console.error(err);
  }
};

export const FetchSingleBlog = async (slug: string) => {
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0] {
        _id, 
        title,
        slug,
        description,
        category,
        image {
          asset -> {
            url
          }
        },
        authorUsername,
        publishedAt,
        readTime,
        content,
        likes,
        comments,
        shares
      }`;

    const blog = await client.fetch(query, { slug });
    return blog;
  } catch (err) {
    console.error(err);
  }
};

export const FetchEvents = async () => {
  try {
    const query = `*[_type == "event"] | order(createdAt desc) {
        _id,
        title,
        description,
        category,
        image {
        asset -> {
        url
          }
        },
        startDate,
        endDate,
        location,
        assets[] {
          "name": asset->originalFilename,
          "url": asset->url
        },
        organizers[] {
          name,
          role,
          image {
            asset -> {
              url
            }
          }
        }
      }`;

    const events = await client.fetch(query);
    return events;
  } catch (err) {
    console.error(err);
  }
};

export const UpdateBlogLikes = async (id: string, value: number = 1) => {
  try {
    const updateBlog = await client
      .patch(id)
      .setIfMissing({ likes: 0 })
      .inc({ likes: value })
      .commit();
    return updateBlog;
  } catch (err) {
    console.error(err);
  }
};

export const UpdateBlogComments = async (id: string, comment: string) => {
  try {
    const updateBlog = await client
      .patch(id)
      .append({ userId: id, comment })
      .commit();
    return updateBlog;
  } catch (err) {
    console.error(err);
  }
};

export const FilterUsers = async (name: string) => {
  try {
    const res = await fetch(`http://localhost:3000/users/${name}`);
    const users = await res.json();
    return users;
  } catch (err) {
    console.error(err);
  }
};

export const SearchBlogs = async (query: string) => {
  try {
    const groqQuery = `*[_type == "blog" && (title match $q || description match $q)] | order(createdAt desc) {
        _id,
        title,
        slug,
        description,
        category,
        image {
          asset -> {
            url
          }
        },
        authorUsername,
        publishedAt,
        readTime,
        content,
        likes,
        comments,
        shares
      }`;

    const blogs = await client.fetch(groqQuery, { q: `*${query}*` });
    return blogs;
  } catch (err) {
    console.error(err);
  }
};

export const SearchEvents = async (query: string) => {
  try {
    const groqQuery = `*[_type == "event" && (title match $q || description match $q)] | order(createdAt desc) {
        _id,
        title,
        description,
        category,
        image {
          asset -> {
            url
          }
        },
        startDate,
        endDate,
        location,
        assets[] {
          "name": asset->originalFilename,
          "url": asset->url
        },
        organizers[] {
          name,
          role,
          image {
            asset -> {
              url
            }
          }
        }
      }`;

    const events = await client.fetch(groqQuery, { q: `*${query}*` });
    return events;
  } catch (err) {
    console.error(err);
  }
};

export const FilterEvents = async (category: string) => {
  try {
    if (category === "All Categories") {
      return await FetchEvents();
    }

    const groqQuery = `*[_type == "event" && category == $category] | order(createdAt desc) {
        _id,
        title,
        description,
        category,
        image {
          asset -> {
            url
          }
        },
        startDate,
        endDate,
        location,
        assets[] {
          "name": asset->originalFilename,
          "url": asset->url
        },
        organizers[] {
          name,
          role,
          image {
            asset -> {
              url
            }
          }
        }
      }`;

    const events = await client.fetch(groqQuery, { category });
    return events;
  } catch (err) {
    console.error(err);
  }
};

export const FetchSingleEvent = async (id: string) => {
  try {
    const query = `*[_type == "event" && _id == $id][0] {
        _id,
        title,
        description,
        category,
        image {
          asset -> {
            url
          }
        },
        startDate,
        endDate,
        location,
        assets[] {
          "name": asset->originalFilename,
          "url": asset->url
        },
        organizers[] {
          name,
          role,
          image {
            asset -> {
              url
            }
          }
        }
      }`;

    const event = await client.fetch(query, { id });
    return event;
  } catch (err) {
    console.error(err);
  }
};

export const FetchNews = async (): Promise<any[]> => {
  try {
    const res = await fetch("http://localhost:3000/news/get-rss");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const news = await res.json();
    // Guard: backend must return an array; fallback to [] if not
    return Array.isArray(news) ? news : [];
  } catch (err) {
    console.error('[FetchNews] Failed:', err);
    return [];
  }
};
