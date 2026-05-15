import type {
  IUser,
  IBlogPost,
  IEvent,
  INavItem,
  INewsArticle,
} from "../types/interfaces";

// ── Navigation ──────────────────────────────────────

export const sidebarNavItems: INavItem[] = [
  { label: "Home", icon: "home", path: "/" },
  { label: "Explore", icon: "explore", path: "/" },
  { label: "Events", icon: "calendar_month", path: "/events" },
  { label: "My Profile", icon: "person", path: "/profile" },
  { label: "Settings", icon: "settings", path: "/settings" },
  { label: "Help", icon: "help", path: "/help" },
];


// ── Mock User ───────────────────────────────────────

export const mockUser: IUser = {
  id: "1",
  name: "Alex Dev",
  username: "alexcodes",
  title: "Full Stack Developer",
  role: "Admin",
  avatar: "",
  bio: "Passionate software engineer focused on building scalable, high-performance web applications. I believe in clean code, robust architecture, and continuous learning. Always excited to dive into new technologies and solve complex problems.",
  status: "⚡ Active",
  interests: [
    "React",
    "TypeScript",
    "NestJS",
    "Docker",
    "GraphQL",
    "Rust",
    "System Design",
    "Open Source",
  ],
  links: {
    github: "https://github.com/alexcodes",
    linkedin: "https://linkedin.com/in/alexcodes",
    website: "https://alexcodes.dev",
  },
};

// ── Mock Blog Posts ─────────────────────────────────

export const mockBlogPosts: IBlogPost[] = [
  {
    id: "1",
    slug: "migrating-monolith-to-microservices",
    title: "Migrating a Monolith to Microservices: A 12-Month Post-Mortem",
    description:
      "An honest look at the technical debt, architectural decisions, and team friction we encountered while tearing down our five-year-old monolithic backend.",
    category: "Experience",
    author: mockUser,
    readTime: "12 min read",
    publishedAt: "2024-12-15",
    likes: 234,
    comments: 45,
    shares: 89,
  },
  {
    id: "2",
    slug: "vim-vs-vscode",
    title: "Vim vs VS Code: Stop Fighting and Use Both",
    description:
      "Why dogmatism is hurting your productivity and how to hybridize your workflow.",
    category: "Advice",
    author: mockUser,
    readTime: "6 min read",
    publishedAt: "2024-12-10",
    likes: 512,
    comments: 128,
    shares: 234,
  },
  {
    id: "3",
    slug: "bytecode-hackathon-2024",
    title: "ByteCode Hackathon 2024 Registration Open",
    description:
      "Join us for a 48-hour sprint focusing on Open Source AI tooling. Prizes, networking, and endless coffee.",
    category: "Announcement",
    author: mockUser,
    readTime: "3 min read",
    publishedAt: "2024-12-08",
    likes: 89,
    comments: 12,
    shares: 56,
  },
  {
    id: "4",
    slug: "staff-engineer-promotion",
    title: "Navigating the Staff Engineer Promotion",
    description:
      "It's not just about writing better code. Learn the communication and architectural scoping skills required for the jump.",
    category: "Career",
    author: mockUser,
    readTime: "8 min read",
    publishedAt: "2024-12-05",
    likes: 345,
    comments: 67,
    shares: 123,
  },
  {
    id: "5",
    slug: "bytecode-cli-v24",
    title: "ByteCode CLI v2.4 is Live",
    description:
      "Improved scaffolding speeds, new template repositories, and automated dependency resolution logic.",
    category: "Announcement",
    author: mockUser,
    readTime: "4 min read",
    publishedAt: "2024-12-01",
    likes: 156,
    comments: 23,
    shares: 45,
  },
  {
    id: "6",
    slug: "building-resilient-microservices-rust-grpc",
    title: "Building Resilient Microservices with Rust and gRPC",
    description:
      "A deep dive into how migrating our core orchestration layer from Go to Rust reduced p99 latency by 40% while maintaining robust error handling boundaries.",
    category: "Experience",
    author: mockUser,
    readTime: "15 min read",
    publishedAt: "2024-11-28",
    content: `When we first started building the orchestration layer for the ByteCode platform, Go was the natural choice. Its concurrency model and standard library made standing up services incredibly fast. However, as our throughput scaled beyond 10k RPS per node, we started seeing unpredictable latency spikes tied to garbage collection cycles.

## The Breaking Point

The p99 latency was fluctuating between 12ms and 180ms. For our real-time notification pipeline, this was unacceptable. We needed deterministic performance without sacrificing developer ergonomics entirely.

After evaluating several options, we settled on Rust with Tonic for our gRPC layer. The promise of zero-cost abstractions and no garbage collector was compelling.

\`\`\`rust
use tonic::{transport::Server, Request, Response, Status};

pub struct OrchestratorService {
    pool: ConnectionPool,
}

#[tonic::async_trait]
impl Orchestrator for OrchestratorService {
    async fn dispatch(
        &self,
        request: Request<DispatchRequest>,
    ) -> Result<Response<DispatchResponse>, Status> {
        let req = request.into_inner();
        let result = self.pool.execute(req.payload).await
            .map_err(|e| Status::internal(e.to_string()))?;
        
        Ok(Response::new(DispatchResponse {
            status: "ok".into(),
            data: result,
        }))
    }
}
\`\`\`

## Implementation: The gRPC Layer

The migration was not without its challenges. Rust's ownership model forced us to rethink how we passed data between service boundaries. But the compiler caught bugs at build time that would have been runtime panics in Go.

## Memory Management

With Rust, memory usage became predictable. No GC pauses, no unexpected allocations. Our p99 dropped to a consistent 8ms.

## Conclusion

The migration took 4 months but the results speak for themselves: 40% reduction in p99 latency, 60% reduction in memory usage, and zero runtime panics in production over 6 months.`,
    likes: 678,
    comments: 89,
    shares: 234,
  },
];

