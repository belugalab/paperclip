import { describe, expect, it } from "vitest";
import { remoteTerminationReceipt } from "./remote-execution-termination.js";

const lease = {
  id: "lease-1",
  companyId: "company-1",
  heartbeatRunId: "run-1",
  provider: "plugin:paperclip.kubernetes:kubernetes",
  providerLeaseId: "provider-lease-1",
};

describe("remoteTerminationReceipt", () => {
  it("binds a flat termination receipt to the host lease", () => {
    const receipt = remoteTerminationReceipt(lease, {
      providerLeaseId: "provider-lease-1",
      state: "stopped",
    });
    expect(receipt).toMatchObject({
      schema: "paperclip.remote-termination.v1",
      companyId: "company-1",
      runId: "run-1",
      leaseId: "lease-1",
      providerLeaseId: "provider-lease-1",
      state: "stopped",
    });
  });

  it("accepts the richer release result that carries the stop state only in metadata", () => {
    const receipt = remoteTerminationReceipt(lease, {
      providerLeaseId: "provider-lease-1",
      metadata: { state: "stopped", pvcName: "workspace-pvc-1" },
    });
    expect(receipt).toMatchObject({ state: "stopped" });
  });

  it("prefers the flat state over metadata.state", () => {
    const receipt = remoteTerminationReceipt(lease, {
      providerLeaseId: "provider-lease-1",
      state: "destroyed",
      metadata: { state: "stopped" },
    });
    expect(receipt).toMatchObject({ state: "destroyed" });
  });

  it("rejects a receipt bound to another provider lease", () => {
    expect(remoteTerminationReceipt(lease, {
      providerLeaseId: "other-lease",
      state: "stopped",
    })).toBeUndefined();
  });

  it("rejects an unknown state in both shapes", () => {
    expect(remoteTerminationReceipt(lease, {
      providerLeaseId: "provider-lease-1",
      state: "paused",
    })).toBeUndefined();
    expect(remoteTerminationReceipt(lease, {
      providerLeaseId: "provider-lease-1",
      metadata: { state: "paused" },
    })).toBeUndefined();
  });

  it("grants no authority to an ad-hoc lease without a run", () => {
    expect(remoteTerminationReceipt({ ...lease, heartbeatRunId: null }, {
      providerLeaseId: "provider-lease-1",
      state: "stopped",
    })).toBeUndefined();
  });
});
