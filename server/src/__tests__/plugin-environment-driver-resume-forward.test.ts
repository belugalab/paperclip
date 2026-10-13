import { beforeEach, describe, expect, it, vi } from "vitest";
import { resumePluginEnvironmentLease } from "../services/plugin-environment-driver.js";
import type { PluginEnvironmentConfig } from "@paperclipai/shared";
import type { PluginWorkerManager } from "../services/plugin-worker-manager.js";

const mockRegistry = vi.hoisted(() => ({
  getByKey: vi.fn(),
  getById: vi.fn(),
  list: vi.fn(),
}));

vi.mock("../services/plugin-registry.js", () => ({
  pluginRegistryService: () => mockRegistry,
}));

const PLUGIN_ID = "plugin-resume-forward";
const PLUGIN_KEY = "paperclip.resume-forward-provider";

const config: PluginEnvironmentConfig = {
  pluginKey: PLUGIN_KEY,
  driverKey: "driver-1",
  driverConfig: { namespace: "agents" },
};

function readyPlugin() {
  return {
    id: PLUGIN_ID,
    pluginKey: PLUGIN_KEY,
    status: "ready",
    manifestJson: {
      environmentDrivers: [{ driverKey: "driver-1", displayName: "Driver 1", configSchema: {} }],
    },
  };
}

function workerManager() {
  return {
    isRunning: vi.fn(() => true),
    call: vi.fn(async () => ({ providerLeaseId: "lease-1", metadata: { remoteCwd: "/workspace" } })),
  } as unknown as PluginWorkerManager;
}

describe("resumePluginEnvironmentLease run-context forwarding", () => {
  beforeEach(() => {
    mockRegistry.getByKey.mockReset();
    mockRegistry.getByKey.mockResolvedValue(readyPlugin());
  });

  it("forwards runId, agentId, adapterType, executionWorkspaceId and executionWorkspaceSettings", async () => {
    const manager = workerManager();
    const settings = { mode: "isolated_workspace", workspaceRuntime: { service: "api" } };

    await resumePluginEnvironmentLease({
      db: {} as never,
      workerManager: manager,
      companyId: "company-1",
      environmentId: "env-1",
      issueId: "issue-1",
      config,
      providerLeaseId: "lease-1",
      leaseMetadata: { state: "stopped" },
      runId: "run-1",
      agentId: "agent-1",
      adapterType: "opencode_local",
      executionWorkspaceId: "workspace-1",
      executionWorkspaceSettings: settings,
    });

    expect(manager.call).toHaveBeenCalledWith(
      PLUGIN_ID,
      "environmentResumeLease",
      expect.objectContaining({
        driverKey: "driver-1",
        companyId: "company-1",
        environmentId: "env-1",
        issueId: "issue-1",
        providerLeaseId: "lease-1",
        leaseMetadata: { state: "stopped" },
        runId: "run-1",
        agentId: "agent-1",
        adapterType: "opencode_local",
        executionWorkspaceId: "workspace-1",
        executionWorkspaceSettings: settings,
      }),
    );
  });

  it("stays null-safe when the caller omits the run context", async () => {
    const manager = workerManager();

    await resumePluginEnvironmentLease({
      db: {} as never,
      workerManager: manager,
      companyId: "company-1",
      environmentId: "env-1",
      config,
      providerLeaseId: "lease-1",
    });

    expect(manager.call).toHaveBeenCalledWith(
      PLUGIN_ID,
      "environmentResumeLease",
      expect.objectContaining({
        issueId: null,
        runId: null,
        agentId: null,
        adapterType: null,
        executionWorkspaceId: null,
        executionWorkspaceSettings: null,
      }),
    );
  });
});
