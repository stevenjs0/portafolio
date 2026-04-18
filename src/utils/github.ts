import { SITE } from './site';

export interface GitHubUser {
  name: string;
  login: string;
  avatar_url: string;
  bio: string;
  blog: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const GITHUB_USERNAME = SITE.githubUsername;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour in milliseconds

// In-memory cache with TTL
const profileCache = new Map<string, CacheEntry<GitHubUser>>();

export async function getGitHubProfile(): Promise<GitHubUser | null> {
  const now = Date.now();
  const cached = profileCache.get(GITHUB_USERNAME);

  // Return cached data if still valid (< 1 hour old)
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (!res.ok) return null;
    const data: GitHubUser = await res.json();

    // Cache the response with current timestamp
    profileCache.set(GITHUB_USERNAME, { data, timestamp: now });

    return data;
  } catch {
    return null;
  }
}

export function getGitHubAvatarUrl(): string {
  return `https://avatars.githubusercontent.com/${GITHUB_USERNAME}`;
}
