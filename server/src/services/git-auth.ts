export function inferGitHost(repoUrl: string): string | null {
  try {
    return new URL(repoUrl.trim()).hostname;
  } catch {
    return null;
  }
}

function stripUrlCredentials(repoUrl: string): string {
  try {
    const parsed = new URL(repoUrl.trim());
    parsed.username = "";
    parsed.password = "";
    return parsed.toString();
  } catch {
    return repoUrl;
  }
}

export function resolveGitAuthToken(
  hostname: string | null,
  env: Record<string, string>,
): { token: string; isGitLab: boolean } | null {
  if (!hostname) return null;
  const envKey = `GIT_${hostname.replace(/\./g, "_").toUpperCase()}_TOKEN`;
  const isGitLab = hostname.includes("gitlab");
  const hostToken = env[envKey];
  if (hostToken) return { token: hostToken, isGitLab };

  const genericToken = isGitLab
    ? env["GITLAB_TOKEN"]
    : (env["GITHUB_TOKEN"] ?? env["GH_TOKEN"]);
  if (genericToken) return { token: genericToken, isGitLab };

  const fallbackToken = isGitLab
    ? (env["GITHUB_TOKEN"] ?? env["GH_TOKEN"])
    : env["GITLAB_TOKEN"];
  if (fallbackToken) return { token: fallbackToken, isGitLab };

  return null;
}

export function buildAuthenticatedUrl(
  repoUrl: string,
  resolvedEnv: Record<string, string>,
): string {
  const cleanUrl = stripUrlCredentials(repoUrl);
  const hostname = inferGitHost(cleanUrl);
  const auth = resolveGitAuthToken(hostname, resolvedEnv);
  if (!auth) return cleanUrl;

  const parsed = new URL(cleanUrl);
  parsed.username = auth.isGitLab ? "oauth2" : "x-access-token";
  parsed.password = auth.token;
  return parsed.toString();
}
