// @ts-ignore
import { client } from "../client";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

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

export const UpdateBlogComments = async (
  id: string,
  commentData: { username: string; profileImg?: string; comment: string; createdAt: string }
) => {
  try {
    const _key = Math.random().toString(36).substring(2, 15);
    const updateBlog = await client
      .patch(id)
      .setIfMissing({ comments: [] })
      .append('comments', [{ _key, ...commentData }])
      .commit();
    return updateBlog;
  } catch (err) {
    console.error(err);
  }
};

export const FetchBlogComments = async (id: string) => {
  try {
    const query = `*[_type == "blog" && _id == $id][0].comments`;
    const comments = await client.fetch(query, { id });
    return comments || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const FilterUsers = async (name: string) => {
  try {
    const res = await fetch(`${backendUrl}/users/${name}`);
    const users = await res.json();
    return users;
  } catch (err) {
    console.error(err);
  }
};

export const FetchUserById = async (id: string | number) => {
  try {
    const res = await fetch(`${backendUrl}/users/id/${id}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const user = await res.json();
    return user;
  } catch (err) {
    console.error('[FetchUserById] Failed:', err);
    return null;
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

export const FetchNews = async (retryCount = 1): Promise<any[] | null> => {
  try {
    const res = await axios.get(`${backendUrl}/news/get-rss`, {
      timeout: 60000, // 60 seconds
    });
    const news = res.data;
    // Guard: backend must return an array; fallback to [] if not
    return Array.isArray(news) ? news : [];
  } catch (err) {
    console.error(`[FetchNews] Failed (retries left: ${retryCount}):`, err);
    if (retryCount > 0) {
      console.log("[FetchNews] Retrying...");
      return FetchNews(retryCount - 1);
    }
    return null;
  }
};
