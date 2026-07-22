import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { models as claudeFallbackModels } from "@paperclipai/adapter-claude-local";
import { resetClaudeModelsCacheForTests } from "@paperclipai/adapter-claude-local/server";
import { models as codexFallbackModels } from "@paperclipai/adapter-codex-local";
import { models as cursorFallbackModels } from "@paperclipai/adapter-cursor-local";
import { models as opencodeFallbackModels } from "@paperclipai/adapter-opencode-local";
import { resetOpenCodeModelsCacheForTests } from "@paperclipai/adapter-opencode-local/server";
import { listAdapterModels, listServerAdapters, refreshAdapterModels, registerServerAdapter, resetOpenRouterModelsCacheForTests, unregisterServerAdapter } from "../adapters/index.js";
import { resetCodexModelsCacheForTests } from "../adapters/codex-models.js";
import { resetCursorModelsCacheForTests, setCursorModelsRunnerForTests } from "../adapters/cursor-models.js";

vi.mock("acpx/runtime", () => ({
  createAcpRuntime: vi.fn(),
  createAgentRegistry: vi.fn(),
  createRuntimeStore: vi.fn(),
  isAcpRuntimeError: vi.fn(() => false),
}));

describe("adapter model listing", () => {
  beforeEach(() => {
    delete process.env.OPENAI_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_BASE_URL;
    delete process.env.ANTHROPIC_BEDROCK_BASE_URL;
    delete process.env.CLAUDE_CODE_USE_BEDROCK;
    delete process.env.PAPERCLIP_OPENCODE_COMMAND;
    delete process.env.PAPERCLIP_ADAPTER_MODELS;
    delete process.env.OPENROUTER_BASE_URL;
    delete process.env.OPENROUTER_API_KEY;
    resetClaudeModelsCacheForTests();
    resetCodexModelsCacheForTests();
    resetCursorModelsCacheForTests();
    setCursorModelsRunnerForTests(null);
    resetOpenCodeModelsCacheForTests();
    resetOpenRouterModelsCacheForTests();
    vi.restoreAllMocks();
  });

  it("returns an empty list for unknown adapters", async () => {
    const models = await listAdapterModels("unknown_adapter");
    expect(models).toEqual([]);
  });

  it("does not expose models for the retired acpx_local tombstone", () => {
    const adapter = listServerAdapters().find((candidate) => candidate.type === "acpx_local");

    expect(adapter?.models).toEqual([]);
  });

  it("returns codex fallback models when no OpenAI key is available", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const models = await listAdapterModels("codex_local");

    expect(models).toEqual(codexFallbackModels);
    // The bare gpt-5.6 alias is intentionally not advertised (Codex has no metadata for it).
    expect(models.some((model) => model.id === "gpt-5.6")).toBe(false);
    expect(models.some((model) => model.id === "gpt-5.6-sol")).toBe(true);
    expect(models.some((model) => model.id === "gpt-5.6-terra")).toBe(true);
    expect(models.some((model) => model.id === "gpt-5.6-luna")).toBe(true);
    expect(models.some((model) => model.id === "gpt-5.3-codex-spark")).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns claude fallback models including the latest Opus alias when no Anthropic key is available", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const models = await listAdapterModels("claude_local");

    expect(models).toEqual(claudeFallbackModels);
    expect(models.some((model) => model.id === "claude-opus-4-8")).toBe(true);
    // Newer flagship models are offered, but Opus 4.8 stays the default (first) option.
    expect(models[0]?.id).toBe("claude-opus-4-8");
    expect(models.some((model) => model.id === "claude-sonnet-5")).toBe(true);
    expect(models.some((model) => model.id === "claude-fable-5-1")).toBe(true);
    expect(models.some((model) => model.id === "claude-fable-5")).toBe(true);
    expect(models.some((model) => model.id === "claude-mythos-5")).toBe(true);
    // Opus 5 is a current GA flagship and must be offered even when live discovery is unavailable.
    expect(models.some((model) => model.id === "claude-opus-5")).toBe(true);
    expect(models).toContainEqual({ id: "claude-opus-5-5", label: "Claude Opus 5.5" });
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("loads claude models dynamically and merges fallback options", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-ant-test";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: "claude-sonnet-4-20250514", display_name: "Claude Sonnet 4" },
          { id: "claude-opus-4-8-20260529", display_name: "Claude Opus 4.8" },
        ],
      }),
    } as Response);

    const first = await listAdapterModels("claude_local");
    const second = await listAdapterModels("claude_local");

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(first).toEqual(second);
    expect(first.some((model) => model.id === "claude-opus-4-8-20260529")).toBe(true);
    expect(first.some((model) => model.id === "claude-opus-4-8")).toBe(true);
    expect(first.some((model) => model.id === "claude-opus-5-5")).toBe(true);
  });

  it("refreshes cached claude models on demand", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-ant-test";
    const fetchSpy = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ id: "claude-sonnet-4-20250514", display_name: "Claude Sonnet 4" }],
        }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          data: [{ id: "claude-opus-4-8-20260529", display_name: "Claude Opus 4.8" }],
        }),
      } as Response);

    const initial = await listAdapterModels("claude_local");
    const refreshed = await refreshAdapterModels("claude_local");

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(initial.some((model) => model.id === "claude-sonnet-4-20250514")).toBe(true);
    expect(refreshed.some((model) => model.id === "claude-opus-4-8-20260529")).toBe(true);
  });

  it("falls back to static claude models when Anthropic model discovery fails", async () => {
    process.env.ANTHROPIC_API_KEY = "sk-ant-test";
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    } as Response);

    const models = await listAdapterModels("claude_local");
    expect(models).toEqual(claudeFallbackModels);
  });

  it.each([
    ["claude-fable-5-1", "Claude Fable 5.1"],
    ["claude-opus-5-5", "Claude Opus 5.5"],
  ])("does not duplicate %s when discovery returns the identical ID", async (id, displayName) => {
    process.env.ANTHROPIC_API_KEY = "sk-ant-test";
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [{ id, display_name: displayName }],
      }),
    } as Response);

    const models = await listAdapterModels("claude_local");

    expect(models.filter((model) => model.id === id)).toEqual([{ id, label: displayName }]);
    // Curated fallbacks discovery did not return are still merged in.
    expect(models.some((model) => model.id === "claude-fable-5")).toBe(true);
    expect(models.some((model) => model.id === "claude-opus-4-8")).toBe(true);
  });

  it("exposes the Bedrock-native Fable 5.1 ID (never the direct ID) in Bedrock mode", async () => {
    process.env.CLAUDE_CODE_USE_BEDROCK = "1";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const models = await listAdapterModels("claude_local");

    // Keep Opus 4.8 first, using its documented dateless Bedrock ID.
    expect(models[0]?.id).toBe("us.anthropic.claude-opus-4-8");
    expect(models.map((model) => model.id)).toEqual(expect.arrayContaining([
      "us.anthropic.claude-opus-5-5", "us.anthropic.claude-opus-5", "us.anthropic.claude-sonnet-5",
      "us.anthropic.claude-fable-5-1", "us.anthropic.claude-opus-4-7", "us.anthropic.claude-sonnet-4-6",
    ]));
    expect(models.map((model) => model.id)).not.toEqual(expect.arrayContaining(["us.anthropic.claude-opus-4-8-v1"]));
    expect(models.some((model) => model.id === "claude-fable-5-1")).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it.each([
    ["gemini_local", ["gemini-3.8-flash", "gemini-3.7-flash", "gemini-3.6-flash", "gemini-3.5-flash", "gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3-flash-preview"]],
    ["grok_local", ["grok-build", "grok-4.7", "grok-4.6", "grok-4.5"]],
    ["kimi_local", ["kimi-code/kimi-for-coding", "kimi-code/k3", "kimi-code/k3-256k"]],
  ])("lists current %s models without a provider login", async (adapter, expectedIds) => {
    const models = await listAdapterModels(adapter as string);
    expect(models.map((model) => model.id)).toEqual(expect.arrayContaining(expectedIds as string[]));
    expect(new Set(models.map((model) => model.id)).size).toBe(models.length);
    if (adapter === "gemini_local") {
      expect(models.some((model) => model.id.startsWith("gemini-2.0-"))).toBe(false);
    }
    if (adapter === "kimi_local") {
      expect(models).toContainEqual({ id: "kimi-code/kimi-for-coding", label: "K2.8 Preview" });
    }
  });

  it("includes current Cursor fallbacks when runtime discovery is unavailable", async () => {
    setCursorModelsRunnerForTests(() => ({ status: 1, stdout: "", stderr: "", hasError: true }));
    const models = await listAdapterModels("cursor");
    expect(models.map((model) => model.id)).toEqual(expect.arrayContaining([
      "composer-2.5", "claude-opus-5-5", "claude-fable-5-1", "claude-sonnet-5",
      "gpt-5.6-sol", "gpt-5.6-terra", "gpt-5.6-luna", "grok-4.7", "gemini-3.8-flash", "muse-spark-1.3",
    ]));
  });

  it("keeps general OpenAI API models out of the Codex catalog", async () => {
    process.env.OPENAI_API_KEY = "sk-test";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          { id: "gpt-image-1" },
          { id: "text-embedding-3-large" },
        ],
      }),
    } as Response);

    const first = await listAdapterModels("codex_local");
    const second = await listAdapterModels("codex_local");

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(first).toEqual(codexFallbackModels);
    expect(second).toEqual(codexFallbackModels);
  });

  it("keeps the curated Codex list when refreshing with an OpenAI key", async () => {
    process.env.OPENAI_API_KEY = "sk-test";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    const initial = await listAdapterModels("codex_local");
    const refreshed = await refreshAdapterModels("codex_local");

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(initial).toEqual(codexFallbackModels);
    expect(refreshed).toEqual(codexFallbackModels);
  });

  it("uses static Codex models without calling OpenAI model discovery", async () => {
    process.env.OPENAI_API_KEY = "sk-test";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({}),
    } as Response);

    const models = await listAdapterModels("codex_local");
    expect(models).toEqual(codexFallbackModels);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("uses a custom Codex adapter's model and refresh hooks", async () => {
    const builtin = listServerAdapters().find((adapter) => adapter.type === "codex_local")!;
    const customModels = [{ id: "plugin-codex", label: "Plugin Codex" }];
    const listModels = vi.fn(async () => customModels);
    const refreshModels = vi.fn(async () => customModels);
    registerServerAdapter({ ...builtin, models: [], listModels, refreshModels });
    try {
      await expect(listAdapterModels("codex_local")).resolves.toEqual(customModels);
      await expect(refreshAdapterModels("codex_local")).resolves.toEqual(customModels);
      expect(listModels).toHaveBeenCalledOnce();
      expect(refreshModels).toHaveBeenCalledOnce();

      process.env.PAPERCLIP_ADAPTER_MODELS = JSON.stringify({
        codex_local: [{ id: "declared-codex", label: "Declared Codex" }],
      });
      const declared = [{ id: "declared-codex", label: "Declared Codex" }];
      await expect(listAdapterModels("codex_local")).resolves.toEqual(declared);
      await expect(refreshAdapterModels("codex_local")).resolves.toEqual(declared);
      expect(listModels).toHaveBeenCalledOnce();
      expect(refreshModels).toHaveBeenCalledOnce();
    } finally {
      delete process.env.PAPERCLIP_ADAPTER_MODELS;
      unregisterServerAdapter("codex_local");
    }
  });


  it("returns cursor fallback models when CLI discovery is unavailable", async () => {
    setCursorModelsRunnerForTests(() => ({
      status: null,
      stdout: "",
      stderr: "",
      hasError: true,
    }));

    const models = await listAdapterModels("cursor");
    expect(models).toEqual(cursorFallbackModels);
  });

  it("returns current provider-qualified OpenCode models when discovery is unavailable", async () => {
    process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";

    const models = await listAdapterModels("opencode_local");

    expect(models).toEqual(opencodeFallbackModels);
    expect(models.map((model) => model.id)).toEqual(expect.arrayContaining(["openai/gpt-6-astra", "openai/gpt-6-sol", "openai/gpt-6-luna", "openai/gpt-5.6-sol", "openai/gpt-5.6-terra", "openai/gpt-5.6-luna", "anthropic/claude-opus-5-5", "anthropic/claude-opus-5", "anthropic/claude-fable-5-1", "anthropic/claude-sonnet-5", "google/gemini-3.8-flash", "xai/grok-4.7"]));
  });

  it("loads cursor models dynamically and caches them", async () => {
    const runner = vi.fn(() => ({
      status: 0,
      stdout: "Available models: auto, composer-1.5, gpt-5.3-codex-high, sonnet-4.6",
      stderr: "",
      hasError: false,
    }));
    setCursorModelsRunnerForTests(runner);

    const first = await listAdapterModels("cursor");
    const second = await listAdapterModels("cursor");

    expect(runner).toHaveBeenCalledTimes(1);
    expect(first).toEqual(second);
    expect(first.some((model) => model.id === "auto")).toBe(true);
    expect(first.some((model) => model.id === "gpt-5.3-codex-high")).toBe(true);
    expect(first.some((model) => model.id === "composer-1")).toBe(true);
  });

  describe("PAPERCLIP_ADAPTER_MODELS declared models", () => {
    afterEach(() => {
      delete process.env.PAPERCLIP_ADAPTER_MODELS;
    });

    it("prefers declared env models over adapter discovery", async () => {
      process.env.PAPERCLIP_ADAPTER_MODELS = JSON.stringify({
        opencode_local: [
          { id: "tensorix/deepseek/deepseek-chat-v3.1", label: "DeepSeek v3.1" },
          { id: "tensorix/z-ai/glm-4.7" },
        ],
      });

      const models = await listAdapterModels("opencode_local");

      expect(models).toEqual([
        { id: "tensorix/deepseek/deepseek-chat-v3.1", label: "DeepSeek v3.1" },
        { id: "tensorix/z-ai/glm-4.7", label: "tensorix/z-ai/glm-4.7" },
      ]);
    });

    it("uses declared Codex models for both listing and refresh", async () => {
      process.env.PAPERCLIP_ADAPTER_MODELS = JSON.stringify({
        codex_local: [{ id: "private-codex", label: "Private Codex" }],
      });
      const declared = [{ id: "private-codex", label: "Private Codex" }];

      await expect(listAdapterModels("codex_local")).resolves.toEqual(declared);
      await expect(refreshAdapterModels("codex_local")).resolves.toEqual(declared);
    });

    it("observes env changes between calls (memo keyed by raw env value)", async () => {
      process.env.PAPERCLIP_ADAPTER_MODELS = JSON.stringify({
        opencode_local: [{ id: "model-a" }],
      });
      expect(await listAdapterModels("opencode_local")).toEqual([
        { id: "model-a", label: "model-a" },
      ]);

      process.env.PAPERCLIP_ADAPTER_MODELS = JSON.stringify({
        opencode_local: [{ id: "model-b" }],
      });
      expect(await listAdapterModels("opencode_local")).toEqual([
        { id: "model-b", label: "model-b" },
      ]);
    });

    it("fails soft on malformed values: falls back to adapter models instead of throwing", async () => {
      process.env.PAPERCLIP_ADAPTER_MODELS = "{not json";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const models = await listAdapterModels("opencode_local");
      expect(models).toEqual(opencodeFallbackModels);

      // Parsing is memoized per raw value: a second call must not re-log.
      const callsAfterFirst = errorSpy.mock.calls.length;
      expect(callsAfterFirst).toBeGreaterThan(0);
      await listAdapterModels("opencode_local");
      expect(errorSpy.mock.calls.length).toBe(callsAfterFirst);
    });

    it("ignores declared models for adapters not in the map", async () => {
      process.env.PAPERCLIP_ADAPTER_MODELS = JSON.stringify({
        opencode_local: [{ id: "model-a" }],
      });
      const models = await listAdapterModels("codex_local");
      expect(models).toEqual(codexFallbackModels);
    });
  });

  describe("OPENROUTER_BASE_URL dynamic model discovery", () => {
    it("merges native opencode models with OpenRouter models", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "sk-test";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            { id: "oc/claude-sonnet-4", name: "Claude Sonnet 4", type: "chat" },
            { id: "auto/gpt-4o", name: "GPT-4o Auto", type: "chat" },
          ],
        }),
      } as Response);

      const models = await listAdapterModels("opencode_local");

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy.mock.calls[0][0]).toBe("http://omniroute:20129/v1/models");
      // Native opencode models come first, then OpenRouter models.
      expect(models[0]).toEqual(opencodeFallbackModels[0]);
      expect(models.some((m) => m.id === "omniroute/oc/claude-sonnet-4")).toBe(true);
      expect(models.some((m) => m.id === "omniroute/auto/gpt-4o")).toBe(true);
    });

    it("caches results and does not re-fetch within TTL", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "sk-test";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [{ id: "oc/model-a", name: "Model A" }],
        }),
      } as Response);

      const first = await listAdapterModels("opencode_local");
      const second = await listAdapterModels("opencode_local");

      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(first).toEqual(second);
      // Native models are included.
      expect(first.some((m) => m.id === opencodeFallbackModels[0].id)).toBe(true);
    });

    it("filters out video models", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            { id: "oc/claude-sonnet-4", name: "Claude Sonnet 4", type: "chat" },
            { id: "video/sora", name: "Sora", type: "video" },
          ],
        }),
      } as Response);

      const models = await listAdapterModels("opencode_local");

      // Native models + non-video OpenRouter models.
      expect(models.some((m) => m.id === "omniroute/oc/claude-sonnet-4")).toBe(true);
      expect(models.some((m) => m.id.includes("sora"))).toBe(false);
      // Native models are still present.
      expect(models.some((m) => m.id === opencodeFallbackModels[0].id)).toBe(true);
    });

    it("uses id as label when name is missing", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [{ id: "oc/no-name-model" }],
        }),
      } as Response);

      const models = await listAdapterModels("opencode_local");

      expect(models.some((m) => m.id === "omniroute/oc/no-name-model" && m.label === "oc/no-name-model")).toBe(true);
    });

    it("falls back to native models when OpenRouter fetch fails", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: false,
        status: 500,
        json: async () => ({}),
      } as Response);

      const models = await listAdapterModels("opencode_local");

      // Native opencode models are returned even when OpenRouter fetch fails.
      expect(models).toEqual(opencodeFallbackModels);
    });

    it("falls back to native models when OpenRouter fetch throws", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network error"));

      const models = await listAdapterModels("opencode_local");

      // Native opencode models are returned even when OpenRouter fetch throws.
      expect(models).toEqual(opencodeFallbackModels);
    });

    it("sends Authorization header when OPENROUTER_API_KEY is set", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "sk-a27d81d51a749aa1-0ee363-44d44146";
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({ data: [{ id: "m/gpt-4o" }] }),
      } as Response);

      await listAdapterModels("opencode_local");

      const headers = (fetchSpy.mock.calls[0][1] as RequestInit)?.headers as Record<string, string>;
      expect(headers.Authorization).toBe("Bearer sk-a27d81d51a749aa1-0ee363-44d44146");
    });

    it("skips Authorization header when OPENROUTER_API_KEY is empty", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "";
      const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({ data: [{ id: "m/gpt-4o" }] }),
      } as Response);

      await listAdapterModels("opencode_local");

      const headers = (fetchSpy.mock.calls[0][1] as RequestInit)?.headers as Record<string, string>;
      expect(headers.Authorization).toBeUndefined();
    });

    it("returns only native models when OPENROUTER_BASE_URL is unset", async () => {
      const fetchSpy = vi.spyOn(globalThis, "fetch");
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";

      const models = await listAdapterModels("opencode_local");

      expect(models).toEqual(opencodeFallbackModels);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("PAPERCLIP_ADAPTER_MODELS takes priority over OPENROUTER_BASE_URL", async () => {
      process.env.PAPERCLIP_ADAPTER_MODELS = JSON.stringify({
        opencode_local: [{ id: "env/model-a", label: "Env Model A" }],
      });
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      const fetchSpy = vi.spyOn(globalThis, "fetch");

      const models = await listAdapterModels("opencode_local");

      expect(models).toEqual([{ id: "env/model-a", label: "Env Model A" }]);
      expect(fetchSpy).not.toHaveBeenCalled();
    });

    it("refreshAdapterModels clears OpenRouter cache and re-fetches", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "sk-test";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      const fetchSpy = vi.spyOn(globalThis, "fetch")
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ id: "oc/model-v1", name: "Model V1" }],
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ id: "oc/model-v2", name: "Model V2" }],
          }),
        } as Response);

      const initial = await listAdapterModels("opencode_local");
      const refreshed = await refreshAdapterModels("opencode_local");

      expect(fetchSpy).toHaveBeenCalledTimes(2);
      // Both include native models.
      expect(initial.some((m) => m.id === opencodeFallbackModels[0].id)).toBe(true);
      expect(refreshed.some((m) => m.id === opencodeFallbackModels[0].id)).toBe(true);
      expect(initial.some((m) => m.id === "omniroute/oc/model-v1")).toBe(true);
      expect(refreshed.some((m) => m.id === "omniroute/oc/model-v2")).toBe(true);
    });

    it("works for pi_local adapter (not just opencode)", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            { id: "oc/claude-sonnet-4", name: "Claude Sonnet 4" },
            { id: "auto/gpt-4o", name: "GPT-4o Auto" },
          ],
        }),
      } as Response);

      const models = await listAdapterModels("pi_local");

      expect(models).toEqual([
        { id: "omniroute/oc/claude-sonnet-4", label: "Claude Sonnet 4" },
        { id: "omniroute/auto/gpt-4o", label: "GPT-4o Auto" },
      ]);
    });

    it("native models always appear even when OpenRouter returns models", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "sk-test";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [{ id: "oc/some-model", name: "Some Model" }],
        }),
      } as Response);

      const models = await listAdapterModels("opencode_local");

      // Native opencode fallback models are always present.
      for (const native of opencodeFallbackModels) {
        expect(models.some((m) => m.id === native.id)).toBe(true);
      }
    });

    it("native models appear before OpenRouter models", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "sk-test";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [{ id: "oc/some-model", name: "Some Model" }],
        }),
      } as Response);

      const models = await listAdapterModels("opencode_local");

      const lastNativeIdx = models.reduce(
        (acc, m, i) => (opencodeFallbackModels.some((n) => n.id === m.id) ? i : acc),
        -1,
      );
      const firstOmniIdx = models.findIndex((m) => m.id.startsWith("omniroute/"));
      expect(lastNativeIdx).toBeLessThan(firstOmniIdx);
    });

    it("deduplicates models that appear in both native and OpenRouter lists", async () => {
      process.env.OPENROUTER_BASE_URL = "http://omniroute:20129/v1";
      process.env.OPENROUTER_API_KEY = "sk-test";
      process.env.PAPERCLIP_OPENCODE_COMMAND = "__paperclip_missing_opencode_command__";
      vi.spyOn(globalThis, "fetch").mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [
            { id: "oc/claude-sonnet-4", name: "Claude Sonnet 4" },
            // Same ID as a native model — should be deduped (native wins).
            { id: "openai/gpt-5.2-codex", name: "GPT-5.2 Codex" },
          ],
        }),
      } as Response);

      const models = await listAdapterModels("opencode_local");

      // openai/gpt-5.2-codex appears only once (native takes precedence).
      const gpt52Count = models.filter((m) => m.id === "openai/gpt-5.2-codex").length;
      expect(gpt52Count).toBe(1);
      // omniroute/openai/gpt-5.2-codex is a different ID (with prefix) so it's not a conflict.
      expect(models.some((m) => m.id === "omniroute/openai/gpt-5.2-codex")).toBe(true);
    });
  });
});
