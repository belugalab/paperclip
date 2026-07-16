import { describe, expect, it } from "vitest";
import {
  buildAuthenticatedUrl,
  inferGitHost,
  resolveGitAuthToken,
} from "../services/git-auth.js";

describe("inferGitHost", () => {
  it("extracts hostname from valid URLs", () => {
    expect(inferGitHost("https://gitlab.com/org/repo")).toBe("gitlab.com");
    expect(inferGitHost("https://github.com/org/repo")).toBe("github.com");
    expect(inferGitHost("https://git.example.com/repo")).toBe("git.example.com");
    expect(inferGitHost("http://gitea.lan/repo.git")).toBe("gitea.lan");
  });

  it("returns null for invalid URLs", () => {
    expect(inferGitHost("not a url")).toBeNull();
    expect(inferGitHost("")).toBeNull();
    expect(inferGitHost("git@github.com:org/repo.git")).toBeNull();
  });
});

describe("resolveGitAuthToken", () => {
  const env = {
    GITLAB_TOKEN: "glpat-abc123",
    GITHUB_TOKEN: "ghp_xyz789",
    GIT_GITLAB_COM_TOKEN: "glpat-host-specific",
    GIT_GIT_EXAMPLE_COM_TOKEN: "self-hosted-token",
  };

  it("resolves host-specific token over generic GITLAB_TOKEN", () => {
    const result = resolveGitAuthToken("gitlab.com", {
      GITLAB_TOKEN: "glpat-abc123",
      GIT_GITLAB_COM_TOKEN: "glpat-host-specific",
    });
    expect(result).toEqual({ token: "glpat-host-specific", isGitLab: true });
  });

  it("resolves generic GITLAB_TOKEN when no host-specific token", () => {
    const result = resolveGitAuthToken("gitlab.com", {
      GITLAB_TOKEN: "glpat-abc123",
    });
    expect(result).toEqual({ token: "glpat-abc123", isGitLab: true });
  });

  it("resolves GITHUB_TOKEN for github.com", () => {
    const result = resolveGitAuthToken("github.com", env);
    expect(result).toEqual({ token: "ghp_xyz789", isGitLab: false });
  });

  it("resolves host-specific token for self-hosted instances", () => {
    const result = resolveGitAuthToken("git.example.com", env);
    expect(result).toEqual({ token: "self-hosted-token", isGitLab: false });
  });

  it("returns null when no token found", () => {
    expect(resolveGitAuthToken("gitlab.com", {})).toBeNull();
    expect(resolveGitAuthToken(null, env)).toBeNull();
  });

  it("detects gitlab in hostname for self-hosted instances", () => {
    const result = resolveGitAuthToken("gitlab.internal.company.com", {
      GIT_GITLAB_INTERNAL_COMPANY_COM_TOKEN: "self-hosted-gitlab-token",
    });
    expect(result).toEqual({ token: "self-hosted-gitlab-token", isGitLab: true });
  });
});

describe("buildAuthenticatedUrl", () => {
  it("embeds oauth2 token for gitlab.com", () => {
    const url = buildAuthenticatedUrl("https://gitlab.com/org/repo", {
      GITLAB_TOKEN: "glpat-abc123",
    });
    expect(url).toBe("https://oauth2:glpat-abc123@gitlab.com/org/repo");
  });

  it("embeds x-access-token for github.com", () => {
    const url = buildAuthenticatedUrl("https://github.com/org/repo", {
      GH_TOKEN: "ghp_xyz789",
    });
    expect(url).toBe("https://x-access-token:ghp_xyz789@github.com/org/repo");
  });

  it("strips existing credentials before embedding new ones", () => {
    const url = buildAuthenticatedUrl("https://secret:old-token@gitlab.com/org/repo", {
      GITLAB_TOKEN: "glpat-new-token",
    });
    expect(url).toBe("https://oauth2:glpat-new-token@gitlab.com/org/repo");
  });

  it("returns clean URL when no token available", () => {
    const url = buildAuthenticatedUrl("https://gitlab.com/org/repo", {});
    expect(url).toBe("https://gitlab.com/org/repo");
  });

  it("returns original string for invalid URLs", () => {
    expect(buildAuthenticatedUrl("not a url", { GITLAB_TOKEN: "abc" })).toBe("not a url");
  });

  it("uses host-specific token when available", () => {
    const url = buildAuthenticatedUrl("https://gitlab.com/org/repo", {
      GITLAB_TOKEN: "glpat-generic",
      GIT_GITLAB_COM_TOKEN: "glpat-specific",
    });
    expect(url).toBe("https://oauth2:glpat-specific@gitlab.com/org/repo");
  });

  it("handles self-hosted gitlab instances", () => {
    const url = buildAuthenticatedUrl("https://gitlab.mycompany.com/org/repo", {
      GITLAB_TOKEN: "glpat-abc123",
    });
    expect(url).toBe("https://oauth2:glpat-abc123@gitlab.mycompany.com/org/repo");
  });

  it("handles self-hosted github instances", () => {
    const url = buildAuthenticatedUrl("https://github.mycompany.com/org/repo", {
      GITHUB_TOKEN: "ghp_abc123",
    });
    expect(url).toBe("https://x-access-token:ghp_abc123@github.mycompany.com/org/repo");
  });
});
