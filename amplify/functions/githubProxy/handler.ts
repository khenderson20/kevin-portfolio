/**
 * Minimal GitHub proxy to keep tokens server-side.
 *
 * Deploying on AWS Amplify (Gen2) allows you to store secrets as backend secrets
 * and inject them into this function without exposing them to the browser.
 *
 * This function supports:
 * - GET /github/user
 * - GET /github/repos
 * - GET /github/repos/:repo/languages
 * - GET /github/events
 *
 * It returns only the fields the frontend needs.
 */

type LambdaEvent = {
  rawPath?: string;
  path?: string;
  requestContext?: unknown;
  httpMethod?: string;
  headers?: Record<string, string | undefined>;
  queryStringParameters?: Record<string, string | undefined> | null;
};

type LambdaResult = {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
};

const JSON_HEADERS: Record<string, string> = {
  'content-type': 'application/json; charset=utf-8',
  // Basic hardening
  'cache-control': 'public, max-age=60',
};

const BASE_URL = 'https://api.github.com';
const USERNAME = process.env.GITHUB_USERNAME || 'khenderson20';
const TOKEN = process.env.GITHUB_TOKEN; // store as backend secret

function response(statusCode: number, payload: unknown): LambdaResult {
  return {
    statusCode,
    headers: JSON_HEADERS,
    body: JSON.stringify(payload),
  };
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'kevin-portfolio',
  };
  if (TOKEN) headers.Authorization = `token ${TOKEN}`;
  return headers;
}

async function githubFetch(path: string): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, { headers: getHeaders() });
}

export const handler = async (event: LambdaEvent): Promise<LambdaResult> => {
  try {
    const rawPath = event.rawPath || event.path || '';

    // Expected routes are mounted at /github/*
    const path = rawPath.replace(/^.*\/github/, '/github');

    if (path === '/github/user') {
      const res = await githubFetch(`/users/${encodeURIComponent(USERNAME)}`);
      if (!res.ok) return response(res.status, { error: 'GitHub API error', status: res.status });
      const data = await res.json();
      return response(200, {
        login: data.login,
        name: data.name,
        bio: data.bio,
        company: data.company,
        location: data.location,
        followers: data.followers,
        following: data.following,
        public_repos: data.public_repos,
        created_at: data.created_at,
        updated_at: data.updated_at,
      });
    }

    if (path === '/github/repos') {
      const res = await githubFetch(`/users/${encodeURIComponent(USERNAME)}/repos?sort=updated&per_page=100`);
      if (!res.ok) return response(res.status, { error: 'GitHub API error', status: res.status });
      const repos = await res.json();
      const filtered = (Array.isArray(repos) ? repos : [])
        .filter((r) => r && !r.fork && !r.archived)
        .map((r) => ({
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          description: r.description,
          html_url: r.html_url,
          homepage: r.homepage,
          language: r.language,
          topics: r.topics || [],
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          created_at: r.created_at,
          updated_at: r.updated_at,
          pushed_at: r.pushed_at,
          archived: r.archived,
          fork: r.fork,
        }));
      return response(200, filtered);
    }

    if (path.startsWith('/github/repos/') && path.endsWith('/languages')) {
      const parts = path.split('/');
      const repo = parts[3];
      if (!repo) return response(400, { error: 'Missing repo' });
      const res = await githubFetch(`/repos/${encodeURIComponent(USERNAME)}/${encodeURIComponent(repo)}/languages`);
      if (!res.ok) return response(res.status, { error: 'GitHub API error', status: res.status });
      const languages = await res.json();
      return response(200, Object.keys(languages || {}));
    }

    if (path === '/github/events') {
      const res = await githubFetch(`/users/${encodeURIComponent(USERNAME)}/events?per_page=30`);
      if (!res.ok) return response(res.status, { error: 'GitHub API error', status: res.status });
      const events = await res.json();
      // only return minimal fields used by GitHubStatsService
      const compact = (Array.isArray(events) ? events : []).map((e) => ({
        id: e.id,
        type: e.type,
        created_at: e.created_at,
        repo: e.repo ? { name: e.repo.name, url: e.repo.url } : undefined,
        payload: e.payload ? { commits: e.payload.commits } : undefined,
      }));
      return response(200, compact);
    }

    return response(404, { error: 'Not found' });
  } catch (err) {
    return response(500, { error: 'Internal error' });
  }
};

