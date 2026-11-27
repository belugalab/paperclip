import { describe, it, expect, vi } from "vitest";

// Keep acquireLease unit-testable without a cluster: only the lease metadata is
// under test here, so every provider side effect is stubbed at its own seam.
vi.mock("../../src/kube-client.js", () => ({
  createKubeConfig: vi.fn(() => ({})),
  makeKubeClients: vi.fn(() => ({})),
}));
vi.mock("../../src/tenant-orchestrator.js", () => ({
  ensureTenant: vi.fn(async () => {}),
}));
vi.mock("../../src/secret-manager.js", () => ({
  createPerRunSecret: vi.fn(async () => {}),
}));
vi.mock("../../src/job-orchestrator.js", () => ({
  JobTimeoutError: class JobTimeoutError extends Error {},
  jobOrchestrator: {
    claim: vi.fn(async () => ({ uid: "uid-1" })),
    release: vi.fn(async () => {}),
    findPod: vi.fn(async () => "pc-job-pod"),
  },
}));
vi.mock("../../src/scoped-network-egress.js", () => ({
  NETWORK_EGRESS_GRANT_PATH: "executionWorkspaceSettings.networkEgress",
  appendNetworkEgressDenyHint: vi.fn((stderr: string) => stderr),
  parseScopedNetworkEgressGrant: vi.fn(() => ({ allowFqdns: [], allowCidrs: [] })),
  createScopedNetworkEgressPolicyOrReleaseWorkload: vi.fn(async () => null),
}));

import plugin from "../../src/plugin.js";

describe("onEnvironmentAcquireLease", () => {
  it("records /workspace as the default native-sync confinement root", async () => {
    const lease = await plugin.definition.onEnvironmentAcquireLease!({
      driverKey: "kubernetes",
      companyId: "acme",
      environmentId: "env-1",
      runId: "run-1",
      config: { inCluster: true, backend: "job" },
    });

    expect(lease.providerLeaseId).toBeTruthy();
    expect(lease.metadata).toEqual(
      expect.objectContaining({
        backend: "job",
        remoteCwd: "/workspace",
      }),
    );
  });
});