// ── Mock Events ─────────────────────────────────────

export const mockEvents: IEvent[] = [
  {
    id: "1",
    title: "Global Hack Summit",
    description:
      "Join top developers for a 48-hour challenge building the next generation of decentralized apps.",
    category: "Event",
    startDate: "2025-02-15",
    endDate: "2025-02-17",
    location: "Online",
  },
  {
    id: "2",
    title: "Design Systems Deep Dive",
    description:
      "An interactive workshop on scaling UI architecture across large engineering teams.",
    category: "Session",
    startDate: "2025-01-20",
    location: "Main Stage",
  },
];


// ── Mock News ───────────────────────────────────────

export const mockNews: INewsArticle[] = [
  {
    id: "news-1",
    title: "ByteCode Core v2.4.0: Quantum Routing Enabled",
    description:
      "The latest release of the ByteCode Core engine introduces Quantum Routing, significantly reducing latency for distributed microservices. This update also deprecates the legacy REST fallback handlers, urging developers to migrate to the new gRPC standard outlined in last month's roadmap. Expect a 15% performance bump on standard clusters.",
    tag: "RELEASE",
    date: "Oct 24, 2023",
  },
  {
    id: "news-2",
    title: "Critical Patch Issued for Nexus Auth Module",
    description:
      "A zero-day vulnerability affecting the Nexus Auth module (versions 1.2.x through 1.8.x) has been patched. The exploit allowed token spoofing under specific load conditions. All ByteCode enterprise users are advised to update to version 1.9.0 immediately. Cloud-hosted environments have already been patched automatically overnight.",
    tag: "SECURITY",
    date: "Oct 22, 2023",
  },
  {
    id: "news-3",
    title: "Announcing the 2024 Global Hackathon Winners",
    description:
      'After 48 hours of intense coding, the results are in. Team "Null Pointers" took the grand prize with their innovative implementation of edge-computed ML models for predictive maintenance. Read the full breakdown of the winning projects, architectural choices, and interviews with the top three teams on the community blog.',
    tag: "COMMUNITY",
    date: "Oct 18, 2023",
  },
  {
    id: "news-4",
    title: "The Future of WebAssembly in Enterprise Stacks",
    description:
      "As WebAssembly matures, its adoption in enterprise environments is accelerating. We analyze recent trends showing a shift from experimental usage to core infrastructure components. This deep dive covers performance metrics, security boundaries, and why ByteCode is investing heavily in Wasm-native tooling for the upcoming year.",
    tag: "INSIGHT",
    date: "Oct 15, 2023",
  },
  {
    id: "news-5",
    title: "New Developer Console UX Now in Open Beta",
    description:
      "We are overhauling the developer console to focus on density and speed. The new beta introduces a command-palette-first approach, reducing mouse travel for common tasks like log inspection and service deployment. Opt-in via your account settings and provide feedback directly through the new integrated terminal widget.",
    tag: "UPDATE",
    date: "Oct 10, 2023",
  },
];
