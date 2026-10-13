import { describe, expect, it } from "vitest";

import {
  parseMessage,
  serializeMessage,
  createRequest,
  type PluginEnvironmentReleaseLeaseParams,
  type PluginEnvironmentReleaseLeaseResult,
  type PluginEnvironmentResumeLeaseParams,
  type PluginEnvironmentTerminationReceipt,
} from "./protocol.js";

// Fase A of the PVC-backed reusable-lease contract: `environmentResumeLease`
// carries the same run context `environmentAcquireLease` does, and
// `environmentReleaseLease` may return a richer suspend receipt. The messages
// are static types, so a valid payload assigns to its type and an invalid
// payload fails the type check. `tsc --noEmit` validates the `@ts-expect-error`
// directives, so an invalid payload the type accepts fails the build.

describe("environment resume lease params schema", () => {
  it("accepts the optional run context fields in any null-safe combination", () => {
    const minimal: PluginEnvironmentResumeLeaseParams = {
      driverKey: "sandbox-cr",
      companyId: "company-1",
      environmentId: "env-1",
      config: {},
      providerLeaseId: "lease-1",
    };
    expect(minimal.runId).toBeUndefined();

    const full: PluginEnvironmentResumeLeaseParams = {
      driverKey: "sandbox-cr",
      companyId: "company-1",
      environmentId: "env-1",
      issueId: "issue-1",
      config: { namespace: "agents" },
      providerLeaseId: "lease-1",
      leaseMetadata: { suspended: true },
      runId: "run-1",
      agentId: "agent-1",
      adapterType: "opencode_local",
      executionWorkspaceId: "workspace-1",
      executionWorkspaceSettings: {
        mode: "isolated_workspace",
        networkEgress: { allowFqdns: ["registry.npmjs.org"] },
      },
    };
    expect(full.runId).toBe("run-1");

    const nullSafe: PluginEnvironmentResumeLeaseParams = {
      driverKey: "sandbox-cr",
      companyId: "company-1",
      environmentId: "env-1",
      config: {},
      providerLeaseId: "lease-1",
      runId: null,
      agentId: null,
      adapterType: null,
      executionWorkspaceId: null,
      executionWorkspaceSettings: null,
    };
    expect(nullSafe.executionWorkspaceSettings).toBeNull();
  });

  it("rejects a non-string run identity", () => {
    const invalid: PluginEnvironmentResumeLeaseParams = {
      driverKey: "sandbox-cr",
      companyId: "company-1",
      environmentId: "env-1",
      config: {},
      providerLeaseId: "lease-1",
      // @ts-expect-error runId is a string|null, not a number
      runId: 42,
    };
    expect(typeof invalid.providerLeaseId).toBe("string");
  });

  it("round-trips the forwarded run context as plain JSON data", () => {
    const params: PluginEnvironmentResumeLeaseParams = {
      driverKey: "sandbox-cr",
      companyId: "company-1",
      environmentId: "env-1",
      issueId: null,
      config: {},
      providerLeaseId: "lease-1",
      runId: "run-2",
      agentId: "agent-2",
      adapterType: "paperclip_runner",
      executionWorkspaceId: "workspace-2",
      executionWorkspaceSettings: { mode: "shared_workspace" },
    };
    const message = parseMessage(serializeMessage(createRequest("environmentResumeLease", params, 1)));
    expect(message).toMatchObject({
      method: "environmentResumeLease",
      params: {
        runId: "run-2",
        agentId: "agent-2",
        adapterType: "paperclip_runner",
        executionWorkspaceId: "workspace-2",
        executionWorkspaceSettings: { mode: "shared_workspace" },
      },
    });
  });
});

describe("environment release lease result schema", () => {
  it("keeps the backend-compatible termination receipt assignable", () => {
    const receipt: PluginEnvironmentTerminationReceipt = {
      providerLeaseId: "lease-1",
      state: "stopped",
    };
    const result: PluginEnvironmentReleaseLeaseResult = receipt;
    expect(result.state).toBe("stopped");
  });

  it("accepts the suspend metadata receipt and remaining provider metadata", () => {
    const result: PluginEnvironmentReleaseLeaseResult = {
      providerLeaseId: "lease-1",
      state: "stopped",
      metadata: {
        state: "stopped",
        suspendedAt: "2026-10-12T00:00:00.000Z",
        pvcName: "workspace-pvc-1",
      },
    };
    expect(result.metadata?.state).toBe("stopped");

    const metadataOnly: PluginEnvironmentReleaseLeaseResult = {
      providerLeaseId: "lease-1",
      metadata: { state: "stopped" },
    };
    expect(metadataOnly.state).toBeUndefined();
  });

  it("rejects an unknown suspend state", () => {
    const invalid: PluginEnvironmentReleaseLeaseResult = {
      providerLeaseId: "lease-1",
      // @ts-expect-error only the stopped/destroyed lifecycle states are valid
      state: "paused",
    };
    expect(invalid.providerLeaseId).toBe("lease-1");
  });

  it("forwards the richer result through the release RPC params", () => {
    const params: PluginEnvironmentReleaseLeaseParams = {
      driverKey: "sandbox-cr",
      companyId: "company-1",
      environmentId: "env-1",
      config: {},
      providerLeaseId: "lease-1",
      leaseMetadata: { agentId: "agent-1" },
    };
    const message = parseMessage(serializeMessage(createRequest("environmentReleaseLease", params, 2)));
    expect(message).toMatchObject({ method: "environmentReleaseLease" });
  });
});
