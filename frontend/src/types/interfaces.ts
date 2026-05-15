export interface INavItem {
  label: string;
  icon: string;
  path: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  role: string;
  title: string;
  avatar: string;
  bio: string;
  status: "⚡ Active" | "📚 Studying" | "🎯 Goal-oriented" | "🏗️ Building";
  interests: string[];
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface IBlogPost {
  id: string;
  _id?: string;
  slug: string | { current: string };
  title: string;
  description: string;
  category: string;
  image?: any;
  author?: IUser;
  authorUsername?: string;
  readTime: string;
  publishedAt: string;
  content?: string;
  likes: number;
  comments: number;
  shares: number;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  category: "Activity" | "Session";
  image?: string;
  startDate: string;
  endDate?: string;
  location: string;
  assets: { name: string; url: string }[];
  organizers: {
    name: string;
    role: string;
    image?: {
      asset: {
        url: string;
      };
    };
  }[];
}

export interface INewsArticle {
  id: string;
  title: string;
  description: string;
  tag: string;
  date: string;
}

export interface ISearchUser {
  _id: string;
  name: string;
  username: string;
  image: string;
}
